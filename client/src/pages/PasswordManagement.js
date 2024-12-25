import React, { useState } from 'react';
import axios from 'axios';
import StrengthChecker from './StrengthChecker';
import './PasswordManagement.css';

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
    <main className="">
      
        <div className="hero-content">
          <h1>Welcome to <span>CyberAegiz</span></h1>
          <p>Your security is our priority. Generate and check the strength of your passwords here.</p>
        </div>

      <section className="password-management">
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

      <section>
        {/* Information Section */}
      <div className="info-section">
          {/* Password Generator Explanation */}
          <div className="info-block">
              <h2>How Does <span className="highlight">CyberAegiz</span>'s Password Generator Work?</h2>
              <p>CyberAegiz's password generator tool helps users create strong, secure passwords by automating the inclusion of various character types. Here's the functionality breakdown:</p>
              <ul>
                  <li><strong>Customization:</strong> Users can select the desired password length and choose to include or exclude uppercase letters, lowercase letters, numbers, and special symbols.</li>
                  <li><strong>Generation:</strong> The tool then generates a password based on the specified criteria, ensuring it meets the best practices for password security.</li>
                  <li><strong>Display:</strong> The generated password is displayed to the user, who can then use it for their security needs or test its strength using the integrated strength checker.</li>
              </ul>
          </div>

          {/* Password Strength Checker Explanation */}
          <div className="info-block light-bg">
              <h2>How Does <span className="highlight">CyberAegiz</span>'s Password Strength Checker Work?</h2>
              <p>Concurrently, the password strength checker provides an assessment of user-provided passwords by analyzing their complexity and resilience against common attack methods. Here's how it operates:</p>
              <ul>
                  <li><strong>Input:</strong> Users can input any password they are currently using or planning to use.</li>
                  <li><strong>Analysis:</strong> The tool evaluates the password based on factors like length, use of mixed characters, and common vulnerability patterns.</li>
                  <li><strong>Feedback:</strong> Users receive immediate feedback on the strength of their password, categorized as Weak, Medium, Strong, or Very Strong, along with suggestions for improvement if necessary.</li>
              </ul>
          </div>

          {/* Creating Strong Passwords */}
          <div className="info-block">
              <h2>How To Create and Evaluate Strong <span className="highlight">Passwords</span>?</h2>
              <p>To assist users in better understanding and applying secure password practices, CyberAegiz offers the following guidelines:</p>
              <ul>
                  <li><strong>Complexity and Variety:</strong> Ensure your passwords contain a mix of uppercase letters, lowercase letters, numbers, and symbols to enhance complexity.</li>
                  <li><strong>Length Matters:</strong> Opt for longer passwords, ideally over 12 characters, as they offer greater resistance to brute-force attacks.</li>
                  <li><strong>Avoid Common Pitfalls:</strong> Steer clear of common words, predictable patterns, or personal information that can be easily guessed or found through social engineering.</li>
                  <li><strong>Regular Updates:</strong> Regularly update your passwords to diminish the risk of exposure from data breaches.</li>
                  <li><strong>Use of Passphrases:</strong> Consider using passphrases, which are longer and can be easier to remember. These are made up of multiple words strung together, potentially with creative spelling or character substitutions.</li>
                  <li><strong>Multi-Factor Authentication:</strong> Where possible, enable multi-factor authentication (MFA) to add an extra layer of security, even if your password is compromised.</li>
              </ul>
          </div>

          {/* Security Tips for Managing Passwords */}
          <div className="info-block light-bg">
              <h2>Security Tips for <span className="highlight">Managing</span> Passwords</h2>
              <p>Refer to the tips below on how to manage your passwords proactively:</p>
              <ul>
                  <li><strong>Password Managers:</strong> Utilize a reputable password manager to store and manage your different passwords securely, so you don't have to remember each one.</li>
                  <li><strong>Educate and Inform:</strong> Stay informed about the latest password security best practices and educate others around you. CyberAegiz's educational hub provides resources and articles on maintaining secure online practices.</li>
                  <li><strong>Regular Strength Checks:</strong> Periodically check the strength of your passwords to ensure they haven't become weak over time due to evolving cracking techniques.</li>
              </ul>
          </div>
      </div>
      </section>
    </main>
  );
}

export default PasswordManagement;
