package com.example.demo.controller;

import com.example.demo.entity.UserProgress;
import com.example.demo.service.LeetCodeSyncService;
import com.example.demo.service.UserProgressService;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/progress")
@CrossOrigin(
    origins = {
        "http://localhost:5173",
        "http://localhost:5174"
    }
)
public class UserProgressController {

    private final UserProgressService progressService;
    private final LeetCodeSyncService leetCodeSyncService;

    public UserProgressController(
            UserProgressService progressService,
            LeetCodeSyncService leetCodeSyncService
    ) {

        this.progressService = progressService;
        this.leetCodeSyncService = leetCodeSyncService;
    }

    /*
     * Legacy endpoint.
     */
    @PostMapping
    public UserProgress saveProgress(
            @RequestParam Long userId,
            @RequestParam Long questionId,
            @RequestParam String status
    ) {

        return progressService.saveProgress(
                userId,
                questionId,
                status
        );
    }

    @GetMapping("/{userId}")
    public List<UserProgress> getUserProgress(
            @PathVariable Long userId
    ) {

        return progressService.getUserProgress(userId);
    }

    @GetMapping("/{userId}/{questionId}")
    public UserProgress getQuestionProgress(
            @PathVariable Long userId,
            @PathVariable Long questionId
    ) {

        return progressService.getQuestionProgress(
                userId,
                questionId
        );
    }

    /*
     * Verify LeetCode accepted submissions.
     */
    @PostMapping("/{userId}/leetcode/sync")
    public Map<String, Object> syncLeetCode(
            @PathVariable Long userId,
            @RequestParam String username
    ) {

        int solved =
                leetCodeSyncService.syncUser(
                        userId,
                        username
                );

        return Map.of(
                "success", true,
                "solved", solved
        );
    }

    /*
     * Internal verified endpoints.
     *
     * Frontend checkbox MUST NOT call these.
     */
    @PostMapping("/{userId}/{questionId}/leetcode")
    public UserProgress markLeetcodeSolved(
            @PathVariable Long userId,
            @PathVariable Long questionId
    ) {

        return progressService.markLeetcodeSolved(
                userId,
                questionId
        );
    }

    @PostMapping("/{userId}/{questionId}/gfg")
    public UserProgress markGfgSolved(
            @PathVariable Long userId,
            @PathVariable Long questionId
    ) {

        return progressService.markGfgSolved(
                userId,
                questionId
        );
    }
}