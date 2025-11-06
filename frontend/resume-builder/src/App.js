import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [resume, setResume] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    summary: '',
    education: '',
    skills: '',
    experiences: []
  });
  
  const [resumeId, setResumeId] = useState(null);
  
  useEffect(() => {
    // Load existing resume if available
    loadResume();
  }, []);
  
  const loadResume = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/resumes');
      if (response.data && response.data.length > 0) {
        const latestResume = response.data[0];
        setResume({
          fullName: latestResume.fullName || '',
          email: latestResume.email || '',
          phone: latestResume.phone || '',
          address: latestResume.address || '',
          summary: latestResume.summary || '',
          education: latestResume.education || '',
          skills: latestResume.skills || '',
          experiences: latestResume.experiences || []
        });
        setResumeId(latestResume.id);
      }
    } catch (error) {
      console.log('No existing resume found');
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setResume({
      ...resume,
      [name]: value
    });
  };
  
  const handleExperienceChange = (index, e) => {
    const { name, value } = e.target;
    const updatedExperiences = [...resume.experiences];
    updatedExperiences[index] = {
      ...updatedExperiences[index],
      [name]: value
    };
    setResume({
      ...resume,
      experiences: updatedExperiences
    });
  };
  
  const addExperience = () => {
    setResume({
      ...resume,
      experiences: [...resume.experiences, { jobTitle: '', company: '', dates: '', description: '' }]
    });
  };
  
  const removeExperience = (index) => {
    const updatedExperiences = [...resume.experiences];
    updatedExperiences.splice(index, 1);
    setResume({
      ...resume,
      experiences: updatedExperiences
    });
  };
  
  const saveResume = async () => {
    try {
      const resumeData = {
        ...resume,
        skills: resume.skills
      };
      
      if (resumeId) {
        // Update existing resume
        await axios.put(`http://localhost:8080/api/resumes/${resumeId}`, resumeData);
      } else {
        // Create new resume
        const response = await axios.post('http://localhost:8080/api/resumes', resumeData);
        setResumeId(response.data.id);
      }
      alert('Resume saved successfully!');
    } catch (error) {
      console.error('Error saving resume:', error);
      alert('Error saving resume');
    }
  };
  
  const printResume = () => {
    window.print();
  };
  
  return (
    <div className="container">
      {/* Form Column */}
      <div className="form-column">
        <h1>Resume Builder</h1>
        
        {/* Personal Information Section */}
        <div className="form-section">
          <h2>Personal Information</h2>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input 
              type="text" 
              id="fullName" 
              name="fullName" 
              value={resume.fullName} 
              onChange={handleInputChange} 
              placeholder="John Doe"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={resume.email} 
              onChange={handleInputChange} 
              placeholder="john.doe@example.com"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input 
              type="tel" 
              id="phone" 
              name="phone" 
              value={resume.phone} 
              onChange={handleInputChange} 
              placeholder="(123) 456-7890"
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input 
              type="text" 
              id="address" 
              name="address" 
              value={resume.address} 
              onChange={handleInputChange} 
              placeholder="City, Country"
            />
          </div>
        </div>
        
        {/* Professional Summary Section */}
        <div className="form-section">
          <h2>Professional Summary</h2>
          <div className="form-group">
            <label htmlFor="summary">Summary</label>
            <textarea 
              id="summary" 
              name="summary" 
              value={resume.summary} 
              onChange={handleInputChange} 
              placeholder="Brief professional summary..."
            />
          </div>
        </div>
        
        {/* Work Experience Section */}
        <div className="form-section">
          <h2>Work Experience</h2>
          <div id="experienceContainer">
            {resume.experiences.map((exp, index) => (
              <div key={index} className="experience-entry">
                <button 
                  className="remove-btn" 
                  onClick={() => removeExperience(index)}
                >
                  Remove
                </button>
                <div className="form-group">
                  <label htmlFor={`jobTitle${index}`}>Job Title</label>
                  <input 
                    type="text" 
                    id={`jobTitle${index}`} 
                    name="jobTitle" 
                    value={exp.jobTitle} 
                    onChange={(e) => handleExperienceChange(index, e)} 
                    placeholder="Software Engineer"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor={`company${index}`}>Company</label>
                  <input 
                    type="text" 
                    id={`company${index}`} 
                    name="company" 
                    value={exp.company} 
                    onChange={(e) => handleExperienceChange(index, e)} 
                    placeholder="Company Name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor={`dates${index}`}>Dates</label>
                  <input 
                    type="text" 
                    id={`dates${index}`} 
                    name="dates" 
                    value={exp.dates} 
                    onChange={(e) => handleExperienceChange(index, e)} 
                    placeholder="Jan 2020 - Present"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor={`description${index}`}>Description</label>
                  <textarea 
                    id={`description${index}`} 
                    name="description" 
                    value={exp.description} 
                    onChange={(e) => handleExperienceChange(index, e)} 
                    placeholder="Job responsibilities and achievements..."
                  />
                </div>
              </div>
            ))}
          </div>
          <button id="addExperienceBtn" className="btn" onClick={addExperience}>
            Add Experience
          </button>
        </div>
        
        {/* Education Section */}
        <div className="form-section">
          <h2>Education</h2>
          <div className="form-group">
            <label htmlFor="education">Education Details</label>
            <textarea 
              id="education" 
              name="education" 
              value={resume.education} 
              onChange={handleInputChange} 
              placeholder="Degree, University, Year..."
            />
          </div>
        </div>
        
        {/* Skills Section */}
        <div className="form-section">
          <h2>Skills</h2>
          <div className="form-group">
            <label htmlFor="skills">Skills (comma separated)</label>
            <input 
              type="text" 
              id="skills" 
              name="skills" 
              value={resume.skills} 
              onChange={handleInputChange} 
              placeholder="JavaScript, HTML, CSS, React..."
            />
          </div>
        </div>
        
        {/* Action Buttons */}
        <button className="btn btn-save" onClick={saveResume}>
          Save Resume
        </button>
        <button id="print-pdf-btn" className="btn btn-print" onClick={printResume}>
          Print as PDF
        </button>
      </div>
      
      {/* Preview Column */}
      <div className="preview-column">
        <div className="resume-preview">
          <div className="resume-header">
            <h1 className="resume-name">{resume.fullName || 'Your Name'}</h1>
            <div className="resume-contact">
              <span>{resume.email || 'email@example.com'}</span> | 
              <span>{resume.phone || '(123) 456-7890'}</span> | 
              <span>{resume.address || 'City, Country'}</span>
            </div>
          </div>
          
          {/* Professional Summary */}
          {resume.summary && (
            <div className="resume-section">
              <h3>Professional Summary</h3>
              <p>{resume.summary}</p>
            </div>
          )}
          
          {/* Work Experience */}
          {resume.experiences && resume.experiences.length > 0 && (
            <div className="resume-section">
              <h3>Work Experience</h3>
              <div className="resume-experience">
                {resume.experiences.map((exp, index) => (
                  <div key={index} className="experience-item">
                    <div className="experience-header">
                      <span className="experience-title">{exp.jobTitle || 'Job Title'}</span>
                      <span className="experience-dates">{exp.dates || 'Dates'}</span>
                    </div>
                    <div className="experience-company">{exp.company || 'Company Name'}</div>
                    <div className="experience-description">{exp.description || 'Job description will appear here...'}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Education */}
          {resume.education && (
            <div className="resume-section">
              <h3>Education</h3>
              <p>{resume.education}</p>
            </div>
          )}
          
          {/* Skills */}
          {resume.skills && (
            <div className="resume-section">
              <h3>Skills</h3>
              <div className="skills-list">
                {resume.skills.split(',').map((skill, index) => (
                  <span key={index} className="skill-item">
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
