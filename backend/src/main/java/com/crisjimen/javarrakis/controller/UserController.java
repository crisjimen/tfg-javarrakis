package com.crisjimen.javarrakis.controller;

import com.crisjimen.javarrakis.dto.EvaluationResponse;
import com.crisjimen.javarrakis.dto.LevelSubmissionRequestDto;
import com.crisjimen.javarrakis.model.Level;
import com.crisjimen.javarrakis.model.User;
import com.crisjimen.javarrakis.service.UserService;
import com.crisjimen.javarrakis.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {

    //Implementacion del servicio de usuarios
    @Autowired
    UserService userService;

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
    @PostMapping("/level/{id}/submit")
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

}
