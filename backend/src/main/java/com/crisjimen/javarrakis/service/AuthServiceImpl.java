package com.crisjimen.javarrakis.service;

import com.crisjimen.javarrakis.dto.AuthDTO;
import com.crisjimen.javarrakis.dto.ChangePasswordDto;
import com.crisjimen.javarrakis.dto.UserDto;
import com.crisjimen.javarrakis.dto.UserResponseDTO;
import com.crisjimen.javarrakis.exception.GlobalException;
import com.crisjimen.javarrakis.model.User;
import com.crisjimen.javarrakis.repository.ReputationLeverRepository;
import com.crisjimen.javarrakis.repository.UserRepository;
import com.crisjimen.javarrakis.utils.JWTUtil;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    ReputationLeverRepository reputationLeverRepository;

    @Autowired
    JWTUtil jwtUtil = new JWTUtil();

    //Codificador de constraseñas con Argon2
    Argon2 argon2 = Argon2Factory.create();

    //Registrar un nuevo usuario
    @Override
    public ResponseEntity<AuthDTO> registerUser(UserDto user) {

        //Verificar si el email ya está asociado a una cuenta
        if (userRepository.findUserByEmail(user.getEmail()).isPresent()) {
            throw new GlobalException("Email no válido. Ya existe una cuenta asociada.", HttpStatus.BAD_REQUEST);
        }

        User newUser = new User();

        //Generar el uuid
        long uid = UUID.randomUUID().getMostSignificantBits() & Long.MAX_VALUE;

        newUser.setId(uid);
        newUser.setEmail(user.getEmail());
        newUser.setUsername(user.getUsername());
        newUser.setPoints(0);
        newUser.setRegisteredAt(Instant.now());
        newUser.setReputation(reputationLeverRepository.findReputationLevelById(1L));

        //Hashear la constraseña
        String hashPassword = argon2.hash(2,65536, 1, user.getPassword());
        newUser.setPasswordHash(hashPassword);

        //Guardar el usuario
        userRepository.save(newUser);

        //Generar el JWT
        String token = jwtUtil.create(
                String.valueOf(newUser.getId()),
                newUser.getEmail()
        );

        //Creación de los DTO de respuesta
        UserResponseDTO userResponseDTO = new UserResponseDTO(newUser);
        AuthDTO authDTO = new AuthDTO(token, userResponseDTO);

        return ResponseEntity.ok(authDTO);
    }

    //Login de un usuario
    @Override
    public ResponseEntity<AuthDTO> loginUser(UserDto user) {

        Optional<User> u = userRepository.findUserByEmail(user.getEmail());

        //Comprobar que el usuario con ese email existe
        if(u.isEmpty()){
            throw new GlobalException("No hay ningún usuario registrado con ese email", HttpStatus.BAD_REQUEST);
        }

        User user1 = u.get();
        //Verificar la contraseña
        if(!argon2.verify(user1.getPasswordHash(), user.getPassword())){
            throw new GlobalException("La contraseña no es válida", HttpStatus.BAD_REQUEST);
        }

        //generar el JWT
        String token = jwtUtil.create(
                String.valueOf(user1.getId()),
                user1.getEmail()
        );

        //DTO de respuesta
        UserResponseDTO userResponseDTO = new UserResponseDTO(user1);
        AuthDTO authDTO = new AuthDTO(token, userResponseDTO);

        return ResponseEntity.ok(authDTO);
    }

    @Override
    public void changePassword(String email, ChangePasswordDto changePasswordDto) {

        //Buscar el usuario por email
        Optional<User> u = userRepository.findUserByEmail(email);
        if(u.isEmpty()) {
            throw new GlobalException("Usuario no encontrado", HttpStatus.NOT_FOUND);
        }
        User us = u.get();

        //Verificar que la contraseña actual es la correcta
        if (!argon2.verify(us.getPasswordHash(), changePasswordDto.getCurrentPassword())){
            throw new GlobalException("La contraseña actual no es correcta", HttpStatus.UNAUTHORIZED);
        }

        //Verificar que la contraseña no se ha cambiado en los últimos 30 días
        Instant lastUpdate = us.getUpdatedAt();
        if(lastUpdate != null){

            long daysBetween = Duration.between(lastUpdate, Instant.now()).toDays();
            if(daysBetween < 30){
                throw new GlobalException("No puedes cambiar la contraseña varias veces en menos de 30 días. Días restantes: " + (30 - daysBetween),
                        HttpStatus.CONFLICT);
            }
        }

        //Hashear la nueva contraseña
        String hashPassword = argon2.hash(2,65536, 1, changePasswordDto.getNewPassword());
        us.setPasswordHash(hashPassword);
        us.setUpdatedAt(Instant.now());
        userRepository.save(us);
    }
}
