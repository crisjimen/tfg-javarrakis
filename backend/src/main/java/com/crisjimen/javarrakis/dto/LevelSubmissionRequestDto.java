package com.crisjimen.javarrakis.dto;

import java.io.Serializable;

/**
 * DTO for {@link com.crisjimen.javarrakis.model.Level}
 * Clase DTO para recibir los datos del nivel completado
 */
public class LevelSubmissionRequestDto implements Serializable {

    private final String userCode;
    private final String expectedOutput;
    private final int points;


    public LevelSubmissionRequestDto(Long levelId, String userCode, String expectedOutput, int points) {
        this.userCode = userCode;
        this.expectedOutput = expectedOutput;
        this.points = points;
    }

    public String getUserCode() {
        return userCode;
    }

    public String getExpectedOutput() {
        return expectedOutput;
    }

    public int getPoints() {
        return points;
    }

}