package com.resume.builder.controller;

import com.resume.builder.dto.ResumeDTO;
import com.resume.builder.service.ResumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/resumes")
@CrossOrigin(origins = "http://localhost:3000")
public class ResumeController {
    
    @Autowired
    private ResumeService resumeService;
    
    @GetMapping
    public List<ResumeDTO> getAllResumes() {
        return resumeService.getAllResumes();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ResumeDTO> getResumeById(@PathVariable Long id) {
        ResumeDTO resume = resumeService.getResumeById(id);
        if (resume != null) {
            return ResponseEntity.ok(resume);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping
    public ResumeDTO createResume(@RequestBody ResumeDTO resumeDTO) {
        return resumeService.saveResume(resumeDTO);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ResumeDTO> updateResume(@PathVariable Long id, @RequestBody ResumeDTO resumeDTO) {
        ResumeDTO updatedResume = resumeService.updateResume(id, resumeDTO);
        if (updatedResume != null) {
            return ResponseEntity.ok(updatedResume);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteResume(@PathVariable Long id) {
        resumeService.deleteResume(id);
        return ResponseEntity.noContent().build();
    }
}