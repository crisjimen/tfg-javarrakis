package com.crisjimen.javarrakis.exception;

/**
 * Información estructurada del error que se devuelve al cliente.
 * Contiene el mensaje y el código de estado HTTP.
 */

public class GlobalErrorResponse {

    private int status;
    private String message;

    public GlobalErrorResponse() {
    }

    public GlobalErrorResponse(int status,String message) {
        this.status = status;
        this.message = message;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
