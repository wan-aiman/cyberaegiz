const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const path = require('path');

dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// Configure multer for file uploads
const upload = multer({
    dest: path.join(__dirname, 'uploads/') // Directory to store uploaded files
});

const PORT = process.env.PORT || 5001;

// Sample route to test the server
app.get('/', (req, res) => {
    res.send('CyberAegiz server is running');
});

app.get('/test', (req, res) => {
    res.json({ message: 'Test route is working!' });
});

// File upload endpoint
app.post('/scan-file', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    // The file is accessible via req.file
    console.log('Uploaded file:', req.file);

    // Process the uploaded file (scan or analyze it as needed)
    // For now, just send a success response
    res.status(200).json({
        message: 'File uploaded successfully.',
        file: req.file
    });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
