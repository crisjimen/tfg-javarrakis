package com.crisjimen.javarrakis.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * DTO for {@link com.crisjimen.javarrakis.model.User}
 * Clase que define los datos que se reciben en el registro de usuarios.
 */
public class UserDto implements Serializable {
    private final String username;
    private final String email;
    private final String password;

    public UserDto(String username, String email, String passwordHash) {
        this.username = username;
        this.email = email;
        this.password = passwordHash;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

}