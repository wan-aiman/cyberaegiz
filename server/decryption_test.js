const fs = require('fs');
const crypto = require('crypto');

const SALT_LENGTH = 16;
const IV_LENGTH = 12;
const KEY_LENGTH = 32;
const PBKDF2_ITERATIONS = 100000;
const AUTH_TAG_LENGTH = 16;
const ENCRYPTION_ALGORITHM = 'aes-256-gcm';

// Helper function to derive a key using PBKDF2
const deriveKey = (password, salt) =>
  crypto.pbkdf2Sync(password, salt, PBKDF2_ITERATIONS, KEY_LENGTH, 'sha256');

// Decryption function
function decryptFile(filePath, password) {
  try {
    const encryptedData = fs.readFileSync(filePath);

    // Extract components from the encrypted file
    const salt = encryptedData.slice(0, SALT_LENGTH);
    const iv = encryptedData.slice(SALT_LENGTH, SALT_LENGTH + IV_LENGTH);
    const ciphertextWithTag = encryptedData.slice(SALT_LENGTH + IV_LENGTH);

    // Extract ciphertext and authentication tag
    const ciphertext = ciphertextWithTag.slice(0, -AUTH_TAG_LENGTH);
    const authTag = ciphertextWithTag.slice(-AUTH_TAG_LENGTH);

    // Log extracted values for verification
    console.log("Salt (Hex):", salt.toString('hex'));
    console.log("IV (Hex):", iv.toString('hex'));
    console.log("Ciphertext Length:", ciphertext.length);
    console.log("Auth Tag (Hex):", authTag.toString('hex'));

    // Derive the decryption key
    const key = deriveKey(password, salt);
    console.log("Decryption - Derived Key:", key.toString('hex'));

    // Initialize the decipher with the derived key and IV
    const decipher = crypto.createDecipheriv(ENCRYPTION_ALGORITHM, key, iv);
    decipher.setAuthTag(authTag); // Set the extracted auth tag for AES-GCM validation

    // Decrypt the data
    const decrypted = Buffer.concat([
      decipher.update(ciphertext),
      decipher.final(),
    ]);

    // Write the decrypted content to a file
    const outputPath = 'decrypted_test_output.txt';
    fs.writeFileSync(outputPath, decrypted);
    console.log(`Decryption successful. Output saved to ${outputPath}`);
  } catch (error) {
    console.error("Decryption Error:", error.message);
  }
}

// Specify the encrypted file path and the password used for encryption
const password = 'naz'; // Replace this with your actual password
const encryptedFilePath = 'C:\\Users\\Nazrin\\Downloads\\encrypted_file (15).enc'; // Use double backslashes for Windows paths

// Run the decryption
decryptFile(encryptedFilePath, password);
