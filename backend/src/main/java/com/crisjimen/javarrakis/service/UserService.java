package com.crisjimen.javarrakis.service;

import com.crisjimen.javarrakis.model.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {

    List<User> findAll();
}
