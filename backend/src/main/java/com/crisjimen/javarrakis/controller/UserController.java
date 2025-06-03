package com.crisjimen.javarrakis.controller;

import com.crisjimen.javarrakis.dto.EvaluationResponse;
import com.crisjimen.javarrakis.dto.LevelSubmissionRequestDto;
import com.crisjimen.javarrakis.dto.UserHistoryDto;
import com.crisjimen.javarrakis.dto.UserResponseDTO;
import com.crisjimen.javarrakis.model.Level;
import com.crisjimen.javarrakis.model.User;
import com.crisjimen.javarrakis.repository.UserRepository;
import com.crisjimen.javarrakis.service.UserService;
import com.crisjimen.javarrakis.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class UserController {

    //Implementacion del servicio de usuarios
    @Autowired
    UserService userService;

    @Autowired
    UserRepository userRepository;

    //implementacion del servicio de Jwt
    @Autowired
    JWTUtil jwtUtil;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    //Obtener todos los niveles
    @GetMapping("/levels")
    public List<Level> findAllLevels() {
        return userService.findAllLevels();
    }

    //Enviar la respuesta de un nivel
    @PostMapping(value = "/level/{id}/submit", consumes = "application/json;charset=UTF-8")
    public ResponseEntity<EvaluationResponse> submitLevel(
            @PathVariable Long id,
            @RequestBody LevelSubmissionRequestDto request,
            @RequestHeader("Authorization") String token
            ) {

        String cleanToken = token.replace("Bearer ", "");
        String email = jwtUtil.getValue(cleanToken);
        EvaluationResponse response = userService.submitLevel(request, email, id);
        return ResponseEntity.ok(response);

    }

    //Obtener datos del usuario actualizados
    @GetMapping("/me")
    public ResponseEntity<UserResponseDTO> getCurrentUser(@RequestHeader("Authorization") String token) {

        String cleanToken = token.replace("Bearer ", "");
        String email = jwtUtil.getValue(cleanToken);
        Optional<User> u = userRepository.findUserByEmail(email);
        UserResponseDTO dto = new UserResponseDTO(u.get());
        return ResponseEntity.ok(dto);
    }

    //Obtener el historial de los niveles completados
    @GetMapping("/me/history")
    public ResponseEntity<List<UserHistoryDto>> getCurrentUserHistory(@RequestHeader("Authorization") String token) {
        String cleanToken = token.replace("Bearer ", "");
        String email = jwtUtil.getValue(cleanToken);
        Optional<User> u = userRepository.findUserByEmail(email);
        List<UserHistoryDto> dto = userService.getUserHistory(u.get());
        return ResponseEntity.ok(dto);
    }

}
