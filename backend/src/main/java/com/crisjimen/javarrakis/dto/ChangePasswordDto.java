package com.crisjimen.javarrakis.dto;

import java.io.Serializable;

/**
 * DTO del formato del cambio de contraseña cuando el usuario ya está registrado
 */

public class ChangePasswordDto implements Serializable {

    private final String currentPassword;
    private final String newPassword;

    public ChangePasswordDto(String currentPassword, String newPassword) {
        this.currentPassword = currentPassword;
        this.newPassword = newPassword;
    }

    public String getCurrentPassword() {
        return currentPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }
}
