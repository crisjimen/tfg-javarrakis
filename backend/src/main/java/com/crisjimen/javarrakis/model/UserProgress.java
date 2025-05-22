package com.crisjimen.javarrakis.model;

import jakarta.persistence.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.Instant;

@Entity
@Table(name = "user_progress")
public class UserProgress {
    @EmbeddedId
    private UserProgressId id;

    @MapsId("userId")
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @MapsId("levelId")
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "level_id", nullable = false)
    private Level level;

    @ColumnDefault("0")
    @Column(name = "completed")
    private Boolean completed;

    @Column(name = "score")
    private Integer score;

    @Column(name = "completed_at")
    private Instant completedAt;

    //Constructorres

    public UserProgress() {
    }

    public UserProgress(User user, Level level, Integer score, Boolean completed, Instant completedAt) {
        this.user = user;
        this.level = level;
        this.id = new UserProgressId(user.getId(), level.getId());
        this.score = score;
        this.completed = completed;
        this.completedAt = completedAt;
    }

    public UserProgressId getId() {
        return id;
    }

    public void setId(UserProgressId id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Level getLevel() {
        return level;
    }

    public void setLevel(Level level) {
        this.level = level;
    }

    public Boolean getCompleted() {
        return completed;
    }

    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public Instant getCompletedAt() {
        return completedAt;
    }

    public void setCompletedAt(Instant completedAt) {
        this.completedAt = completedAt;
    }

}