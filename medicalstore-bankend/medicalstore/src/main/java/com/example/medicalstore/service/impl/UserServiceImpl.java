// Service implementation
package com.example.medicalstore.service.impl;

import com.example.medicalstore.entity.User;
import com.example.medicalstore.repository.UserRepository;
import com.example.medicalstore.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public boolean authenticateUser(String username, String password) {
        Optional<User> userOptional = userRepository.findByUsername(username);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            System.out.println(password);
            String hashedPassword = passwordEncoder.encode(password);
            System.out.println(hashedPassword);
            return passwordEncoder.matches(password, user.getPasswordHash());
        }

        return false;
    }
}