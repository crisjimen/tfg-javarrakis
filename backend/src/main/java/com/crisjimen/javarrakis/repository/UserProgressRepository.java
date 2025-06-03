package com.crisjimen.javarrakis.repository;

import com.crisjimen.javarrakis.dto.UserHistoryDto;
import com.crisjimen.javarrakis.model.User;
import com.crisjimen.javarrakis.model.UserProgress;
import com.crisjimen.javarrakis.model.UserProgressId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserProgressRepository extends JpaRepository<UserProgress, UserProgressId> {
    List<UserHistoryDto> getUserProgressByUser(User user);
}
