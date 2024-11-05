import React, { useState } from 'react';
import axios from 'axios';
import StrengthChecker from './StrengthChecker';
import './password.css';

function PasswordManagement() {
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [passwordToCheck, setPasswordToCheck] = useState('');
  const [passwordLength, setPasswordLength] = useState(12);
  const [strength, setStrength] = useState('');
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [avoidAmbiguous, setAvoidAmbiguous] = useState(false);
  const [avoidDuplicates, setAvoidDuplicates] = useState(false);
  const [timeToCrack, setTimeToCrack] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Generate Password
  const generatePassword = async () => {
    try {
      const response = await axios.post('http://localhost:5001/api/password/generate', {
        length: passwordLength,
        includeSymbols,
        includeNumbers,
        includeLowercase,
        includeUppercase,
        avoidAmbiguous,
        avoidDuplicates,
      });
      setGeneratedPassword(response.data.password);
      checkStrength(response.data.password);
    } catch (error) {
      console.error("Error generating password:", error);
    }
  };

  // Check Password Strength
  const checkStrength = async (passwordToCheck) => {
    try {
      const response = await axios.post('http://localhost:5001/api/password/check-strength', { password: passwordToCheck });
      setStrength(response.data.strength);
      calculateCrackTime(passwordToCheck);
    } catch (error) {
      console.error("Error checking password strength:", error);
    }
  };

  // Calculate Time to Crack
  const calculateCrackTime = (password) => {
    const baseTime = 0.5;
    const lengthFactor = Math.pow(password.length, 2.5);

    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSymbols = /[^A-Za-z0-9]/.test(password);

    let complexityFactor = 1;
    if (hasLower) complexityFactor *= 26;
    if (hasUpper) complexityFactor *= 26;
    if (hasNumbers) complexityFactor *= 10;
    if (hasSymbols) complexityFactor *= 32;

    let timeToCrackInSeconds = baseTime * lengthFactor * complexityFactor;

    // Format time for display
    if (timeToCrackInSeconds < 60) {
      setTimeToCrack("less than a minute");
    } else if (timeToCrackInSeconds < 3600) {
      setTimeToCrack(`${Math.round(timeToCrackInSeconds / 60)} minutes`);
    } else if (timeToCrackInSeconds < 86400) {
      setTimeToCrack(`${Math.round(timeToCrackInSeconds / 3600)} hours`);
    } else if (timeToCrackInSeconds < 2592000) {
      setTimeToCrack(`${Math.round(timeToCrackInSeconds / 86400)} days`);
    } else if (timeToCrackInSeconds < 31536000) {
      setTimeToCrack(`${Math.round(timeToCrackInSeconds / 2592000)} months`);
    } else {
      setTimeToCrack(`${Math.round(timeToCrackInSeconds / 31536000)} years`);
    }
  };

  // Toggle Password Visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <main className="password-management">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to <span>CyberAegiz</span></h1>
          <p>Your security is our priority. Generate and check the strength of your passwords here.</p>
        </div>
      </section>

      <section className="password-management-content">
        <h2>Password <span>Management</span></h2>

        {/* Password Generator */}
        <div className="password-generator">
          <h3>Generate New Password</h3>
          <label>Password Length</label>
          <input
            type="number"
            value={passwordLength}
            min="8"
            max="64"
            onChange={(e) => setPasswordLength(Number(e.target.value))}
          />
          <input
            type="range"
            min="8"
            max="64"
            value={passwordLength}
            onChange={(e) => setPasswordLength(Number(e.target.value))}
          />
          <input type={showPassword ? "text" : "password"} value={generatedPassword} readOnly />
          <button onClick={togglePasswordVisibility}>{showPassword ? "Hide" : "Show"}</button>
          <button onClick={() => navigator.clipboard.writeText(generatedPassword)}>Copy</button>
          <button onClick={generatePassword} style={{ marginLeft: '10px' }}>Generate Password</button>
          <div className="options">
            <label><input type="checkbox" checked={includeUppercase} onChange={() => setIncludeUppercase(!includeUppercase)} /> A-Z</label>
            <label><input type="checkbox" checked={includeLowercase} onChange={() => setIncludeLowercase(!includeLowercase)} /> a-z</label>
            <label><input type="checkbox" checked={includeNumbers} onChange={() => setIncludeNumbers(!includeNumbers)} /> 0-9</label>
            <label><input type="checkbox" checked={includeSymbols} onChange={() => setIncludeSymbols(!includeSymbols)} /> Symbols</label>
            <label><input type="checkbox" checked={avoidAmbiguous} onChange={() => setAvoidAmbiguous(!avoidAmbiguous)} /> Avoid Ambiguous Characters</label>
            <label><input type="checkbox" checked={avoidDuplicates} onChange={() => setAvoidDuplicates(!avoidDuplicates)} /> Avoid Consecutive Duplicates</label>
          </div>
          <p className="crack-time">💡 Estimated time to crack: {timeToCrack}</p>
        </div>

        {/* Password Checker */}
        <div className="password-checker">
          <h3>Check the Strength of Your Password</h3>
          <input
            type="password"
            value={passwordToCheck}
            onChange={(e) => {
              setPasswordToCheck(e.target.value);
              checkStrength(e.target.value);
            }}
          />
          <StrengthChecker strength={strength} />
        </div>
      </section>
    </main>
  );
}

export default PasswordManagement;
