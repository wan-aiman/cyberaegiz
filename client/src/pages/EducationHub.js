import React, { useEffect, useState } from 'react';
import './EducationHub.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EducationHub = () => {
  const [categories, setCategories] = useState([]);
  const [modules, setModules] = useState([]);
  const [filteredModules, setFilteredModules] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All Articles');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryResponse = await axios.get('http://localhost:5001/api/education-hub/categories');
        const moduleResponse = await axios.get('http://localhost:5001/api/education-hub/modules');
        setCategories(categoryResponse.data);
        setModules(moduleResponse.data);
        setFilteredModules(moduleResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleCategoryClick = (categoryId, categoryName) => {
    setActiveCategory(categoryName);
    setFilteredModules(
      categoryName === 'All Articles' ? modules : modules.filter((module) => module.category === categoryId)
    );
  };

  return (
    <div className="education-hub">
      <div className="hero-content">
      <h1>
    Education <span className="highlight">Hub</span>
      </h1>
        <p>
          Empower your cyber safety with expert knowledge. Explore CyberAegiz's Education Hub today!
          Take a quick assessment to get personalized suggestions on what you should improve.
        </p>
      </div>

      <div className="quick-assessment-buttons"><button
          className="quick-assessment-btn"
          onClick={() => navigate('/education-hub/quick-assessment')}
        >
          Quick Assessment
        </button></div>

      <div className="category-buttons">
        <button
          className={`category-btn ${activeCategory === 'All Articles' ? 'active' : ''}`}
          onClick={() => handleCategoryClick(null, 'All Articles')}
        >
          All Modules
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

      <div className="modules-container">
        {filteredModules.length > 0 ? (
          filteredModules.map((module) => (
            <div className="module-card" key={module._id}>
              <img src={module.image || 'PasswordHacker.png'} alt={module.title} />
              <h3>{module.title}</h3>
              <p>{module.description}</p>
              <button className="learn-more-btn" onClick={() => navigate(`/module/${module._id}`)}>
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
