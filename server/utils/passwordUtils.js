// backend/utils/passwordUtils.js
const crypto = require('crypto');

// Function to generate a secure random password
function generatePassword(length = 12, includeSymbols = true, includeNumbers = true, includeLowercase = true, includeUppercase = true, avoidAmbiguous = false, avoidDuplicates = false) {
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
  const ambiguousChars = '0O1l';

  let charset = '';
  if (includeLowercase) charset += lowercase;
  if (includeUppercase) charset += uppercase;
  if (includeNumbers) charset += numbers;
  if (includeSymbols) charset += symbols;

  // Remove ambiguous characters if avoidAmbiguous is true
  if (avoidAmbiguous) {
    charset = charset.split('').filter(char => !ambiguousChars.includes(char)).join('');
  }

  const charsetArray = charset.split('');
  let password = '';
  let lastChar = '';

  // Generate secure random password
  for (let i = 0; i < length; i++) {
    const randomBytes = crypto.randomBytes(1); // Secure random byte
    const randomIndex = randomBytes[0] % charsetArray.length; // Map to charset length
    const newChar = charsetArray[randomIndex];

    // Avoid consecutive duplicates
    if (avoidDuplicates && newChar === lastChar) {
      i--; // Retry if duplicate
      continue;
    }

    password += newChar;
    lastChar = newChar;
  }

  return password;
}

// Function to check the strength of a password
function checkPasswordStrength(password) {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  if (score <= 2) return 'Weak';
  if (score === 3) return 'Medium';
  return score >= 4 ? 'Strong' : 'Very Strong';
}

module.exports = { generatePassword, checkPasswordStrength };