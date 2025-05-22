package com.crisjimen.javarrakis.service;

import com.crisjimen.javarrakis.dto.EvaluationResponse;
import com.crisjimen.javarrakis.dto.LevelSubmissionRequestDto;
import com.crisjimen.javarrakis.model.Level;
import com.crisjimen.javarrakis.model.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {

    //Encontrar todos los niveles
    List<Level> findAllLevels();

    //Marcar un nivel como completado
    EvaluationResponse submitLevel(LevelSubmissionRequestDto request, String userEmail, Long levelId);
}
