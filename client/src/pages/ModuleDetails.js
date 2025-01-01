import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ModuleDetails.css';

const ModuleDetails = () => {
  const { moduleId } = useParams();
  const [module, setModule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  useEffect(() => {
    const fetchModule = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/education-hub/modules/${moduleId}`);
        setModule(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching module details:', err);
        setError('Module not found');
        setLoading(false);
      }
    };

    fetchModule();
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
    </div>
  );
};

export default ModuleDetails;
