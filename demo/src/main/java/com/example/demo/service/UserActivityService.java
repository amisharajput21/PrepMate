package com.example.demo.service;

import com.example.demo.entity.UserActivity;
import com.example.demo.repository.UserActivityRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class UserActivityService {

    private final UserActivityRepository activityRepository;

    public UserActivityService(
            UserActivityRepository activityRepository
    ) {
        this.activityRepository = activityRepository;
    }

    /*
     * Meaningful activity only.
     *
     * Same user + same date = only ONE database row.
     */
    public UserActivity recordActivity(Long userId) {

        LocalDate today = LocalDate.now();

        return activityRepository
                .findByUserIdAndActivityDate(userId, today)
                .orElseGet(() -> {

                    UserActivity activity = new UserActivity();

                    activity.setUserId(userId);
                    activity.setActivityDate(today);

                    return activityRepository.save(activity);
                });
    }

    public List<UserActivity> getMonthlyActivity(
            Long userId,
            int year,
            int month
    ) {

        LocalDate start =
                LocalDate.of(year, month, 1);

        LocalDate end =
                start.withDayOfMonth(start.lengthOfMonth());

        return activityRepository
                .findByUserIdAndActivityDateBetween(
                        userId,
                        start,
                        end
                );
    }

    public int getCurrentStreak(Long userId) {

        LocalDate today = LocalDate.now();

        int streak = 0;

        LocalDate date = today;

        while (
                activityRepository
                        .findByUserIdAndActivityDate(
                                userId,
                                date
                        )
                        .isPresent()
        ) {

            streak++;

            date = date.minusDays(1);
        }

        return streak;
    }
}