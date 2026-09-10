package com.example.demo.service;

import com.example.demo.entity.UserProgress;
import com.example.demo.repository.UserProgressRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserProgressService {

    private final UserProgressRepository progressRepository;

    public UserProgressService(UserProgressRepository progressRepository) {
        this.progressRepository = progressRepository;
    }

    public UserProgress saveProgress(
            Long userId,
            Long questionId,
            String status) {

        UserProgress progress =
                progressRepository
                        .findByUserIdAndQuestionId(userId, questionId)
                        .orElse(new UserProgress());

        progress.setUserId(userId);
        progress.setQuestionId(questionId);
        progress.setStatus(status);

        progress.setAttempts(progress.getAttempts() + 1);

        progress.setLastAttemptedAt(LocalDateTime.now());

        return progressRepository.save(progress);
    }

    public List<UserProgress> getUserProgress(Long userId) {
        return progressRepository.findByUserId(userId);
    }
}