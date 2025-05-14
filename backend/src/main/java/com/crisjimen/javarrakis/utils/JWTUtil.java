package com.crisjimen.javarrakis.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.JwtParser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.util.Base64;
import java.util.Date;

@Component
public class JWTUtil {

    @Value("${security.jwt.secret}")
    private String key;

    @Value("${security.jwt.issuer}")
    private String issuer;

    @Value("${security.jwt.ttlMillis}")
    private long ttlMillis;

    private final Logger log = LoggerFactory.getLogger(JWTUtil.class);

    private Key getSigningKey() {
        byte[] apiKeySecretBytes = Base64.getDecoder().decode(key);
        return new SecretKeySpec(apiKeySecretBytes, SignatureAlgorithm.HS256.getJcaName());
    }

    /**
     * Crea un nuevo JWT
     */
    public String create(String id, String subject) {
        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;

        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);

        JwtBuilder builder = Jwts.builder()
                .setId(id)
                .setIssuedAt(now)
                .setSubject(subject)
                .setIssuer(issuer)
                .signWith(getSigningKey(), signatureAlgorithm);

        if (ttlMillis >= 0) {
            long expMillis = nowMillis + ttlMillis;
            Date exp = new Date(expMillis);
            builder.setExpiration(exp);
        }

        return builder.compact();
    }

    /**
     * Obtiene el subject del JWT
     */
    public String getValue(String jwt) {
        Claims claims = getParser().parseClaimsJws(jwt).getBody();
        return claims.getSubject();
    }

    /**
     * Obtiene el id del JWT
     */
    public String getKey(String jwt) {
        Claims claims = getParser().parseClaimsJws(jwt).getBody();
        return claims.getId();
    }

    /**
     * Devuelve un JwtParser configurado con la clave secreta
     */
    private JwtParser getParser() {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build();
    }
}
