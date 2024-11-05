// src/components/StrengthChecker.js
import React from 'react';

function StrengthChecker({ strength }) {
  let color;
  switch (strength) {
    case 'Very Weak':
      color = 'red';
      break;
    case 'Weak':
      color = 'orange';
      break;
    case 'Medium':
      color = 'yellow';
      break;
    case 'Strong':
      color = 'lightgreen';
      break;
    case 'Very Strong':
      color = 'green';
      break;
    default:
      color = 'grey';
  }

  return (
    <div className="strength-checker">
      <p>Strength: <span style={{ color }}>{strength}</span></p>
      <div className="strength-bar-container">
        <div
          className="strength-bar"
          style={{ width: `${(strength === 'Very Strong' ? 100 : (strength === 'Strong' ? 75 : (strength === 'Medium' ? 50 : 25)))}%`, backgroundColor: color }}
        ></div>
      </div>
    </div>
  );
}

export default StrengthChecker;
