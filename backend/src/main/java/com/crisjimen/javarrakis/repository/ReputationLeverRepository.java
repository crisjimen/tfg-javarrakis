package com.crisjimen.javarrakis.repository;

import com.crisjimen.javarrakis.model.ReputationLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReputationLeverRepository extends JpaRepository<ReputationLevel, Long> {
    ReputationLevel findReputationLevelById(Long id);
}
