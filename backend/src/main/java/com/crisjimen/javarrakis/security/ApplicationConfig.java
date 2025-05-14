package com.crisjimen.javarrakis.security;

import com.crisjimen.javarrakis.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * Clase que crea el AuthenticationProvider e indica cómo se deben autenticar los usuarios
 */

@Configuration
public class ApplicationConfig {

    @Autowired
    private UserRepository userRepository;

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();

        provider.setUserDetailsService(email ->
                userRepository.findUserByEmail(email)
                        .orElseThrow(() -> new UsernameNotFoundException("User not found"))
        );
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    //Codificador de contraseñas con Argon2
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new Argon2PasswordEncoder(16, 32, 1, 65536, 4
        );
    }
}
