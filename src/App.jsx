import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL || 'https://macedon-project-funding-backend.onrender.com';
console.log('API_URL:', API_URL);

const projects = [
  { id: 1, name: "Relocate Ambulance Services Downtown", location: "79 Main Street", cost: 1500000, totalCost: 1500000, description: "This project will relocate ambulance services from Wayneport Road to the building at 79 Main Street. The ground floor will be renovated to accommodate 2 ambulances bays. The upper floor will house staff offices and support rooms. The exterior facade will also be upgraded.", imagePath: "/images/project1.jpg" },
  { id: 2, name: "Revitalize the Former Village Hall", location: "81 Main Street", cost: 1000000, totalCost: 1000000, description: "This project will renovate the first floor of the former Village Hall to create a community meeting space. The upper floor will be renovated for additional Town offices or storage space. A covered vestibule will be constructed to connect the Village Hall to the building at 79 Main.", imagePath: "/images/project2.jpg" },
  { id: 3, name: "Enhance Gravino Park", location: "135 Main Street", cost: 1500000, totalCost: 1488000, description: "This project will create a fenced-in dog park at Gravino Park as well as a walking trail around the perimeter of the park. The pavilion will also be updated and electrical connections will be installed in the parking lot to allow for events like food truck rodeos.", imagePath: "/images/project3.jpg" },
  { id: 4, name: "Enhance the Main St. Streetscape", location: "Main Street, from Center Street to Route 350", cost: 750000, totalCost: 754000, description: "This project will replace the sidewalks on both sides of Main Street from Center Street to Route 350. Decorative lamp posts will also be installed to enhance night-time lighting. ", imagePath: "/images/project4.jpg" },
  { id: 5, name: "Create Gateways into Downtown", location: "Main/Route 350 and Main/West Street", cost: 250000, totalCost: 250000, description: "This project will construct two “Welcome to Macedon” signs at the eastern and western gateways into downtown at the Main/Route 350 and Main/West Street intersections. In addition, several directional signs will be installed to direct visitors to downtown public parking lots.", imagePath: "/images/project5.jpg" },
  { id: 6, name: "Establish a Small Project Grant Fund", location: "Downtown Macedon", cost: 600000, totalCost: 800000, description: "This project will create a matching grant fund to support small projects such as facade improvements, renovations to commercial and mixed-use buildings, business assistance, and public art installations. ", imagePath: "/images/project6.jpg" },
  { id: 7, name: "Rehabilitate the West St. Apartments", location: "2 West Street", cost: 900000, totalCost: 5200000, description: "This project will construct two new buildings with a total of 16 townhouses to replace the apartments lost by fire. The townhouses will include energy-efficient appliances, HVAC systems, and upgraded windows. The exterior landscaping and fencing will also be upgraded.", imagePath: "/images/project7.jpg" },
  { id: 8, name: "Re-open 90 Main St. for Auto Service", location: "90 Main Street", cost: 150000, totalCost: 250000, description: "This project will complete the final steps to allow 90 Main Street to re-open for auto service, including upgrading the facade of the building, replacing the windows and doors, and installing new exterior signage and lighting. The parking lot will also be repaired.", imagePath: "/images/project8.jpg" },
  { id: 9, name: "Develop Caraglio's Pizza Restaurant", location: "100 Main Street", cost: 500000, totalCost: 950000, description: "This project will construct a new Caraglio’s Pizza restaurant at 100 Main Street. The existing building on the lot will be demolished to allow for the construction of a new 2,500 square-foot restaurant, with a covered outdoor seating area.", imagePath: "/images/project9.jpg" },
  { id: 10, name: "Redevelop 103 Main for Mixed-Use", location: "103 Main Street", cost: 650000, totalCost: 1308000, description: "This project will renovate the second floor into 3 two-bedroom apartments. The first floor will be renovated into leasable retail space. The front entry will be enhanced and the facade will be upgraded with new siding, awnings, windows, doors, signage, and lighting.", imagePath: "/images/project10.jpg" },
  { id: 11, name: "Expand 104 Main Commercial Building", location: "104 Main Street", cost: 150000, totalCost: 250000, description: "This project will add a second floor to the 104 Main Street building and re-configure it to accommodate multiple commercial units for small to mid-size businesses. This project will also include interior renovations, facade improvements, and upgraded landscaping and parking.", imagePath: "/images/project11.jpg" },
  { id: 12, name: "Expand Twisted Rail Brewing", location: "108 Main Street", cost: 200000, totalCost: 400000, description: "This project will re-configure Twisted Rail Brewing’s interior space and add a rooftop deck to expand seating capacity. The existing patio will also be repaired and used for outdoor seating. The exterior facade and signage will also be upgraded.", imagePath: "/images/project12.jpg" },
  { id: 13, name: "Expand the 113 Main St. Apartments", location: "113 Main Street", cost: 300000, totalCost: 635000, description: "This project will construct a new 2,500 to 3,500 square-foot addition to create 3 to 4 new rental units at the 113 Main Street apartments. The landscaping, parking area, and signage will also be upgraded. ", imagePath: "/images/project13.jpg" },
];

function App() {
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [remainingBudget, setRemainingBudget] = useState(4500000);
  const [comments, setComments] = useState({});
  const [showInstructions, setShowInstructions] = useState(true);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    if (isSubmitted) return; // Prevent multiple submissions

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
      setIsSubmitted(true); // Set the submitted state to true
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
                <button 
                  className={`submit-button ${isSubmitted ? 'submitted' : ''}`}
                  onClick={handleSubmit} 
                  disabled={remainingBudget < 0 || selectedProjects.length === 0 || isSubmitted}
                >
                  {isSubmitted ? 'Submitted' : 'Submit'}
                </button>
              </div>
              {remainingBudget < 0 && (
                <div className="error-message">
                  You have exceeded the $4,500,000 budget. Please deselect some projects.
                </div>
              )}
              {selectedProjects.length === 0 && !isSubmitted && (
                <div className="error-message">
                  Please select at least one project before submitting.
                </div>
              )}
              {isSubmitted && (
                <div className="success-message">
                  Thank you for your submission! You may now close this page.
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
