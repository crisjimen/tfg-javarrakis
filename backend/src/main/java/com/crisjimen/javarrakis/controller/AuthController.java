package com.crisjimen.javarrakis.controller;

import com.crisjimen.javarrakis.dto.AuthDTO;
import com.crisjimen.javarrakis.dto.UserDto;
import com.crisjimen.javarrakis.model.User;
import com.crisjimen.javarrakis.service.AuthService;
import com.crisjimen.javarrakis.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthDTO> registerUser(@RequestBody UserDto user) {

        return authService.registerUser(user);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthDTO> loginUser(@RequestBody UserDto user) {
        return authService.loginUser(user);
    }

}
