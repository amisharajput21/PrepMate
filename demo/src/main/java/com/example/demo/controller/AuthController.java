package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        User registeredUser = userService.registerUser(user);
        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User user) {
        User loggedInUser = userService.loginUser(
                user.getEmail(),
                user.getPassword()
        );

        return ResponseEntity.ok(loggedInUser);
    }

    @PutMapping("/profile/{id}")
public ResponseEntity<User> updateProfile(
        @PathVariable Long id,
        @RequestBody User user) {

    User updatedUser = userService.updateUser(id, user);

    return ResponseEntity.ok(updatedUser);
}
}