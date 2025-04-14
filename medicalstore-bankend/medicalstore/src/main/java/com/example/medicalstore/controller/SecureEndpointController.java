package com.example.medicalstore.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class SecureEndpointController {

    @GetMapping("/secure-data")
    public ResponseEntity<String> getSecureData(@CookieValue(value = "sessionToken", required = false) String sessionToken) {
        if (sessionToken == null || !"dummy-token-value".equals(sessionToken)) { // Replace with actual validation logic
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access.");
        }

        return ResponseEntity.ok("Here is your secure data!");
    }
}