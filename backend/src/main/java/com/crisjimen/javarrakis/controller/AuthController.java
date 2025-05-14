package com.crisjimen.javarrakis.controller;

import com.crisjimen.javarrakis.dto.AuthDTO;
import com.crisjimen.javarrakis.dto.ChangePasswordDto;
import com.crisjimen.javarrakis.dto.UserDto;
import com.crisjimen.javarrakis.model.User;
import com.crisjimen.javarrakis.service.AuthService;
import com.crisjimen.javarrakis.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    //Registro
    @PostMapping("/register")
    public ResponseEntity<AuthDTO> registerUser(@RequestBody UserDto user) {

        return authService.registerUser(user);
    }

    //Login
    @PostMapping("/login")
    public ResponseEntity<AuthDTO> loginUser(@RequestBody UserDto user) {
        return authService.loginUser(user);
    }

    //Cambio de contraseña --> solo para usuarios registrados
    //Se obtiene el usuario a través de token del usuario
    @PutMapping("/change-password")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> changePassword(
            @RequestBody ChangePasswordDto changePasswordDto,
            @AuthenticationPrincipal UserDetails user) {

        authService.changePassword(user.getUsername(), changePasswordDto);
        return ResponseEntity.ok().build();
    }

}
