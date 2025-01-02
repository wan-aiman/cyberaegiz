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
const FormData = require('form-data');
const rateLimit = require('express-rate-limit'); //rate limiter
const helmet = require('helmet');


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
// Apply Helmet middleware to enhance security
app.use(helmet()); // Default Helmet settings

// MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
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

const PORT = process.env.PORT || 5001;
const ENCRYPTION_ALGORITHM = 'aes-256-cbc';

//file upload security
// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'uploads/')); // Save files to the 'uploads' folder
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// File filter function to validate file types
const fileFilter = async (req, file, cb) => {
    const allowedTypes = [
        'application/pdf',
        'application/zip',
        'application/x-rar-compressed',
        'application/vnd.microsoft.portable-executable', // .exe files
        'application/x-msdownload', // Executable files
        'application/octet-stream', // Generic binary files
        'image/jpeg', 'image/png', 'image/gif',
        'text/plain', 'text/html',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
        'application/vnd.openxmlformats-officedocument.presentationml.presentation', // .pptx
        'application/x-dosexec', // Windows executables
    ];

    if (allowedTypes.includes(file.mimetype) || file.originalname.toLowerCase().endsWith('.exe')) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type.'));
    }
};

// Multer middleware
const upload = multer({
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 }, // 10MB limit
    fileFilter: fileFilter,
});

// File upload route with error handling
app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ error: `Multer error: ${err.message}` });
            } else if (err) {
                return res.status(400).json({ error: err.message });
            }
        }

        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded.' });
        }

        res.status(200).json({ message: 'File uploaded successfully!' });
    });

    fetch('/upload', {
        method: 'POST',
        body: formData, // Your FormData object
    })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(`Error: ${data.error}`); // Show error to the user
            } else {
                alert('File uploaded successfully!');
            }
        })
        .catch(error => console.error('Error:', error));
});

// rate limiter
const encryptDecryptLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 5, // 5 requests per minute
    message: 'Too many encryption/decryption requests, please try again later.',
});

const scanFileLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 20, // 20 requests per minute
    message: 'Too many scan requests, please try again later.',
});

//web security - CSP, Hide X-Powered-By Header, prevent clickjacking

// Hide X-Powered-By Header
// This prevents attackers from knowing the server is running Express.js
app.use(helmet.hidePoweredBy());

// Enforce HTTPS (HSTS)
// Ensures all connections are made over HTTPS (use only when deployed with HTTPS)
app.use(
    helmet.hsts({
        maxAge: 31536000, // 1 year in seconds
        includeSubDomains: true, // Enforce HTTPS for all subdomains
    })
);

// Content Security Policy (CSP)
// Restrict the sources from which the app can load resources
app.use(
    helmet.contentSecurityPolicy({
        useDefaults: true, // Use Helmet's default policies as a base
        directives: {
            "default-src": ["'self'"], // Allow resources only from the same origin
            "script-src": ["'self'", "trusted-cdn.com"], // Allow scripts only from your domain and trusted CDNs
            "style-src": ["'self'", "'unsafe-inline'"], // Allow styles from your domain and inline styles if needed
        },
    })
);

// Prevent Clickjacking
// Ensures your app cannot be embedded in an iframe to prevent clickjacking attacks
app.use(helmet.frameguard({ action: 'deny' }));

// Prevent MIME Sniffing
// Protects against MIME-type confusion attacks by forcing browsers to follow the stated Content-Type
app.use(helmet.noSniff());

// Example route to test Helmet functionality
app.get('/', (req, res) => {
    res.send('Helmet is now securing this app! 🚀');
});

// Encryption endpoint
app.post('/encrypt', encryptDecryptLimiter, upload.single('file'), (req, res) => {
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
app.post('/decrypt', encryptDecryptLimiter, upload.single('file'), (req, res) => {
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


app.post('/scan-file', scanFileLimiter, upload.single('file'), async (req, res) => {
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
