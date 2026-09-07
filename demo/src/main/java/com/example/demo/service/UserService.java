package com.example.demo.service;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User registerUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public User updateUser(Long id, User updatedUser) {

    User user = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found"));

    user.setName(updatedUser.getName());
    user.setEmail(updatedUser.getEmail());

    return userRepository.save(user);
}

    public User loginUser(String email, String password) {

    Optional<User> optionalUser = userRepository.findByEmail(email);

    if (optionalUser.isEmpty()) {
        throw new RuntimeException("User not found");
    }

    User user = optionalUser.get();

    if (!passwordEncoder.matches(password, user.getPassword())) {
        throw new RuntimeException("Invalid email or password");
    }

    return user;
}
}