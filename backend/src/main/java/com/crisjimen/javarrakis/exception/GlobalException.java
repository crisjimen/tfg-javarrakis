package com.crisjimen.javarrakis.exception;

import org.springframework.http.HttpStatus;

/**
 * Excepción usada para manejar los errores globales, la cual
 * lleva asociada una respuesta HTTP.
 */

public class GlobalException extends RuntimeException {

    private HttpStatus httpStatus;

    public GlobalException(String message, HttpStatus httpStatus) {
        super(message);
        this.httpStatus = httpStatus;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }
}
