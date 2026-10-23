package com.example.demo.service;

import com.example.demo.entity.Question;
import com.example.demo.entity.UserProgress;
import com.example.demo.repository.QuestionRepository;
import com.example.demo.repository.UserProgressRepository;

import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class LeetCodeSyncService {

    private final QuestionRepository questionRepository;
    private final UserProgressRepository progressRepository;
    private final UserProgressService progressService;

    private final RestTemplate restTemplate =
            new RestTemplate();

    /*
     * Public accepted-submission API adapter.
     *
     * This avoids directly calling LeetCode GraphQL
     * from your Spring server.
     */
    private static final String LEETCODE_API =
            "https://alfa-leetcode-api.onrender.com";

    public LeetCodeSyncService(
            QuestionRepository questionRepository,
            UserProgressRepository progressRepository,
            UserProgressService progressService
    ) {

        this.questionRepository = questionRepository;
        this.progressRepository = progressRepository;
        this.progressService = progressService;
    }

    public int syncUser(
            Long userId,
            String username
    ) {

        if (
                username == null
                || username.isBlank()
        ) {
            return 0;
        }

        try {

            String url =
                    LEETCODE_API
                    + "/"
                    + username.trim()
                    + "/acSubmission?limit=20";

            HttpHeaders headers =
                    new HttpHeaders();

            headers.set(
                    HttpHeaders.USER_AGENT,
                    "PrepMate/1.0"
            );

            headers.set(
                    HttpHeaders.ACCEPT,
                    MediaType.APPLICATION_JSON_VALUE
            );

            HttpEntity<Void> request =
                    new HttpEntity<>(headers);

            ResponseEntity<Map> response =
                    restTemplate.exchange(
                            url,
                            HttpMethod.GET,
                            request,
                            Map.class
                    );

            if (
                    !response.getStatusCode()
                            .is2xxSuccessful()
                    || response.getBody() == null
            ) {

                System.err.println(
                        "LeetCode adapter returned: "
                        + response.getStatusCode()
                );

                return 0;
            }

            Map body = response.getBody();

            Object rawSubmissions =
                    body.get("submission");

            if (!(rawSubmissions instanceof List)) {

                rawSubmissions =
                        body.get("recentAcSubmission");

            }

            if (!(rawSubmissions instanceof List)) {
                return 0;
            }

            Set<String> acceptedSlugs =
                    new HashSet<>();

            for (
                    Object item :
                    (List<?>) rawSubmissions
            ) {

                if (!(item instanceof Map)) {
                    continue;
                }

                Map submission =
                        (Map) item;

                String slug =
                        firstNonBlank(
                                submission.get("titleSlug"),
                                submission.get("title_slug"),
                                submission.get("slug")
                        );

                if (
                        slug != null
                        && !slug.isBlank()
                ) {

                    acceptedSlugs.add(
                            slug.toLowerCase()
                    );
                }
            }

            if (acceptedSlugs.isEmpty()) {
                return 0;
            }

            List<Question> questions =
                    questionRepository.findAll();

            int solvedCount = 0;

            for (Question question : questions) {

                String leetcodeLink =
                        question.getLeetcodeLink();

                if (
                        leetcodeLink == null
                        || leetcodeLink.isBlank()
                ) {
                    continue;
                }

                String slug =
                        extractSlug(leetcodeLink);

                if (slug == null) {
                    continue;
                }

                if (
                        acceptedSlugs.contains(
                                slug.toLowerCase()
                        )
                ) {

                    Optional<UserProgress> existing =
                            progressRepository
                                    .findByUserIdAndQuestionId(
                                            userId,
                                            question.getId()
                                    );

                    boolean alreadySolved =
                            existing.isPresent()
                            && existing.get()
                                .isLeetcodeSolved();

                    if (!alreadySolved) {

                        progressService
                                .markLeetcodeSolved(
                                        userId,
                                        question.getId()
                                );

                        solvedCount++;
                    }
                }
            }

            return solvedCount;

        } catch (Exception e) {

            System.err.println(
                    "LeetCode sync failed: "
                    + e.getMessage()
            );

            return 0;
        }
    }

    private String extractSlug(
            String url
    ) {

        Pattern pattern =
                Pattern.compile(
                        "/problems/([^/?#]+)"
                );

        Matcher matcher =
                pattern.matcher(url);

        if (matcher.find()) {
            return matcher.group(1);
        }

        return null;
    }

    private String firstNonBlank(
            Object... values
    ) {

        for (Object value : values) {

            if (value == null) {
                continue;
            }

            String text =
                    String.valueOf(value).trim();

            if (!text.isBlank()
                    && !"null".equalsIgnoreCase(text)) {

                return text;
            }
        }

        return null;
    }
}