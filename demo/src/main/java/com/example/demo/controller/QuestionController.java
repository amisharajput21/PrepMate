package com.example.demo.controller;

import com.example.demo.entity.Question;
import com.example.demo.service.QuestionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174"
})
public class QuestionController {

    private final QuestionService questionService;

    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @GetMapping
    public List<Question> getAllQuestions() {
        return questionService.getAllQuestions();
    }

    @GetMapping("/topic/{topic}")
    public List<Question> getQuestionsByTopic(
            @PathVariable String topic) {

        return questionService.getQuestionsByTopic(topic);
    }

    @GetMapping("/difficulty/{difficulty}")
    public List<Question> getQuestionsByDifficulty(
            @PathVariable String difficulty) {

        return questionService.getQuestionsByDifficulty(difficulty);
    }

    @GetMapping("/filter")
    public List<Question> getQuestionsByTopicAndDifficulty(
            @RequestParam String topic,
            @RequestParam String difficulty) {

        return questionService.getQuestionsByTopicAndDifficulty(
                topic,
                difficulty
        );
    }
}