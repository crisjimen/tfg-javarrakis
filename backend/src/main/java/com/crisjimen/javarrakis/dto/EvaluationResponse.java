package com.crisjimen.javarrakis.dto;

import java.io.Serializable;

/**
 * DTO de la evaluacion de la respuesta
 */
public class EvaluationResponse implements Serializable {
    private final int puntuacion;
    private final String mensaje;


    public EvaluationResponse(int puntuacion, String mensaje) {
        this.puntuacion = puntuacion;
        this.mensaje = mensaje;
    }

    public int getPuntuacion() {
        return puntuacion;
    }

    public String getMensaje() {
        return mensaje;
    }
}