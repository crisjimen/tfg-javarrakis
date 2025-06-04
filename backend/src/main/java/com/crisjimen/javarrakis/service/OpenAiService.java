package com.crisjimen.javarrakis.service;

import com.crisjimen.javarrakis.dto.EvaluationResponse;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class OpenAiService {

    @Value("${openai.api.key}")
    private String apiKey;

    @Value("${openai.api.url}")
    private String apiUrl;

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public OpenAiService(){
       this.restTemplate = new RestTemplate();
       this.objectMapper = new ObjectMapper();
    }

    //Generar feedback al obtener error al no coincidir respuestas
    public String generateFeedback(String userCode, String expected, String actual) {

        //Generar el prompt
        String prompt = String.format(
                """
                El siguiente fragmento de código se ejecuta correctamente, pero no produce la salida esperada.
                Código:
                %s
                Resultado esperado:
                %s
                Resultado obtenido:
                %s
        
                Objetivo: Proporciona UNA recomendación breve para ayudar al usuario a ajustar su código. 
                ⚠️ NO corrijas el código.
                ❌ NO incluyas el código corregido ni fragmentos.
                ✅ Solo da una frase de sugerencia clara y concisa (máximo 20 palabras). 
                💬 Usa un tono directo y amigable.
        
                Formato de respuesta: una sola línea con una sugerencia clara y útil.
                """,
                userCode, expected, actual
        );

        //Construir el cuerpo de la petición
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", "mistralai/mistral-7b-instruct");
        requestBody.put("messages", List.of(
                Map.of("role", "system", "content", "Eres un evaluador de código en Java"),
                Map.of("role", "user", "content", prompt)));
        requestBody.put("temperature", 0.3);

        //Configurar los headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);
        headers.add("HTTP-Referer","https://github.com/crisjimen");
        headers.add("X-Title", "Javarrakis");

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        //Obtener respuesta
        ResponseEntity<String> response = restTemplate.postForEntity(apiUrl, entity, String.class);

        try {
            if (response.getStatusCode().is2xxSuccessful() && response.hasBody()) {
                JsonNode json = objectMapper.readTree(response.getBody());
                return json.get("choices").get(0).get("message").get("content").asText();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return "Error al obtener una respuesta de OpenAi";
    }
}
