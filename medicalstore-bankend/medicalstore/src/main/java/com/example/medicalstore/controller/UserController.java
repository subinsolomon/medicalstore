// controller/UserController.java
package com.example.medicalstore.controller;

import com.example.medicalstore.dto.UserProfileDTO;
import com.example.medicalstore.entity.User;
import com.example.medicalstore.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authenticated");
        }
        String username = principal.getName(); // Authenticated username
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        UserProfileDTO profileDTO = new UserProfileDTO(
                user.getUsername(),
                user.getEmail(),
                user.getFirstName(),
                user.getRoles().stream()
                        .map(role -> role.getName())
                        .collect(Collectors.toList())
        );

        return ResponseEntity.ok(profileDTO);
    }
}
