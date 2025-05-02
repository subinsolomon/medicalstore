// dto/UserProfileDTO.java
package com.example.medicalstore.dto;

import java.util.List;

public class UserProfileDTO {
    private String username;
    private String email;
    private String fullName;
    private List<String> roles;

    // Constructor
    public UserProfileDTO(String username, String email, String fullName, List<String> roles) {
        this.username = username;
        this.email = email;
        this.fullName = fullName;
        this.roles = roles;
    }

    public String getUsername() { return username; }
    public String getEmail() { return email; }
    public String getFullName() { return fullName; }
    public List<String> getRoles() { return roles; }
}
