package com.resume.builder.service;

import com.resume.builder.dto.ResumeDTO;
import com.resume.builder.model.Resume;
import com.resume.builder.repository.ResumeRepository;
import com.resume.builder.model.Experience;
import com.resume.builder.repository.ExperienceRepository;
import com.resume.builder.dto.ExperienceDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ResumeService {
    
    @Autowired
    private ResumeRepository resumeRepository;
    
    @Autowired
    private ExperienceRepository experienceRepository;
    
    public List<ResumeDTO> getAllResumes() {
        return resumeRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public ResumeDTO getResumeById(Long id) {
        Resume resume = resumeRepository.findById(id).orElse(null);
        return resume != null ? convertToDTO(resume) : null;
    }
    
    public ResumeDTO saveResume(ResumeDTO resumeDTO) {
        Resume resume = convertToEntity(resumeDTO);
        Resume savedResume = resumeRepository.save(resume);
        
        // Save experiences
        if (resumeDTO.getExperiences() != null) {
            for (ExperienceDTO expDTO : resumeDTO.getExperiences()) {
                Experience experience = new Experience();
                experience.setJobTitle(expDTO.getJobTitle());
                experience.setCompany(expDTO.getCompany());
                experience.setDates(expDTO.getDates());
                experience.setDescription(expDTO.getDescription());
                experience.setResume(savedResume);
                experienceRepository.save(experience);
            }
        }
        
        return convertToDTO(savedResume);
    }
    
    public ResumeDTO updateResume(Long id, ResumeDTO resumeDTO) {
        Resume existingResume = resumeRepository.findById(id).orElse(null);
        if (existingResume == null) {
            return null;
        }
        
        // Update resume fields
        existingResume.setFullName(resumeDTO.getFullName());
        existingResume.setEmail(resumeDTO.getEmail());
        existingResume.setPhone(resumeDTO.getPhone());
        existingResume.setAddress(resumeDTO.getAddress());
        existingResume.setSummary(resumeDTO.getSummary());
        existingResume.setEducation(resumeDTO.getEducation());
        existingResume.setSkills(resumeDTO.getSkills());
        
        Resume updatedResume = resumeRepository.save(existingResume);
        return convertToDTO(updatedResume);
    }
    
    public void deleteResume(Long id) {
        resumeRepository.deleteById(id);
    }
    
    private ResumeDTO convertToDTO(Resume resume) {
        ResumeDTO dto = new ResumeDTO();
        dto.setId(resume.getId());
        dto.setFullName(resume.getFullName());
        dto.setEmail(resume.getEmail());
        dto.setPhone(resume.getPhone());
        dto.setAddress(resume.getAddress());
        dto.setSummary(resume.getSummary());
        dto.setEducation(resume.getEducation());
        dto.setSkills(resume.getSkills());
        
        // Convert experiences
        if (resume.getExperiences() != null) {
            List<ExperienceDTO> experienceDTOs = resume.getExperiences().stream()
                    .map(exp -> new ExperienceDTO(
                            exp.getId(),
                            exp.getJobTitle(),
                            exp.getCompany(),
                            exp.getDates(),
                            exp.getDescription()))
                    .collect(Collectors.toList());
            dto.setExperiences(experienceDTOs);
        }
        
        return dto;
    }
    
    private Resume convertToEntity(ResumeDTO dto) {
        Resume resume = new Resume();
        resume.setId(dto.getId());
        resume.setFullName(dto.getFullName());
        resume.setEmail(dto.getEmail());
        resume.setPhone(dto.getPhone());
        resume.setAddress(dto.getAddress());
        resume.setSummary(dto.getSummary());
        resume.setEducation(dto.getEducation());
        resume.setSkills(dto.getSkills());
        return resume;
    }
}