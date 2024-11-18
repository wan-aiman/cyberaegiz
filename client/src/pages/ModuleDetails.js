import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ModuleDetails.css'; // Add appropriate styling here

const ModuleDetails = () => {
  const { moduleId } = useParams(); // Get moduleId from the URL
  const [module, setModule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchModule = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/education-hub/modules/${moduleId}`);
        setModule(response.data); // Set the fetched module
        setLoading(false);
      } catch (err) {
        console.error('Error fetching module details:', err);
        setError('Module not found');
        setLoading(false);
      }
    };

    fetchModule();
  }, [moduleId]);

  if (loading) return <p>Loading module details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="module-details">
      <h1>{module.title}</h1>
      <p><strong>Description:</strong> {module.description}</p>
      <p><strong>Estimated Time:</strong> {module.estimatedTime} minutes</p>
      <div className="module-content">
        <h3>Content:</h3>
        <p>{module.content}</p>
      </div>
    </div>
  );
};

export default ModuleDetails;
