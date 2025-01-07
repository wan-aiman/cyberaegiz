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
          <h1>Encryption <span>Decryption</span></h1>
          <p>Lock and unlock your digital valuables with CyberAegiz's robust encryption and decryption services.</p>
          <img src="EncryptD.png" alt="Encrypt" width={200}/>
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
                        <h2>How Does <span className="highlight">CyberAegiz</span>'s Encryption & Decryption Tool Work?</h2>
                        <p>CyberAegiz's encryption tool allows users to secure their sensitive data by encrypting files and folders with advanced algorithms. Here’s a breakdown of the process:</p>
                        <ul>
                            <li><strong>Encryption:</strong> Users select files or folders for encryption from their device. The tool then encrypts the selected data using robust encryption standards, ensuring that the contents are inaccessible without the correct decryption key.</li>
                            <li><strong>Decryption:</strong> To access the encrypted data, users must provide the correct decryption key. Once verified, the tool reverses the encryption process, allowing users to access their original files safely.</li>
                        </ul>
                    </div>
                    
                    <div className="info-block light-bg">
                        <h2>How To Use <span className="highlight">Encryption/Decryption</span> Effectively?</h2>
                        <p>To maximize the benefits of CyberAegiz's encryption tool, users are advised to:</p>
                        <ul>
                            <li><strong>Secure Key Management:</strong> Always keep encryption keys secure and separate from the data they encrypt. Consider using a key management service if managing keys across multiple devices or platforms.</li>
                            <li><strong>Strong Encryption Standards:</strong> Opt for strong, well-known encryption algorithms to ensure data security. CyberAegiz supports multiple standards, allowing users to choose the best fit for their needs.</li>
                            <li><strong>Regular Updates:</strong> Regularly update encryption software to protect against vulnerabilities and ensure compatibility with the latest security practices.</li>
                        </ul>
                    </div>
                    
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
                    
                    <div className="info-block light-bg">
                        <h2>Security <span className="highlight">Practices</span> for Handling Sensitive Data</h2>
                        <p>Refer to the tips below on how to manage your passwords proactively:</p>
                        <ul>
                            <li><strong>Data Backup:</strong> Always keep backups of important data before encrypting, to prevent loss in case of encryption errors or key misplacement.</li>
                            <li><strong>Educational Resources:</strong> Leverage CyberAegiz's educational content to understand more about the importance of encryption and best practices for secure data handling.</li>
                            <li><strong>Access Control:</strong> Limit access to encrypted files to those who absolutely need it, minimizing the risk of unauthorized disclosure.</li>
                        </ul>
                    </div>
                </div>
    </div>   
    );
};

export default EncryptionDecryptionPage;
