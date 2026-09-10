package com.example.demo.repository;

import com.example.demo.entity.UserProgress;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserProgressRepository
        extends JpaRepository<UserProgress, Long> {

    Optional<UserProgress> findByUserIdAndQuestionId(
            Long userId,
            Long questionId
    );

    List<UserProgress> findByUserId(Long userId);
}