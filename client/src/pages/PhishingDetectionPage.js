// src/pages/PhishingDetectionPage.js
import React, { useState } from 'react';
import './PhishingDetection.css';

const PhishingDetectionPage = () => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState('');
    const [fileNames, setFileNames] = useState('');

    const apiKey = process.env.REACT_APP_VIRUSTOTAL_API_KEY;

    // Function to encode to base64
    const encodeBase64 = (input) => {
        try {
            return window.btoa(input);
        } catch (e) {
            console.error("Failed to encode base64:", e);
            return null;
        }
    };

    const checkResource = async (type, value) => {
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

    const uploadFiles = async () => {
        const fileInput = document.getElementById('fileInput');
        if (!fileInput.files.length) {
            alert("No files selected");
            return;
        }

        setLoading(true);
        for (const file of fileInput.files) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await fetch('http://localhost:5001/scan-file', {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    const data = await response.json();
                    displayDetailedResult(data, 'file');
                } else {
                    setResult("Error scanning file: " + file.name);
                }
            } catch (error) {
                console.error("Error uploading file:", error);
                setResult("Error uploading file: " + error.message);
            } finally {
                setLoading(false);
            }
        }
    };

    const displayDetailedResult = (data, type) => {
        let summary = `<h3>${type.toUpperCase()} Analysis Summary</h3>`;
        if (data.data && data.data.attributes) {
            const attributes = data.data.attributes;
            if (type === 'file' || type === 'url') {
                const stats = attributes.last_analysis_stats;
                summary += `<p>Total Scanners: ${stats.harmless + stats.malicious + stats.suspicious + stats.undetected}</p>`;
                summary += `<p>Harmless: ${stats.harmless}</p>`;
                summary += `<p>Malicious: ${stats.malicious}</p>`;
                summary += `<p>Suspicious: ${stats.suspicious}</p>`;
                summary += `<p>Undetected: ${stats.undetected}</p>`;
            }
            if (type === 'ip' || type === 'domain') {
                summary += `<p>Reputation: ${attributes.reputation || 'N/A'}</p>`;
            }
        } else {
            summary = "No analysis data available.";
        }
        setResult(summary);
    };

    return (
        <div className="phishing-detection-page">
            <h2>Phishing Detection</h2>
            <p>Analyze suspicious files, domains, IPs, and URLs to identify potential security threats.</p>
            <div className="input-container">
                <input type="text" id="urlInput" placeholder="Enter URL to scan" />
                <button onClick={() => checkResource('url', document.getElementById('urlInput').value)}>Check URL</button>
            </div>
            <div className="drop-zone" onClick={() => document.getElementById('fileInput').click()}>
                <p>{fileNames || "Drag & Drop or Browse Files"}</p>
                <input type="file" id="fileInput" multiple onChange={() => setFileNames(Array.from(document.getElementById('fileInput').files).map(file => file.name).join(', '))} />
            </div>
            <button onClick={uploadFiles}>Check File</button>
            <div className="input-container">
                <input type="text" id="ipInput" placeholder="Enter IP Address to scan" />
                <button onClick={() => checkResource('ip', document.getElementById('ipInput').value)}>Check IP</button>
            </div>
            <div className="input-container">
                <input type="text" id="domainInput" placeholder="Enter Domain to scan" />
                <button onClick={() => checkResource('domain', document.getElementById('domainInput').value)}>Check Domain</button>
            </div>
            {loading && <div>Loading...</div>}
            <div dangerouslySetInnerHTML={{ __html: result }} />
        </div>
    );
};

export default PhishingDetectionPage;
