package com.crisjimen.javarrakis.dto;

import com.crisjimen.javarrakis.model.User;

import java.io.Serializable;

/**
 * DTO for {@link com.crisjimen.javarrakis.model.User}
 * DTO para los datos de respuesta al hacer login o registro
 */
public class UserResponseDTO implements Serializable {
    private final Long id;
    private final String username;
    private final String email;
    private final String reputationName;
    private final Integer points;

    public UserResponseDTO(User u) {
        this.id = u.getId();
        this.username = u.getUsername();
        this.email = u.getEmail();
        this.reputationName = u.getReputation().getName();
        this.points = u.getPoints();
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getReputationName() {
        return reputationName;
    }

    public Integer getPoints() {
        return points;
    }
}