// src/pages/EncryptionDecryptionPage.js
import React, { useState } from 'react';
import axios from 'axios';
import './EncryptionDecryption.css';

const EncryptionDecryptionPage = () => {
    const [file, setFile] = useState(null);
    const [password, setPassword] = useState('');
    const [mode, setMode] = useState('encrypt'); // "encrypt" or "decrypt"
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleEncryptDecrypt = async () => {
        if (!file || !password) {
            alert("File and password are required");
            return;
        }
        
        setLoading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('password', password);

        const endpoint = mode === 'encrypt' ? '/encrypt' : '/decrypt';
        try {
            const response = await axios.post(`http://localhost:5001${endpoint}`, formData, {
                responseType: 'blob',
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', mode === 'encrypt' ? 'encrypted_file.enc' : 'decrypted_file.txt');
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error("Error:", error);
            alert("Error during file encryption/decryption");
        } finally {
            setLoading(false);
        }
    };

    return (

    <div> 
        <div className="hero-content">
          <h1>Welcome to <span>CyberAegiz</span></h1>
          <p>Your security is our priority. Generate and check the strength of your passwords here.</p>
        </div>

        <div className="encryption-page">
            <h1>Encryption & Decryption</h1>
            <div className="mode-toggle">
                <button className={mode === 'encrypt' ? 'active' : ''} onClick={() => setMode('encrypt')}>Encryption</button>
                <button className={mode === 'decrypt' ? 'active' : ''} onClick={() => setMode('decrypt')}>Decryption</button>
            </div>

            <div className="file-input">
                <label htmlFor="fileUpload">Choose file:</label>
                <input type="file" id="fileUpload" onChange={handleFileChange} />
            </div>

            <div className="password-input">
                <label htmlFor="password">Enter Password:</label>
                <input type="password" id="password" value={password} onChange={handlePasswordChange} />
            </div>

            <button onClick={handleEncryptDecrypt} disabled={loading}>
                {loading ? "Processing..." : mode === 'encrypt' ? "Encrypt File" : "Decrypt File"}
            </button>
        </div>
                    {/* Information Section */}
                    <div className="info-section">
                <div className="info-block">
                    <h2>How Does <span className="highlight">CyberAegiz</span>’s Phishing Detection Work?</h2>
                    <p>CyberAegiz’s phishing link checker leverages a sophisticated machine-learning algorithm to detect phishing and malicious websites. Here’s a breakdown of the process:</p>
                        <ul>
                            <li><strong>URL Extraction:</strong> The tool extracts all URLs from the text inputted by the user.</li>
                            <li><strong>URL Scanning:</strong> These URLs are then scanned to detect any issues, utilizing a comprehensive dataset of real-time updated phishing URLs.</li>
                            <li><strong>Result Indication:</strong> The tool categorizes each URL as either "Good" or "Suspicious," providing users with clear feedback on the safety of the links they've checked.</li>
                        </ul>
                </div>
                <div className="info-block light-bg">
                    <h2>How To <span className="highlight">Identify</span> Phishing URL?</h2>
                    <p>Users of CyberAegiz can enhance their ability to identify phishing attempts by following these guidelines:</p>
                        <ul>
                            <li><strong>Legitimacy of the Message:</strong> Scrutinize the authenticity of any link received, especially those that direct to external websites.</li>
                            <li><strong>Urgency and Action:</strong> Be wary of links that urge immediate action, as this could be a tactic to exploit user emotions.</li>
                            <li><strong>Sender and Intent:</strong> Analyze who sent the message and their intent. If it appears unusual, verify through direct communication.</li>
                            <li><strong>Spelling and Grammar:</strong> Look for spelling or grammatical errors. Many phishing attempts contain errors to evade spam filters.</li>
                            <li><strong>Personal Information Requests:</strong> Be cautious of unsolicited requests for sensitive information.</li>
                            <li><strong>URL Analysis:</strong> Examine the URL closely. Hover over links to check their destination before clicking, and be alert for deceptive homographs in domain names.</li>
                            <li><strong>HTTPS and Security Certificates:</strong> Prefer websites with HTTPS, indicating the presence of a security certificate which encrypts data between your browser and the site.</li>
                        </ul>
                </div>
                <div className="info-block">
                    <h2>How To <span className="highlight">Protect</span> Against URL Phishing?</h2>
                    <p>Users of CyberAegiz can enhance their knowledge to protect themselves from phishing attempts by following these guidelines:</p>
                        <ul>
                            <li><strong>Security Awareness:</strong> Regular training and awareness are crucial. Educate employees or users on how to scrutinize phishing URLs, recognize scams, and understand various cyber attack methods.</li>
                            <li><strong>URL Filtering:</strong> Exercise caution with emails asking to click links. Always verify the URL’s authenticity.</li>
                            <li><strong>Phishing Detection Technology:</strong> Use CyberAegiz’s phishing link checker to assess the safety of URLs, enhancing your defenses against cyber threats.</li>
                        </ul>
                </div>
            </div>
    </div>   
    );
};

export default EncryptionDecryptionPage;
