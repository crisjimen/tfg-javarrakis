package com.crisjimen.javarrakis.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalErrorHandler {

    @ExceptionHandler
    public ResponseEntity<GlobalErrorResponse> handleException(GlobalException e) {
       GlobalErrorResponse errorResponse =
               new GlobalErrorResponse(e.getHttpStatus().value(), e.getMessage());

       return new ResponseEntity<>(errorResponse, e.getHttpStatus());
    }

}
