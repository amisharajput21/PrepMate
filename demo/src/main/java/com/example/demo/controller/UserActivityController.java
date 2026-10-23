package com.example.demo.controller;

import com.example.demo.entity.UserActivity;
import com.example.demo.service.UserActivityService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/activity")
@CrossOrigin(
    origins = {
        "http://localhost:5173",
        "http://localhost:5174"
    }
)
public class UserActivityController {

    private final UserActivityService activityService;

    public UserActivityController(
            UserActivityService activityService
    ) {
        this.activityService = activityService;
    }

    /*
     * IMPORTANT:
     * Is endpoint ko login/dashboard par call MAT karna.
     *
     * Sirf meaningful activity:
     * - verified DSA solve
     * - completed test
     */
    @PostMapping("/{userId}")
    public UserActivity recordActivity(
            @PathVariable Long userId
    ) {

        return activityService.recordActivity(userId);
    }

    @GetMapping("/{userId}/month")
    public List<UserActivity> getMonthlyActivity(
            @PathVariable Long userId,
            @RequestParam int year,
            @RequestParam int month
    ) {

        return activityService.getMonthlyActivity(
                userId,
                year,
                month
        );
    }

    @GetMapping("/{userId}/streak")
    public Map<String, Object> getStreak(
            @PathVariable Long userId
    ) {

        int streak =
                activityService.getCurrentStreak(userId);

        return Map.of(
                "streak", streak,
                "active", streak > 0
        );
    }
}