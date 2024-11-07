// src/pages/PhishingDetectionPage.js
import React, { useState } from 'react';
import axios from 'axios';
import './PhishingDetection.css';

const PhishingDetectionPage = () => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState('');
    const [file, setFile] = useState(null);
    const [summary, setSummary] = useState(null);
    const [error, setError] = useState(null);
    const [fileNames, setFileNames] = useState('');

    const apiKey = process.env.REACT_APP_VIRUSTOTAL_API_KEY;

    const encodeBase64 = (input) => {
        try {
            return window.btoa(input);
        } catch (e) {
            console.error("Failed to encode base64:", e);
            return null;
        }
    };

    const resetResults = () => {
        setResult('');
        setSummary(null);
        setError(null);
    };

    const detectType = (input) => {
        const ipPattern = /^(?:\d{1,3}\.){3}\d{1,3}$/;
        if (ipPattern.test(input)) return 'ip';

        const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,4}(\/[\w-]*)*\/?(\?.*)?$/;
        const isUrl = urlPattern.test(input);

        const domainPattern = /^([\w-]+\.)+[\w-]{2,4}$/;
        const isDomain = domainPattern.test(input);

        if (isUrl && input.includes('/')) {
            return 'url';
        } else if (isDomain) {
            return 'domain';
        } else {
            return 'unknown';
        }
    };

    const checkResource = async (input) => {
        resetResults();
        setLoading(true);

        const type = detectType(input);

        if (type === 'unknown') {
            setError("Invalid input. Please enter a valid URL, IP address, or domain.");
            setLoading(false);
            return;
        }

        try {
            let endpoint;
            switch (type) {
                case 'url':
                    const encodedUrl = encodeBase64(input).replace(/=+$/, '');
                    endpoint = `https://www.virustotal.com/api/v3/urls/${encodedUrl}`;
                    break;
                case 'ip':
                    endpoint = `https://www.virustotal.com/api/v3/ip_addresses/${input}`;
                    break;
                case 'domain':
                    endpoint = `https://www.virustotal.com/api/v3/domains/${input}`;
                    break;
                default:
                    throw new Error('Unsupported resource type');
            }

            const response = await fetch(endpoint, {
                method: 'GET',
                headers: {
                    'x-apikey': apiKey,
                }
            });

            if (response.ok) {
                const data = await response.json();
                displayDetailedResult(data, type);
            } else {
                setResult(`Error checking ${type}: ${response.statusText}`);
            }
        } catch (error) {
            console.error(`Error checking ${type}:`, error);
            setResult(`Error checking ${type}: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setFileNames(e.target.files[0].name);
        resetResults();
    };

    const handleFileSubmit = async () => {
        if (!file) {
            alert("No file selected");
            return;
        }

        resetResults();
        setLoading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:5001/scan-file', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setSummary(response.data);
        } catch (error) {
            console.error('File upload error:', error);
            setError('Failed to analyze file. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const displayDetailedResult = (data, type) => {
        const attributes = data.data.attributes;
        let scanSummary = {
            type: type.toUpperCase(),
            total_engines: attributes.last_analysis_stats.total,
            harmless: attributes.last_analysis_stats.harmless,
            malicious: attributes.last_analysis_stats.malicious,
            suspicious: attributes.last_analysis_stats.suspicious,
            undetected: attributes.last_analysis_stats.undetected,
            reputation: attributes.reputation || 'N/A'
        };
        setResult(scanSummary);
    };

    return (
        <div className="phishing-detection-page">

        <div className="hero-content">
          <h1>Welcome to <span>CyberAegiz</span></h1>
          <p>Your security is our priority. Generate and check the strength of your passwords here.</p>
        </div>

            {/* Analysis Container */}
            <div className="phishing-tool">
                <h2>Analyze Files, Domains, IPs, and URLs for Phishing</h2>
                
                <div className="input-container">
                    <input type="text" id="inputField" placeholder="Enter URL, IP, or Domain" />
                    <button className="check-btn" onClick={() => checkResource(document.getElementById('inputField').value)}>Check</button>
                </div>

            {/* File Upload for Scanning */}
                <div className="drop-zone" onClick={() => document.getElementById('fileInput').click()}>
                    <p>{fileNames || "Drag & Drop or Browse Files"}</p>
                    <input type="file" id="fileInput" onChange={handleFileChange} style={{ display: 'none' }} />
                    <span className="browse-files">Browse Files</span>
                </div>
                <button className="btn-download-extension" onClick={handleFileSubmit}>Analyze File</button>

                {loading && <div>Loading...</div>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                
                {(result || summary) && (
                    <div className="result">
                        <h3>Analysis Summary</h3>
                        {summary && (
                            <>
                                <p><strong>Status:</strong> {summary.status}</p>
                                <p><strong>Total Engines:</strong> {summary.total_engines}</p>
                                <p><strong>Detections:</strong> {summary.detections}</p>
                                <p><strong>Common Threats:</strong> {summary.common_threats.join(', ') || 'None'}</p>
                                <p><strong>Last Analysis Date:</strong> {summary.last_analysis_date}</p>
                            </>
                        )}
                        {result && (
                            <>
                                <p><strong>Type:</strong> {result.type}</p>
                                <p><strong>Total Scanners:</strong> {result.total_engines}</p>
                                <p><strong>Harmless:</strong> {result.harmless}</p>
                                <p><strong>Malicious:</strong> {result.malicious}</p>
                                <p><strong>Suspicious:</strong> {result.suspicious}</p>
                                <p><strong>Undetected:</strong> {result.undetected}</p>
                                {result.type === "IP" || result.type === "DOMAIN" ? (
                                    <p><strong>Reputation:</strong> {result.reputation}</p>
                                ) : null}
                            </>
                        )}
                    </div>
                )}
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

export default PhishingDetectionPage;
