package com.crisjimen.javarrakis.repository;

import com.crisjimen.javarrakis.model.Avatar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AvatarRepository extends JpaRepository<Avatar, Long> {
    Avatar findAvatarById(Long id);
}
