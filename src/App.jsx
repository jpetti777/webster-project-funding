import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL || 'https://macedon-project-funding-backend.onrender.com';
console.log('API_URL:', API_URL);

const projects = [
  { id: 1, name: "Relocate Ambulance Services Downtown", location: "79 Main Street", cost: 1500000, totalCost: 1500000, description: "Relocate ambulance services to 79 Main Street, renovate for 2 ambulance bays, offices, and facade upgrade.", imagePath: "/images/project1.jpg" },
  { id: 2, name: "Revitalize the Former Village Hall", location: "81 Main Street", cost: 1000000, totalCost: 1000000, description: "Renovate former Village Hall for community space and additional Town offices.", imagePath: "/images/project2.jpg" },
  { id: 3, name: "Enhance Gravino Park", location: "135 Main Street", cost: 1500000, totalCost: 1488000, description: "Create dog park, walking trail, update pavilion, and install electrical connections for events.", imagePath: "/images/project3.jpg" },
  { id: 4, name: "Enhance the Main St. Streetscape", location: "Main Street, from Center Street to Route 350", cost: 750000, totalCost: 754000, description: "Replace sidewalks and install decorative lamp posts on Main Street.", imagePath: "/images/project4.jpg" },
  { id: 5, name: "Create Gateways into Downtown", location: "Main/Route 350 and Main/West Street", cost: 250000, totalCost: 250000, description: "Construct welcome signs and install directional signs for downtown parking.", imagePath: "/images/project5.jpg" },
  { id: 6, name: "Establish a Small Project Grant Fund", location: "Downtown Macedon", cost: 600000, totalCost: 800000, description: "Create matching grant fund for small projects in downtown Macedon.", imagePath: "/images/project6.jpg" },
  { id: 7, name: "Rehabilitate the West St. Apartments", location: "2 West Street", cost: 900000, totalCost: 5200000, description: "Construct 16 new townhouses with energy-efficient features.", imagePath: "/images/project7.jpg" },
  { id: 8, name: "Re-open 90 Main St. for Auto Service", location: "90 Main Street", cost: 150000, totalCost: 250000, description: "Upgrade facade, replace windows/doors, install signage/lighting, and repair parking lot.", imagePath: "/images/project8.jpg" },
  { id: 9, name: "Develop Caraglio's Pizza Restaurant", location: "100 Main Street", cost: 500000, totalCost: 950000, description: "Construct new 2,500 sq ft Caraglio's Pizza restaurant with outdoor seating.", imagePath: "/images/project9.jpg" },
  { id: 10, name: "Redevelop 103 Main for Mixed-Use", location: "103 Main Street", cost: 650000, totalCost: 1308000, description: "Renovate for 3 apartments and retail space, enhance facade and entry.", imagePath: "/images/project10.jpg" },
  { id: 11, name: "Expand 104 Main Commercial Building", location: "104 Main Street", cost: 150000, totalCost: 250000, description: "Add second floor, reconfigure for multiple commercial units, renovate interior/exterior.", imagePath: "/images/project11.jpg" },
  { id: 12, name: "Expand Twisted Rail Brewing", location: "108 Main Street", cost: 200000, totalCost: 400000, description: "Reconfigure interior, add rooftop deck, repair patio, upgrade facade and signage.", imagePath: "/images/project12.jpg" },
  { id: 13, name: "Expand the 113 Main St. Apartments", location: "113 Main Street", cost: 300000, totalCost: 635000, description: "Construct addition for 3-4 new rental units, upgrade landscaping and parking.", imagePath: "/images/project13.jpg" },
];

function App() {
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [remainingBudget, setRemainingBudget] = useState(4500000);
  const [comments, setComments] = useState({});
  const [showInstructions, setShowInstructions] = useState(true);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    const totalCost = selectedProjects.reduce((sum, id) => sum + projects.find(p => p.id === id).cost, 0);
    setRemainingBudget(4500000 - totalCost);
  }, [selectedProjects]);

  const handleProjectToggle = (projectId) => {
    setSelectedProjects(prev =>
      prev.includes(projectId)
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  const handleCommentChange = (projectId, comment) => {
    setComments(prev => ({
      ...prev,
      [projectId]: comment
    }));
  };

  const getProgressBarStyle = () => {
    const percentage = ((4500000 - remainingBudget) / 4500000) * 100;
    return {
      width: `${percentage}%`,
      backgroundColor: remainingBudget >= 0 ? '#4CAF50' : '#F44336',
    };
  };

  const handleNextPage = () => {
    if (userEmail.includes('@')) {
      setShowInstructions(false);
      setEmailError('');
    } else {
      setEmailError('Please enter a valid email address');
    }
  };

  const handlePreviousPage = () => {
    setShowInstructions(true);
  };

  const handleSubmit = async () => {
    try {
      const surveyData = {
        userName,
        userEmail,
        selectedProjects,
        comments
      };

      console.log('Submitting survey data:', surveyData);
      console.log('API URL:', API_URL);

      const response = await axios.post(`${API_URL}/api/submit-survey`, surveyData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Survey submission response:', response.data);
      alert('Survey submitted successfully!');
    } catch (error) {
      console.error('Error submitting survey:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up request:', error.message);
      }
      alert(`Error submitting survey: ${error.message}. Please check console for more details.`);
    }
  };

  return (
    <div className="App">
      {!showInstructions && (
        <header className="sticky-header">
          <h1>Macedon NY Forward Project Funding Survey</h1>
          <div className="budget-container">
            <div className="budget-info">
              <span><strong>Total Budget:</strong> ${(4500000).toLocaleString()}</span>
              <span><strong>Remaining:</strong> ${remainingBudget.toLocaleString()}</span>
            </div>
            <div className="progress-container">
              <div className="progress-bar">
                <div style={getProgressBarStyle()}></div>
              </div>
            </div>
            <button className="submit-button" onClick={handleSubmit} disabled={remainingBudget < 0}>Submit</button>
          </div>
          {remainingBudget < 0 && (
            <div className="error-message">
              You have exceeded the $4,500,000 budget. Please deselect some projects.
            </div>
          )}
        </header>
      )}
      <main>
        {showInstructions ? (
          <div className="instructions-page">
            <h1>Macedon NY Forward Project Funding Survey</h1>
            <h3>Instructions</h3>
            <p><strong>Placeholder for now.</strong></p>
            <div className="user-input">
              <input
                type="text"
                placeholder="Your Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Your Email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </div>
            <button
              className="next-button"
              onClick={handleNextPage}
              disabled={!userName || !userEmail}
            >
              Next Page
            </button>
            {emailError && <p className="email-error">{emailError}</p>}
          </div>
        ) : (
          <div className="projects-list">
            {projects.map((project, index) => (
              <div key={project.id} className={`project-card ${selectedProjects.includes(project.id) ? 'selected' : ''}`}>
                <div className="project-image">
                  <img src={project.imagePath} alt={project.name} />
                </div>
                <div className="project-content">
                  <p className="project-number">Project {index + 1} of 13</p>
                  <h3>{project.name}</h3>
                  <p className="project-location">{project.location}</p>
                  <p className="project-description">{project.description}</p>
                  <p className="project-total-cost">Total Project Cost: ${project.totalCost.toLocaleString()}</p>
                  <p className="project-cost"><strong>Funding Request: ${project.cost.toLocaleString()}</strong></p>
                  <div className="fund-checkbox">
                    <input
                      type="checkbox"
                      id={`fund-${project.id}`}
                      checked={selectedProjects.includes(project.id)}
                      onChange={() => handleProjectToggle(project.id)}
                    />
                    <label htmlFor={`fund-${project.id}`}>Fund this Project</label>
                  </div>
                  <textarea
                    value={comments[project.id] || ''}
                    onChange={(e) => handleCommentChange(project.id, e.target.value)}
                    placeholder="Add your comments here..."
                  />
                </div>
              </div>
            ))}
            <button className="previous-button" onClick={handlePreviousPage}>Previous Page</button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
