// backend/routes/password.js
const express = require('express');
const { generatePassword, checkPasswordStrength } = require('../utils/passwordUtils');

const router = express.Router();

router.post('/generate', (req, res) => {
  const { length, includeSymbols, includeNumbers, includeLowercase, includeUppercase, avoidAmbiguous, avoidDuplicates } = req.body;
  const password = generatePassword(length, includeSymbols, includeNumbers, includeLowercase, includeUppercase, avoidAmbiguous, avoidDuplicates);
  res.json({ password });
});

router.post('/check-strength', (req, res) => {
  const { password } = req.body;
  const strength = checkPasswordStrength(password);
  res.json({ strength });
});

module.exports = router;
