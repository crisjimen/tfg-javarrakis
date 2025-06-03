package com.crisjimen.javarrakis.dto;

import java.io.Serializable;
import java.time.Instant;

/**
 * DTO for {@link com.crisjimen.javarrakis.model.UserProgress}
 */
public class UserHistoryDto implements Serializable {
    private final Long levelId;
    private final String levelName;
    private final Integer score;
    private final Instant completedAt;

    public UserHistoryDto(Long levelId, String levelName, Integer score, Instant completedAt) {
        this.levelId = levelId;
        this.levelName = levelName;
        this.score = score;
        this.completedAt = completedAt;
    }

    public Long getLevelId() {
        return levelId;
    }

    public String getLevelName() {
        return levelName;
    }

    public Integer getScore() {
        return score;
    }

    public Instant getCompletedAt() {
        return completedAt;
    }
}