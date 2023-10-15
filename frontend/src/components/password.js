import React from 'react';

const PasswordStrengthIndicator = ({ password }) => {
  // Define your password strength criteria
  const criteria = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    specialChar: /[!@#$%^&*]/.test(password),
    digit: /\d/.test(password), // Check for at least one digit
  };

  // Calculate password strength
  const isStrong = Object.values(criteria).every((criterion) => criterion);

  return (
    <div className="password-strength-indicator">
      <p>Password Strength: {isStrong ? 'Strong' : 'Weak'}</p>
      <ul>
        <li>At least 8 characters: {criteria.length ? '✅' : '❌'}</li>
        <li>Contains at least one uppercase letter: {criteria.uppercase ? '✅' : '❌'}</li>
        <li>Contains at least one special character: {criteria.specialChar ? '✅' : '❌'}</li>
        <li>Contains at least one digit: {criteria.digit ? '✅' : '❌'}</li>

      </ul>
    </div>
  );
};

export default PasswordStrengthIndicator;
