package com.crisjimen.javarrakis.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import org.hibernate.Hibernate;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class UserProgressId implements Serializable {
    private static final long serialVersionUID = 2292262109049560541L;
    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "level_id", nullable = false)
    private Long levelId;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getLevelId() {
        return levelId;
    }

    public void setLevelId(Long levelId) {
        this.levelId = levelId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        UserProgressId entity = (UserProgressId) o;
        return Objects.equals(this.levelId, entity.levelId) &&
                Objects.equals(this.userId, entity.userId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(levelId, userId);
    }

}