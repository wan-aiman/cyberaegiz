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

    const checkResource = async (type, value) => {
        resetResults();  // Clear previous results when starting a new check
        setLoading(true);
        try {
            let endpoint;
            switch (type) {
                case 'url':
                    const encodedUrl = encodeBase64(value).replace(/=+$/, '');
                    endpoint = `https://www.virustotal.com/api/v3/urls/${encodedUrl}`;
                    break;
                case 'ip':
                    endpoint = `https://www.virustotal.com/api/v3/ip_addresses/${value}`;
                    break;
                case 'domain':
                    endpoint = `https://www.virustotal.com/api/v3/domains/${value}`;
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
            setSummary(response.data);  // Set the summary received from the server
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
            <h2>Phishing Detection & File Analysis</h2>
            <p>Analyze suspicious files, domains, IPs, and URLs to identify potential security threats.</p>
            
            {/* URL, IP, Domain Detection */}
            <div className="input-container">
                <input type="text" id="urlInput" placeholder="Enter URL to scan" />
                <button onClick={() => checkResource('url', document.getElementById('urlInput').value)}>Check URL</button>
            </div>
            <div className="input-container">
                <input type="text" id="ipInput" placeholder="Enter IP Address to scan" />
                <button onClick={() => checkResource('ip', document.getElementById('ipInput').value)}>Check IP</button>
            </div>
            <div className="input-container">
                <input type="text" id="domainInput" placeholder="Enter Domain to scan" />
                <button onClick={() => checkResource('domain', document.getElementById('domainInput').value)}>Check Domain</button>
            </div>

            {/* File Upload for Scanning */}
            <div className="drop-zone" onClick={() => document.getElementById('fileInput').click()}>
                <p>{fileNames || "Drag & Drop or Browse Files"}</p>
                <input type="file" id="fileInput" onChange={handleFileChange} style={{ display: 'none' }} />
            </div>
            <button onClick={handleFileSubmit}>Analyze File</button>
            
            {/* Display Loading, Error, and Summary */}
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
    );
};

export default PhishingDetectionPage;
