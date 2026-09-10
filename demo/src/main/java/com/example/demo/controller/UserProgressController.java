package com.example.demo.controller;

import com.example.demo.entity.UserProgress;
import com.example.demo.service.UserProgressService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/progress")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174"
})
public class UserProgressController {

    private final UserProgressService progressService;

    public UserProgressController(UserProgressService progressService) {
        this.progressService = progressService;
    }

    @PostMapping
    public UserProgress saveProgress(
            @RequestParam Long userId,
            @RequestParam Long questionId,
            @RequestParam String status) {

        return progressService.saveProgress(
                userId,
                questionId,
                status
        );
    }

    @GetMapping("/{userId}")
    public List<UserProgress> getUserProgress(
            @PathVariable Long userId) {

        return progressService.getUserProgress(userId);
    }
}