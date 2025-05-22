package com.crisjimen.javarrakis.dto;

import java.io.Serializable;

/**
 * DTO del formato de respuesta al login/registro
 */
public class AuthDTO implements Serializable {

    private final String token;
    private final UserResponseDTO user;

    public AuthDTO(String token, UserResponseDTO user) {
        this.token = token;
        this.user = user;
    }

    public String getToken() {
        return token;
    }

    public UserResponseDTO getUser() {
        return user;
    }
}