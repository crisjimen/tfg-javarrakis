package com.crisjimen.javarrakis.security;

import com.crisjimen.javarrakis.repository.UserRepository;
import com.crisjimen.javarrakis.utils.JWTUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * Clase que se encarga de validar el token y de cargar el usuario.
 * Intercepta cada petición que se hace al servidor y revisa si hay un JWT en el header
 */

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JWTUtil jwtUtil;
    private final UserRepository userRepository;

    public JwtAuthFilter(JWTUtil jwtUtil, UserRepository userRepository) {
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        //Se obtiene el token desde la cabecera de autorización y se verifica si existe
        final String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")){
            filterChain.doFilter(request, response);
            return;
        }

        //Se obtiene el email del cuerpo del JWT
        final String jwt = authHeader.substring(7);
        final String email = jwtUtil.getValue(jwt);

        //Validación del usuario y si no hay autenticación previa
        if(email != null &&
        SecurityContextHolder.getContext().getAuthentication() == null){

            var user = userRepository.findUserByEmail(email).orElse(null);

            //Validación del token y si existe el usuario. Se genera el token
            if( user!= null && jwtUtil.isTokenValid(jwt, user)){
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());

            authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        filterChain.doFilter(request, response);

    }
}
