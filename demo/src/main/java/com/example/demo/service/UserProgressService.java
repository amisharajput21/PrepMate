package com.example.demo.service;

import com.example.demo.entity.UserProgress;
import com.example.demo.repository.UserProgressRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserProgressService {

    private final UserProgressRepository progressRepository;
    private final UserActivityService activityService;

    public UserProgressService(
            UserProgressRepository progressRepository,
            UserActivityService activityService
    ) {
        this.progressRepository = progressRepository;
        this.activityService = activityService;
    }

    /*
     * Legacy/manual endpoint.
     *
     * IMPORTANT:
     * DSA frontend is endpoint ko checkbox se call nahi karega.
     */
    public UserProgress saveProgress(
            Long userId,
            Long questionId,
            String status
    ) {

        UserProgress progress =
                progressRepository
                        .findByUserIdAndQuestionId(
                                userId,
                                questionId
                        )
                        .orElseGet(UserProgress::new);

        progress.setUserId(userId);
        progress.setQuestionId(questionId);
        progress.setStatus(status);

        progress.setAttempts(
                progress.getAttempts() + 1
        );

        progress.setLastAttemptedAt(
                LocalDateTime.now()
        );

        /*
         * Only backend-verified SOLVED should create activity.
         */
        if ("SOLVED".equalsIgnoreCase(status)) {

            progress.setSolved(true);

            activityService.recordActivity(userId);
        }

        return progressRepository.save(progress);
    }

    public UserProgress markLeetcodeSolved(
            Long userId,
            Long questionId
    ) {

        UserProgress progress =
                getOrCreate(userId, questionId);

        /*
         * Already verified.
         * Don't create duplicate activity.
         */
        if (progress.isLeetcodeSolved()) {
            return progress;
        }

        progress.setLeetcodeSolved(true);

        updateOverallSolved(progress);

        progress.setAttempts(
                progress.getAttempts() + 1
        );

        progress.setLastAttemptedAt(
                LocalDateTime.now()
        );

        UserProgress saved =
                progressRepository.save(progress);

        /*
         * Meaningful activity.
         */
        activityService.recordActivity(userId);

        return saved;
    }

    public UserProgress markGfgSolved(
            Long userId,
            Long questionId
    ) {

        UserProgress progress =
                getOrCreate(userId, questionId);

        if (progress.isGfgSolved()) {
            return progress;
        }

        progress.setGfgSolved(true);

        updateOverallSolved(progress);

        progress.setAttempts(
                progress.getAttempts() + 1
        );

        progress.setLastAttemptedAt(
                LocalDateTime.now()
        );

        UserProgress saved =
                progressRepository.save(progress);

        activityService.recordActivity(userId);

        return saved;
    }

    public List<UserProgress> getUserProgress(
            Long userId
    ) {

        return progressRepository.findByUserId(userId);
    }

    public UserProgress getQuestionProgress(
            Long userId,
            Long questionId
    ) {

        return progressRepository
                .findByUserIdAndQuestionId(
                        userId,
                        questionId
                )
                .orElse(null);
    }

    private UserProgress getOrCreate(
            Long userId,
            Long questionId
    ) {

        return progressRepository
                .findByUserIdAndQuestionId(
                        userId,
                        questionId
                )
                .orElseGet(() -> {

                    UserProgress progress =
                            new UserProgress();

                    progress.setUserId(userId);
                    progress.setQuestionId(questionId);
                    progress.setStatus("UNSOLVED");
                    progress.setAttempts(0);

                    return progress;
                });
    }

    private void updateOverallSolved(
            UserProgress progress
    ) {

        boolean solved =
                progress.isLeetcodeSolved()
                || progress.isGfgSolved();

        progress.setSolved(solved);

        if (solved) {
            progress.setStatus("SOLVED");
        } else {
            progress.setStatus("UNSOLVED");
        }
    }
}