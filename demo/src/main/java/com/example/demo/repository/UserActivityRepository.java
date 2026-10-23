package com.example.demo.repository;

import com.example.demo.entity.UserActivity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface UserActivityRepository
        extends JpaRepository<UserActivity, Long> {

    Optional<UserActivity> findByUserIdAndActivityDate(
            Long userId,
            LocalDate activityDate
    );

    List<UserActivity> findByUserIdAndActivityDateBetween(
            Long userId,
            LocalDate startDate,
            LocalDate endDate
    );
}