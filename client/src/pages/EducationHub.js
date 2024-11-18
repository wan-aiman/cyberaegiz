import React, { useEffect, useState } from 'react';
import './EducationHub.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EducationHub = () => {
  const [categories, setCategories] = useState([]);
  const [modules, setModules] = useState([]);
  const [filteredModules, setFilteredModules] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All Articles'); // Default category
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryResponse = await axios.get('http://localhost:5001/api/education-hub/categories');
        const moduleResponse = await axios.get('http://localhost:5001/api/education-hub/modules');
        setCategories(categoryResponse.data);
        setModules(moduleResponse.data);
        setFilteredModules(moduleResponse.data); // Show all modules initially
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Handle category button clicks
  const handleCategoryClick = (categoryId, categoryName) => {
    setActiveCategory(categoryName);
    if (categoryName === 'All Articles') {
      setFilteredModules(modules); // Show all modules
    } else {
      // Filter modules based on the selected category
      const filtered = modules.filter((module) => module.category === categoryId);
      setFilteredModules(filtered);
    }
  };

  return (
    <div className="education-hub">
      {/* Header Section */}
      <header className="education-header">
        <h1>
          Education <span className="highlight">Hub</span>
        </h1>
        <p>
          Empower your cyber safety with expert knowledge – Explore the CyberAegiz's Education Hub today! Take a quick
          assessment to get personalized suggestions on what you should improve.
        </p>
        <button className="quick-assessment-btn"
        onClick={() => window.location.href = '/education-hub/quick-assessment'}
        >Quick Assessment</button>
      </header>

      {/* Categories Section */}
      <div className="category-buttons">
        <button
          className={`category-btn ${activeCategory === 'All Articles' ? 'active' : ''}`}
          onClick={() => handleCategoryClick(null, 'All Articles')}
        >
          All Articles
        </button>
        {categories.map((category) => (
          <button
            key={category._id}
            className={`category-btn ${activeCategory === category.name ? 'active' : ''}`}
            onClick={() => handleCategoryClick(category._id, category.name)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Modules Section */}
      <div className="modules-container">
        {filteredModules.length > 0 ? (
          filteredModules.map((module) => (
            <div className="module-card" key={module._id}>
              <img
                src="https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=600" // Replace with actual image URL if available
                alt={module.title}
              />
              <h3>{module.title}</h3>
              <p>{module.description}</p>
              <button
                className="learn-more-btn"
                onClick={() => navigate(`/module/${module._id}`)} // Navigate to dynamic route
              >
                Learn More
              </button>
            </div>
          ))
        ) : (
          <p>No modules available for this category.</p>
        )}
      </div>
    </div>
  );
};

export default EducationHub;
