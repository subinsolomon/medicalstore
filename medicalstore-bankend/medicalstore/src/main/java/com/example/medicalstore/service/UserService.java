// Service interface
package com.example.medicalstore.service;


public interface UserService {
    boolean authenticateUser(String username, String password);
    boolean existsByUsername(String username);

    boolean existsByEmail(String email);


}