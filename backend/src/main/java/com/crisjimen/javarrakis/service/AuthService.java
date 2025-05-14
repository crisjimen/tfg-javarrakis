package com.crisjimen.javarrakis.service;

import com.crisjimen.javarrakis.dto.AuthDTO;
import com.crisjimen.javarrakis.dto.UserDto;
import com.crisjimen.javarrakis.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface AuthService {
    ResponseEntity<AuthDTO> registerUser(UserDto user);
    ResponseEntity<AuthDTO> loginUser(UserDto user);
}
