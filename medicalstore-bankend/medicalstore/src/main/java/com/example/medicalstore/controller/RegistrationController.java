package com.example.medicalstore.controller;

import com.example.medicalstore.entity.User;
import com.example.medicalstore.service.impl.UserServiceImpl;
import com.example.medicalstore.model.RegistrationRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
//@CrossOrigin(origins = "*") // Enable CORS for React frontend
public class RegistrationController {

    @Autowired
    private UserServiceImpl userService;

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> registerUser(@RequestBody RegistrationRequest registrationRequest) {
        Map<String, Object> response = new HashMap<>();

        try {
            // Check if username already exists
            if (userService.existsByUsername(registrationRequest.getUsername())) {
                response.put("success", false);
                response.put("message", "Username already exists");
                return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
            }

            // Check if email already exists
            if (registrationRequest.getEmail() != null && userService.existsByEmail(registrationRequest.getEmail())) {
                response.put("success", false);
                response.put("message", "Email already exists");
                return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
            }

            // Create new user
            User newUser = userService.registerNewUser(registrationRequest);

            response.put("success", true);
            response.put("message", "User registered successfully");
            return ResponseEntity.status(HttpStatus.CREATED).body(response);

        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Registration failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/check-username")
    public ResponseEntity<Map<String, Object>> checkUsernameAvailability(@RequestParam String username) {
        Map<String, Object> response = new HashMap<>();
        boolean isAvailable = !userService.existsByUsername(username);

        response.put("available", isAvailable);
        return ResponseEntity.ok(response);
    }
}