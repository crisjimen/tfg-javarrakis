package com.crisjimen.javarrakis.service;
import org.springframework.http.HttpEntity;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import org.springframework.http.HttpHeaders;
import java.util.List;
import java.util.Map;
import java.util.Objects;

/* Clase que hace la llamada a la API de Piston para la ejecución, validación
    y compilación del código
 */

@Service
public class PistonService {

    public String executeCode(String code) {

        RestTemplate restTemplate = new RestTemplate();

        //Constructor de la request
        Map<String, Object> request = Map.of(
                "language", "java",
                "version", "15.0.2",
                "files", List.of(Map.of("name", "Main.java", "content", code))
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(request, headers);
        String url = "https://emkc.org/api/v2/piston/execute";

        ResponseEntity<Map> response = restTemplate.postForEntity(url, entity, Map.class);
        return (String) ((Map) response.getBody().get("run")).get("output");

    }

}
