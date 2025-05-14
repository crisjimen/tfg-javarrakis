package com.crisjimen.javarrakis.controller;

import com.crisjimen.javarrakis.model.User;
import com.crisjimen.javarrakis.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class UserController {

    //Implementacion del servicio de usuarios
    @Autowired
    UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    //Obtener todos los usuarios

    @GetMapping("/users")
    public List<User> getUsers() {
        return userService.findAll();
    }

}
