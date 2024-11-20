// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const path = require('path');
const axios = require('axios');
const fs = require('fs');
const crypto = require('crypto'); // Node.js crypto for encryption/decryption


const passwordRoutes = require('./routes/password'); // Import password route
const User = require('./models/User');
const Quiz = require('./models/Quiz');
const Module = require('./models/Module');
const educationHubRoutes = require('./routes/educationHub');
const assessmentRoutes = require('./routes/assessment');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());


// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse incoming JSON requests

// MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1); // Exit process with failure
    }
};

// Connect to the database
connectDB();

// Routes
// Default Route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Optional Error Handler Middleware

// Routes
app.use('/api/password', passwordRoutes);
app.use('/api/education-hub', educationHubRoutes);
app.use('/api/education-hub/assessment', assessmentRoutes);

const upload = multer({ dest: path.join(__dirname, 'uploads/') });
const PORT = process.env.PORT || 5001;
const ENCRYPTION_ALGORITHM = 'aes-256-cbc';

// Encryption endpoint
app.post('/encrypt', upload.single('file'), (req, res) => {
    if (!req.file || !req.body.password) {
        return res.status(400).send('File and password are required.');
    }

    const password = req.body.password;
    const filePath = req.file.path;
    const encryptedFilePath = `${filePath}.enc`;
    const originalFilename = req.file.originalname;

    const key = crypto.createHash('sha256').update(password).digest();
    const iv = crypto.randomBytes(16); // Initialization vector

    const cipher = crypto.createCipheriv(ENCRYPTION_ALGORITHM, key, iv);
    const input = fs.createReadStream(filePath);
    const output = fs.createWriteStream(encryptedFilePath);

    // Write the IV and original filename as metadata in the encrypted file
    output.write(iv);
    output.write(Buffer.from(originalFilename + '\0')); // Null-terminated filename

    input.pipe(cipher).pipe(output);

    output.on('finish', () => {
        res.download(encryptedFilePath, `${originalFilename}.enc`, (err) => {
            fs.unlinkSync(filePath); // Delete the original file
            fs.unlinkSync(encryptedFilePath); // Delete the encrypted file after download
            if (err) res.status(500).send('Error during file encryption.');
        });
    });
});

// Decryption endpoint
app.post('/decrypt', upload.single('file'), (req, res) => {
    if (!req.file || !req.body.password) {
        return res.status(400).send('File and password are required.');
    }

    const password = req.body.password;
    const filePath = req.file.path;

    const key = crypto.createHash('sha256').update(password).digest();
    const input = fs.createReadStream(filePath);

    let iv, originalFilename = '';
    input.once('readable', () => {
        iv = input.read(16); // Read the first 16 bytes as IV
        let char;
        while ((char = input.read(1)) && char[0] !== 0) { // Read until null terminator
            originalFilename += String.fromCharCode(char[0]);
        }

        const decryptedFilePath = path.join(__dirname, 'uploads', `decrypted_${originalFilename}`);

        const decipher = crypto.createDecipheriv(ENCRYPTION_ALGORITHM, key, iv);
        const output = fs.createWriteStream(decryptedFilePath);

        input.pipe(decipher).pipe(output);

        output.on('finish', () => {
            res.download(decryptedFilePath, originalFilename, (err) => {
                fs.unlinkSync(filePath); // Delete the encrypted file
                fs.unlinkSync(decryptedFilePath); // Delete the decrypted file after download
                if (err) res.status(500).send('Error during file decryption.');
            });
        });
    });
});


app.post('/scan-file', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const apiKey = process.env.VIRUSTOTAL_API_KEY;

    try {
        // Step 1: Calculate SHA-256 hash of the file
        const fileBuffer = fs.readFileSync(req.file.path);
        const hash = crypto.createHash('sha256').update(fileBuffer).digest('hex');

        // Step 2: Check if analysis exists using the hash
        const hashResponse = await axios.get(
            `https://www.virustotal.com/api/v3/files/${hash}`,
            { headers: { 'x-apikey': apiKey } }
        );

        // Step 3: Generate and return a summary if the file is already analyzed
        if (hashResponse.status === 200) {
            const summary = createSummary(hashResponse.data);
            return res.json(summary);
        }
    } catch (error) {
        // If the file is not found (404), continue to upload
        if (error.response && error.response.status !== 404) {
            console.error('Error with VirusTotal API:', error.response.data);
            return res.status(500).json({ error: 'Error analyzing file' });
        }
    }

    // Step 4: Upload file for new analysis if it doesn’t exist on VirusTotal
    try {
        const form = new FormData();
        form.append('file', fs.createReadStream(req.file.path));

        const uploadResponse = await axios.post(
            'https://www.virustotal.com/api/v3/files',
            form,
            {
                headers: {
                    ...form.getHeaders(),
                    'x-apikey': apiKey
                }
            }
        );

        // Step 5: Retrieve analysis report for summary after uploading
        const analysisResponse = await axios.get(
            `https://www.virustotal.com/api/v3/files/${hash}`,
            { headers: { 'x-apikey': apiKey } }
        );

        const summary = createSummary(analysisResponse.data);
        res.json(summary);
    } catch (uploadError) {
        console.error('File upload error:', uploadError.response ? uploadError.response.data : uploadError.message);
        res.status(500).json({ error: 'Error uploading file for analysis' });
    }
});

// Helper function to create a summary from VirusTotal report
function createSummary(data) {
    const totalEngines = data.data.attributes.last_analysis_stats.total || 0;
    const positives = data.data.attributes.last_analysis_stats.malicious || 0;
    
    // Collect the names of threats detected (if any)
    const threatNames = [];
    if (positives > 0) {
        const analysisResults = data.data.attributes.last_analysis_results;
        for (const engine in analysisResults) {
            if (analysisResults[engine].category === 'malicious') {
                threatNames.push(analysisResults[engine].result);
            }
        }
    }

    return {
        total_engines: totalEngines,
        detections: positives,
        common_threats: [...new Set(threatNames)], // Unique threat names
        status: positives > 0 ? 'Malicious' : 'Clean',
        last_analysis_date: new Date(data.data.attributes.last_analysis_date * 1000).toLocaleString()
    };
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
