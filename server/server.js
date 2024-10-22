const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

const PORT = process.env.PORT || 5001;

// Sample route to test the server
app.get('/', (req, res) => {
    res.send('CyberAegiz server is running');
});

app.get('/test', (req, res) => {
    res.json({ message: 'Test route is working!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));


    