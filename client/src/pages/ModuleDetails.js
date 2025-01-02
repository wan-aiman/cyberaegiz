import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ModuleDetails.css';
import { useNavigate } from 'react-router-dom';

const ModuleDetails = () => {
  const { moduleId } = useParams();
  const [module, setModule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchModuleDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/education-hub/modules/${moduleId}`);
        setModule(response.data);
  
        const allModulesResponse = await axios.get('http://localhost:5001/api/education-hub/modules');
        setSuggestions(allModulesResponse.data.filter(mod => mod._id !== moduleId)); // Exclude current module
        setLoading(false);
      } catch (err) {
        console.error('Error fetching module details:', err);
        setError('Module not found');
        setLoading(false);
      }
    };
  
    fetchModuleDetails();
  }, [moduleId]);

  const nextCard = () => {
    if (module && currentCardIndex < module.content.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  const prevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  if (loading) return <p>Loading module details...</p>;
  if (error) return <p>{error}</p>;

  const currentCard = module.content[currentCardIndex];

  return (
    <div className="module-details">
      <h1>{module.title}</h1>
      <div className="module-info">
        <p><strong>Description:</strong> {module.description}</p>
        <p><strong>Time:</strong> {module.estimatedTime} mins</p>
      </div>
      <div className="flashcard-container">
        <div className="flashcard">
          <div className="flashcard-inner">
            <div className="flashcard-front centered-title">
              <h2>{currentCard.title}</h2>
            </div>
            <div className="flashcard-back">
              <p>{currentCard.details}</p>
              {currentCard.keyPoints && currentCard.keyPoints.length > 0 && (
                <ul className="key-points">
                  {currentCard.keyPoints.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              )}
               {currentCard.videoUrl && (
    <div className="video-container">
      <iframe
        width="100%"
        height="315"
        src={currentCard.videoUrl}
        title="Video Tutorial"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  )}
            </div>
          </div>
        </div>
        <div className="navigation">
          <button onClick={prevCard} disabled={currentCardIndex === 0}>
            ◀
          </button>
          <span>
            {currentCardIndex + 1} / {module.content.length}
          </span>
          <button onClick={nextCard} disabled={currentCardIndex === module.content.length - 1}>
            ▶
          </button>
        </div>
      </div>
      <div className="suggestions-container">
  <h2>What to Learn Next</h2>
  <div className="slider">
    {suggestions.map((suggestion) => (
      <div
        className="suggestion-card"
        key={suggestion._id}
        onClick={() => {
          setCurrentCardIndex(0); // Reset to the first card
          navigate(`/module/${suggestion._id}`);
          window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to the top
        }}
        style={{ cursor: 'pointer' }}
      >
        <img src={suggestion.image} alt={suggestion.title} />
        <h3>{suggestion.title}</h3>
      </div>
    ))}
  </div>
</div>

    </div>
  );
};

export default ModuleDetails;
