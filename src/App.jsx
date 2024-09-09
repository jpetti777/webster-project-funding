import React, { useState, useEffect } from 'react';
import './App.css';

const projects = [
  { id: 1, name: "Relocate Ambulance Services Downtown", cost: 1500000, description: "Relocate ambulance services to 79 Main Street, renovate for 2 ambulance bays, offices, and facade upgrade." },
  { id: 2, name: "Revitalize the Former Village Hall", cost: 1000000, description: "Renovate former Village Hall for community space and additional Town offices." },
  { id: 3, name: "Enhance Gravino Park", cost: 1500000, description: "Create dog park, walking trail, update pavilion, and install electrical connections for events." },
  { id: 4, name: "Enhance the Main St. Streetscape", cost: 750000, description: "Replace sidewalks and install decorative lamp posts on Main Street." },
  { id: 5, name: "Create Gateways into Downtown", cost: 250000, description: "Construct welcome signs and install directional signs for downtown parking." },
  { id: 6, name: "Establish a Small Project Grant Fund", cost: 600000, description: "Create matching grant fund for small projects in downtown Macedon." },
  { id: 7, name: "Rehabilitate the West St. Apartments", cost: 900000, description: "Construct 16 new townhouses with energy-efficient features." },
  { id: 8, name: "Re-open 90 Main St. for Auto Service", cost: 150000, description: "Upgrade facade, replace windows/doors, install signage/lighting, and repair parking lot." },
  { id: 9, name: "Develop Caraglio's Pizza Restaurant", cost: 500000, description: "Construct new 2,500 sq ft Caraglio's Pizza restaurant with outdoor seating." },
  { id: 10, name: "Redevelop 103 Main for Mixed-Use", cost: 650000, description: "Renovate for 3 apartments and retail space, enhance facade and entry." },
  { id: 11, name: "Expand 104 Main Commercial Building", cost: 150000, description: "Add second floor, reconfigure for multiple commercial units, renovate interior/exterior." },
  { id: 12, name: "Expand Twisted Rail Brewing", cost: 200000, description: "Reconfigure interior, add rooftop deck, repair patio, upgrade facade and signage." },
  { id: 13, name: "Expand the 113 Main St. Apartments", cost: 300000, description: "Construct addition for 3-4 new rental units, upgrade landscaping and parking." },
];

function App() {
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [remainingBudget, setRemainingBudget] = useState(4500000);
  const [comments, setComments] = useState({});

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

  return (
    <div className="App">
      <header className="sticky-header">
        <div className="budget-info">
          <span>Total Budget: ${(4500000).toLocaleString()}</span>
          <span>Remaining: ${remainingBudget.toLocaleString()}</span>
        </div>
        <div className="progress-bar">
          <div style={getProgressBarStyle()}></div>
        </div>
      </header>
      <main>
        <h1>Macedon Project Funding Selection</h1>
        <div className="projects-list">
          {projects.map(project => (
            <div key={project.id} className={`project-card ${selectedProjects.includes(project.id) ? 'selected' : ''}`}>
              <div className="project-image">
                <img src={`https://picsum.photos/seed/${project.id}/300/200`} alt={project.name} />
              </div>
              <div className="project-content">
                <h3>{project.name}</h3>
                <p className="project-description">{project.description}</p>
                <p className="project-cost">Cost: ${project.cost.toLocaleString()}</p>
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
        </div>
      </main>
    </div>
  );
}

export default App;