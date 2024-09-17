import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL || 'https://webster-project-funding-backend.onrender.com';
console.log('API_URL:', API_URL);

const projects = [
  { id: 1, name: "Establish Village Center at 82", location: "82 E. Main St.", cost: 650000, totalCost: 1300000, description: "This project will create a new mixed-use destination including a large renovated office building, brewery/event space, and smaller commercial spaces with upgraded parking and circulation throughout the site.", imagePath: "/images/project1.jpg" },
  { id: 2, name: "Enhance Veterans Memorial Park", location: "28 North Ave.", cost: 1100000, totalCost: 1100000, description: "This project will enhance the park for performances and events. The existing gazebo will be replaced with a true bandshell structure. The Veterans Memorial will be relocated away from the street to create a more contemplative space. Walkways, seat walls, and stairs will be replaced to make the space more accessible.", imagePath: "/images/project2.jpg" },
  { id: 3, name: "Establish a Small Project Grant Fund", location: "Village of Webster", cost: 600000, totalCost: 800000, description: "This project will establish a small grant fund to support smaller-scale projects like façade improvements, renovations to commercial and mixed-use buildings, and public art installations.", imagePath: "/images/project3.jpg" },
  { id: 4, name: "Create a Conservatory at Kittelberger Florist", location: "263 North Ave.", cost: 500000, totalCost: 1149552, description: "Complement existing retail space at Kittelberger Florist & Gifts with a new conservatory to be used to cultivate plants, as a café space, and for educational programs. This project also includes rooftop solar panels with a community education component.", imagePath: "/images/project4.jpg" },
  { id: 5, name: "Enhance Harmony House", location: "58 E. Main St", cost: 800000, totalCost: 861000, description: "This project will enhance the historic Harmony House and make the building accessible for performances and events. Elements include a ramp at the main entrance, an elevator, accessible restrooms, and upgraded air conditioning. The building's façade on Main Street will also be renovated.", imagePath: "/images/project5.jpg" },
  { id: 6, name: "Enhance Wayfinding in Downtown Webster", location: "Downtown Webster", cost: 400000, totalCost: 400000, description: "This project will enhance the experience of navigating through the downtown, including a new gateway sign at Barrett Drive, signs to identify nearby parking, and kiosks in parking lots to indicate nearby destinations. Banners will be installed on Main Street, North Avenue, and South Avenue to create a cohesive identity for the downtown.", imagePath: "/images/project6.jpg" },
  { id: 7, name: "Create a Hojack Trail Gateway and Formalize the Trail", location: "Hojack Trail at North Ave.", cost: 1350000, totalCost: 1350000, description: "This project will create a gateway to the Hojack Trail by enhancing the crossing on North Avenue and adding a gateway feature, unique signage, benches, and bike racks. The trail will be resurfaced with stone dust from Phillips Road to the Village's western boundary, along with benches, lighting, and landscaping along the trail.", imagePath: "/images/project7.jpg" },
  { id: 8, name: "Create a Hojack Trail Gateway", location: "Hojack Trail at North Ave.", cost: 300000, totalCost: 300000, description: "This project will create a gateway to the Hojack Trail by enhancing the crossing on North Avenue and adding a gateway feature, unique signage, benches, and bike racks.", imagePath: "/images/project8.jpg" },
  { id: 9, name: "Renovate Foley Insurance to Expand Useable Space", location: "9 E. Main St.", cost: 100000, totalCost: 176950, description: "This project will expand office capacity by renovating the second floor and connecting it to the first floor with an interior staircase. The renovations would allow Foley Insurance to expand their office capacity.", imagePath: "/images/project9.jpg" },
  { id: 10, name: "Enhance the Main Street Streetscape", location: "Main Street, from Corning Park to Kircher Park", cost: 1400000, totalCost: 1400000, description: "This project will create a sense of arrival into the downtown through signature crosswalks and lighting, along with replacement of select lights, sidewalks, and crosswalks on Main Street from Corning Park to Kircher Park. Permanent string lights will be installed from Lapham Park to the Village Office.", imagePath: "/images/project10.jpg" },
  { id: 11, name: "Create a North Avenue Gateway", location: "Route 104 Bridge", cost: 300000, totalCost: 300000, description: "This project will install artistic lighting under the Route 104 bridge to create a visual connection between Main Street and the North End Business District.", imagePath: "/images/project11.jpg" },
  { id: 12, name: "Market the Business Improvement District", location: "Online", cost: 50000, totalCost: 85000, description: "This project will develop digital marketing content, a mobile app, and print collateral to promote downtown Webster and enhance awareness of businesses.", imagePath: "/images/project12.jpg" },
  { id: 13, name: "Renovate Community Space at Immanuel Lutheran Church", location: "131 W. Main St.", cost: 150000, totalCost: 317500, description: "This project will expand community space offerings through renovations to community rooms and a commercial kitchen, along with upgrades to façade, stained glass windows, and the heating and cooling system.", imagePath: "/images/project13.jpg" },
  { id: 14, name: "Renovate Former Dentist Office and Furnari Jewelry", location: "39 W. Main St.", cost: 50000, totalCost: 143500, description: "This project will renovate two commercial spaces to make them accessible and enhance their visibility on Main Street. The facade will be upgraded and the spaces will be reconfigured, along with minor renovations to basement office space.", imagePath: "/images/project14.jpg" },
  { id: 15, name: "Renovate 7 South Ave. for Retail", location: "7 South Ave.", cost: 50000, totalCost: 142600, description: "This project will renovate a vacant commercial space for use as a retail clothing store. Renovations include adding dressing rooms, a restroom, and refinishing the floors.", imagePath: "/images/project15.jpg" },
  { id: 16, name: "Convert Commercial Space to Apartments", location: "22 & 28 E. Main St.", cost: 50000, totalCost: 92500, description: "This project will convert a second floor retail space and office space to 2 new apartments on Main Street.", imagePath: "/images/project16.jpg" },
  { id: 17, name: "Renovate Mixed Use Property", location: "150 Orchard St. + 108 Commercial St.", cost: 500000, totalCost: 1500000, description: "This project will expand on prior investments at 150 Orchard Street by converting the third floor to eight 1-bedroom loft apartments. The project will also enhance the exterior of 108 Commercial Street and create connections to the Hojack Trail to attract new businesses, such as a café.", imagePath: "/images/project17.jpg" },
  { id: 18, name: "Renovate the Exterior of Salvatore's Pizzeria", location: "195 North Ave.", cost: 100000, totalCost: 140000, description: "This project will enhance the restaurant through exterior upgrades including a covered patio space, new windows and siding, and repairs to the existing sign.", imagePath: "/images/project18.jpg" },
  { id: 19, name: "Create Celebration Plaza and Village Market Square", location: "28 W. Main St.", cost: 1200000, totalCost: 1200000, description: "This project will transform the Village Office entry drive into a public plaza and gateway to a flexible open space for markets and events. The project will also add a publicly available restroom.", imagePath: "/images/project19.jpg" },
  { id: 20, name: "Establish Harmony Square on Main", location: "58 E. Main St.", cost: 300000, totalCost: 300000, description: "This project will create a flexible open space adjacent to Harmony House that incorporates public art and could be used for small-scale events and gatherings.", imagePath: "/images/project20.jpg" },
  { id: 21, name: "Expand Lattimore Physical Therapy", location: "70 Barrett Dr.", cost: 300000, totalCost: 800000, description: "This project will create a single-story addition to create an open concept orthopedic treatment space with 1-2 treatment rooms. The addition will create optimized space for orthopedic care.", imagePath: "/images/project21.jpg" },
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
  const [modalImage, setModalImage] = useState(null);

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

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const handleNextPage = () => {
    if (userEmail.includes('@')) {
      setShowInstructions(false);
      setEmailError('');
      scrollToTop();
    } else {
      setEmailError('Please enter a valid email address.');
    }
  };

  const handlePreviousPage = () => {
    setShowInstructions(true);
    scrollToTop();
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

  const openModal = (imagePath) => {
    setModalImage(imagePath);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <div className="App">
      {!showInstructions && (
        <header className="sticky-header">
          <h1>Webster NY Forward Project Funding Survey</h1>
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
            <h1>Webster NY Forward Project Funding Survey</h1>
            <h3>Instructions</h3>
            <p>The Village of Webster was awarded $4,500,000 from New York State through the NY Forward program to revitalize downtown. Several projects have been proposed for potential funding. <strong>This survey gives you the opportunity to provide feedback on which projects you think would most benefit downtown Webster.</strong> In this survey, you will get a budget of $4,500,000 to "spend" on the proposed projects. You can choose which projects you would fund by clicking the checkbox next to each project. A progress bar at the top of the screen will automatically sum how much money you have spent, and will indicate how much money you have remaining in your budget. You will not be able to submit the survey if you spend more than $4,500,000. You can also leave comments about the proposed projects in the box provided.</p>

            <div className="callout-box">
              <strong className="important-text">Important:</strong> Please complete this survey in one sitting. It should take approximately 10 minutes to complete. Your progress will NOT be saved if you close or refresh this window before submitting the survey.
            </div>

            <h3>How We Will Use This Data</h3>
            <p>Your responses will be anonymously shared with the Local Planning Committee, which is the committee that will decide which proposed projects get recommended to New York State for potential funding. The next meeting of the Local Planning Committee is Wednesday, October 9th at 6:00 PM at the Village of Webster Community Meeting Hall (29 South Avenue). This meeting is open to the public and there will be time reserved at the end of the meeting for a public comment period.</p>

            <h3>Due Date</h3>
            <p>This survey will close on Friday, October 4th at 11:59 PM.</p>

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

            <p className="anonymous-note">Your responses will be anonymous. Your email will not be saved. We only ask for this information to prevent duplicate responses. Thank you for your participation.</p>

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
        <div className="project-image" onClick={() => openModal(project.imagePath)}>
          <img src={project.imagePath} alt={project.name} />
        </div>
        <div className="project-content">
          <p className="project-number">Project {index + 1} of {projects.length}</p>
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
<footer className="footer">
<p>Webster NY Forward</p>
</footer>

{modalImage && (
<div className="modal" onClick={closeModal}>
  <span className="close" onClick={closeModal}>&times;</span>
  <img className="modal-content" src={modalImage} alt="Full size project image" />
</div>
)}
</div>
);
}

export default App;