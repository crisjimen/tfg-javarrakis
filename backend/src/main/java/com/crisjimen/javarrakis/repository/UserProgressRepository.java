package com.crisjimen.javarrakis.repository;

import com.crisjimen.javarrakis.model.UserProgress;
import com.crisjimen.javarrakis.model.UserProgressId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserProgressRepository extends JpaRepository<UserProgress, UserProgressId> {
}
