package com.resume.builder.dto;

import java.util.List;

public class ResumeDTO {
    private Long id;
    private String fullName;
    private String email;
    private String phone;
    private String address;
    private String summary;
    private String education;
    private String skills;
    private List<ExperienceDTO> experiences;
    
    // Constructors
    public ResumeDTO() {}
    
    public ResumeDTO(Long id, String fullName, String email, String phone, String address, 
                     String summary, String education, String skills, List<ExperienceDTO> experiences) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.summary = summary;
        this.education = education;
        this.skills = skills;
        this.experiences = experiences;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getFullName() {
        return fullName;
    }
    
    public void setFullName(String fullName) {
        this.fullName = fullName;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getPhone() {
        return phone;
    }
    
    public void setPhone(String phone) {
        this.phone = phone;
    }
    
    public String getAddress() {
        return address;
    }
    
    public void setAddress(String address) {
        this.address = address;
    }
    
    public String getSummary() {
        return summary;
    }
    
    public void setSummary(String summary) {
        this.summary = summary;
    }
    
    public String getEducation() {
        return education;
    }
    
    public void setEducation(String education) {
        this.education = education;
    }
    
    public String getSkills() {
        return skills;
    }
    
    public void setSkills(String skills) {
        this.skills = skills;
    }
    
    public List<ExperienceDTO> getExperiences() {
        return experiences;
    }
    
    public void setExperiences(List<ExperienceDTO> experiences) {
        this.experiences = experiences;
    }
}