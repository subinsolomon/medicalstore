// Service interface
package com.example.medicalstore.service;


import java.util.List;

public interface UserService {
    boolean authenticateUser(String username, String password);
    boolean existsByUsername(String username);
    List<String> getUserRoles(String username);

    boolean existsByEmail(String email);


}