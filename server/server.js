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

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use('/api/password', passwordRoutes);

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

    const key = crypto.createHash('sha256').update(password).digest();
    const iv = crypto.randomBytes(16); // Initialization vector

    const cipher = crypto.createCipheriv(ENCRYPTION_ALGORITHM, key, iv);
    const input = fs.createReadStream(filePath);
    const output = fs.createWriteStream(encryptedFilePath);

    input.pipe(cipher).pipe(output);

    output.on('finish', () => {
        res.download(encryptedFilePath, 'encrypted_file.enc', (err) => {
            fs.unlinkSync(filePath); // Delete original file
            fs.unlinkSync(encryptedFilePath); // Delete encrypted file after download
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
    const decryptedFilePath = filePath.replace('.enc', '.dec');

    const key = crypto.createHash('sha256').update(password).digest();
    const iv = Buffer.alloc(16, 0); // Placeholder IV for decryption (same as used in encryption)

    const decipher = crypto.createDecipheriv(ENCRYPTION_ALGORITHM, key, iv);
    const input = fs.createReadStream(filePath);
    const output = fs.createWriteStream(decryptedFilePath);

    input.pipe(decipher).pipe(output);

    output.on('finish', () => {
        res.download(decryptedFilePath, 'decrypted_file.txt', (err) => {
            fs.unlinkSync(filePath); // Delete encrypted file
            fs.unlinkSync(decryptedFilePath); // Delete decrypted file after download
            if (err) res.status(500).send('Error during file decryption.');
        });
    });
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
