package com.example.demo.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(
    name = "user_progress",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = {"user_id", "question_id"})
    }
)
public class UserProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "question_id", nullable = false)
    private Long questionId;

    @Column(nullable = false)
    private String status;

    private boolean leetcodeSolved;

    private boolean gfgSolved;

    private boolean solved;

    private int attempts;

    private LocalDateTime lastAttemptedAt;

    public UserProgress() {
    }

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getQuestionId() {
        return questionId;
    }

    public void setQuestionId(Long questionId) {
        this.questionId = questionId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public boolean isLeetcodeSolved() {
        return leetcodeSolved;
    }

    public void setLeetcodeSolved(boolean leetcodeSolved) {
        this.leetcodeSolved = leetcodeSolved;
    }

    public boolean isGfgSolved() {
        return gfgSolved;
    }

    public void setGfgSolved(boolean gfgSolved) {
        this.gfgSolved = gfgSolved;
    }

    public boolean isSolved() {
        return solved;
    }

    public void setSolved(boolean solved) {
        this.solved = solved;
    }

    public int getAttempts() {
        return attempts;
    }

    public void setAttempts(int attempts) {
        this.attempts = attempts;
    }

    public LocalDateTime getLastAttemptedAt() {
        return lastAttemptedAt;
    }

    public void setLastAttemptedAt(LocalDateTime lastAttemptedAt) {
        this.lastAttemptedAt = lastAttemptedAt;
    }
}