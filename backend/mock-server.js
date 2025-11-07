const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8080;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for resumes
let resumes = [];
let nextId = 1;

// Helper function to generate IDs
const generateId = () => {
  return nextId++;
};

// Routes
// GET all resumes
app.get('/api/resumes', (req, res) => {
  res.json(resumes);
});

// POST create a new resume
app.post('/api/resumes', (req, res) => {
  const resumeData = req.body;
  const newResume = {
    id: generateId(),
    ...resumeData,
    createdAt: new Date().toISOString()
  };
  resumes.push(newResume);
  res.status(201).json(newResume);
});

// PUT update an existing resume
app.put('/api/resumes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const resumeIndex = resumes.findIndex(r => r.id === id);
  
  if (resumeIndex === -1) {
    return res.status(404).json({ error: 'Resume not found' });
  }
  
  const updatedResume = {
    id: id,
    ...req.body,
    updatedAt: new Date().toISOString()
  };
  
  resumes[resumeIndex] = updatedResume;
  res.json(updatedResume);
});

// DELETE a resume
app.delete('/api/resumes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const resumeIndex = resumes.findIndex(r => r.id === id);
  
  if (resumeIndex === -1) {
    return res.status(404).json({ error: 'Resume not found' });
  }
  
  resumes.splice(resumeIndex, 1);
  res.status(204).send();
});

// Start server
app.listen(PORT, () => {
  console.log(`Mock server running on http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('GET    /api/resumes');
  console.log('POST   /api/resumes');
  console.log('PUT    /api/resumes/:id');
  console.log('DELETE /api/resumes/:id');
});