package com.example.medicalstore.controller;

import com.example.medicalstore.model.UserCredentials;
import com.example.medicalstore.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class LoginController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(
            @RequestBody UserCredentials credentials, HttpServletResponse response) {

        Map<String, Object> responseBody = new HashMap<>();

        if (userService.authenticateUser(credentials.getUsername(), credentials.getPassword())) {
            responseBody.put("message", "Login successful");

            List<String> roles = userService.getUserRoles(credentials.getUsername());
            responseBody.put("roles", roles);

            return ResponseEntity.ok(responseBody);
        } else {
            responseBody.put("message", "Invalid username or password ");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseBody);
        }
    }

}