package com.resume.builder.dto;

public class ExperienceDTO {
    private Long id;
    private String jobTitle;
    private String company;
    private String dates;
    private String description;
    
    // Constructors
    public ExperienceDTO() {}
    
    public ExperienceDTO(Long id, String jobTitle, String company, String dates, String description) {
        this.id = id;
        this.jobTitle = jobTitle;
        this.company = company;
        this.dates = dates;
        this.description = description;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getJobTitle() {
        return jobTitle;
    }
    
    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }
    
    public String getCompany() {
        return company;
    }
    
    public void setCompany(String company) {
        this.company = company;
    }
    
    public String getDates() {
        return dates;
    }
    
    public void setDates(String dates) {
        this.dates = dates;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
}