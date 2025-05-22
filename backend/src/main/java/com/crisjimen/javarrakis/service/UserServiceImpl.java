package com.crisjimen.javarrakis.service;

import com.crisjimen.javarrakis.dto.EvaluationResponse;
import com.crisjimen.javarrakis.dto.LevelSubmissionRequestDto;
import com.crisjimen.javarrakis.exception.GlobalException;
import com.crisjimen.javarrakis.model.Level;
import com.crisjimen.javarrakis.model.User;
import com.crisjimen.javarrakis.model.UserProgress;
import com.crisjimen.javarrakis.repository.LevelRepository;
import com.crisjimen.javarrakis.repository.UserProgressRepository;
import com.crisjimen.javarrakis.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    UserRepository userRepository;

    @Autowired
    LevelRepository levelRepository;

    @Autowired
    PistonService pistonService;

    @Autowired
    OpenAiService openAiService;

    @Autowired
    UserProgressRepository userProgressRepository;

    @Override
    public List<Level> findAllLevels() {
        return levelRepository.findAll();
    }

    @Override
    public EvaluationResponse submitLevel(LevelSubmissionRequestDto request,
                                          String userEmail, Long levelId) {

        //Ejecutar el código en Piston
        String output = pistonService.executeCode(request.getUserCode());

        //Se comprueba si la salida del código es igual que la esperada
        boolean isCorrect = output.trim().equals(request.getExpectedOutput());

        if (isCorrect) {

            User user = userRepository.findUserByEmail(userEmail)
                    .orElseThrow(() -> new GlobalException("Usuario no encontrado", HttpStatus.NOT_FOUND));

            Level level = levelRepository.findById(levelId)
                    .orElseThrow(() -> new GlobalException("Nivel no encontrado", HttpStatus.NOT_FOUND));

            //Se guarda como completado en la base de datos
            UserProgress userProgress = new UserProgress(user, level, request.getPoints(), true,
                    Instant.now());

            userProgressRepository.save(userProgress);

            //Actualizar el usuario para sumarle sus puntos
            user.setPoints(user.getPoints() + request.getPoints());
            userRepository.save(user);

            //Devolver la respuesta
            return new EvaluationResponse(
                    request.getPoints(),
                    "¡Nivel completado!"
            );
        }
        else {

            String feedback = openAiService.generateFeedback(request.getUserCode(),
                    request.getExpectedOutput(), output);

            throw new GlobalException("La salida no coincide. \n" +
                    "➡️ Salida actual: "+output+"\n" +
                    "✅ Salida esperada: "+request.getExpectedOutput()+ "\n\n"+
                    "\uD83D\uDCA1 Recomendación: " + feedback,
                    HttpStatus.BAD_REQUEST);
        }
    }
}
