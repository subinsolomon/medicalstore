package com.example.medicalstore.controller;

import com.example.medicalstore.model.UserCredentials;
import com.example.medicalstore.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class LoginController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(
            @RequestBody UserCredentials credentials, HttpServletResponse response) {

        Map<String, String> responseBody = new HashMap<>();

        if (userService.authenticateUser(credentials.getUsername(), credentials.getPassword())) {
            // Authentication successful
            responseBody.put("message", "Login successful");
            // Here you would typically generate and set a JWT token or session cookie
            return ResponseEntity.ok(responseBody);
        } else {
            // Authentication failed
            responseBody.put("message", "Invalid username or password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseBody);
        }
    }
}