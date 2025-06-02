package com.crisjimen.javarrakis.dto;

import com.crisjimen.javarrakis.model.User;
import com.crisjimen.javarrakis.model.UserProgress;
import com.crisjimen.javarrakis.model.UserProgressId;

import java.io.Serializable;
import java.util.Set;
import java.util.stream.Collectors;

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
    private final Set<Long> levelsCompleted;

    public UserResponseDTO(User u) {
        this.id = u.getId();
        this.username = u.getUsername();
        this.email = u.getEmail();
        this.reputationName = u.getReputation().getName();
        this.points = u.getPoints();
        this.levelsCompleted = u.getProgress().stream()
                .filter(UserProgress::getCompleted)
                .map(p -> p.getId().getLevelId())
                .collect(Collectors.toSet());
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

    public Set<Long> getLevelsCompleted() { return levelsCompleted; }


}