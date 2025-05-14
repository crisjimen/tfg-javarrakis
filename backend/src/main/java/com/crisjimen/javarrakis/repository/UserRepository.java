package com.crisjimen.javarrakis.repository;

import com.crisjimen.javarrakis.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    //Autorización de usuarios
    Optional<User> findUserByEmail(String email);


}
