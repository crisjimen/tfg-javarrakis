package com.crisjimen.javarrakis.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.Instant;

@Entity
@Table(name = "token")
public class Token {
    @Id
    @Column(name = "email", nullable = false, length = 150)
    private String email;

    @Column(name = "user_name", length = 50)
    private String userName;

    @Column(name = "token_value", nullable = false)
    private String tokenValue;

    @Column(name = "expiration", nullable = false)
    private Instant expiration;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getTokenValue() {
        return tokenValue;
    }

    public void setTokenValue(String tokenValue) {
        this.tokenValue = tokenValue;
    }

    public Instant getExpiration() {
        return expiration;
    }

    public void setExpiration(Instant expiration) {
        this.expiration = expiration;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

}