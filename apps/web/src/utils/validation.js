// Email validation
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password strength validation
export const getPasswordStrength = (password) => {
  if (!password) return { strength: 0, label: 'None', color: 'bg-gray-300' };

  let strength = 0;
  const checks = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password)
  };

  // Calculate strength
  if (checks.length) strength++;
  if (checks.lowercase) strength++;
  if (checks.uppercase) strength++;
  if (checks.number) strength++;
  if (checks.special) strength++;

  // Return strength level
  if (strength <= 2) return { strength: 1, label: 'Weak', color: 'bg-red-500' };
  if (strength === 3) return { strength: 2, label: 'Fair', color: 'bg-yellow-500' };
  if (strength === 4) return { strength: 3, label: 'Good', color: 'bg-blue-500' };
  return { strength: 4, label: 'Strong', color: 'bg-green-500' };
};

// Field length validation
export const validateLength = (value, min, max) => {
  if (!value) return { valid: false, message: 'This field is required' };
  if (value.length < min) return { valid: false, message: `Minimum ${min} characters required` };
  if (max && value.length > max) return { valid: false, message: `Maximum ${max} characters allowed` };
  return { valid: true, message: '' };
};

// Required field validation
export const isRequired = (value) => {
  if (typeof value === 'string') return value.trim().length > 0;
  return value !== null && value !== undefined;
};

// Password validation
export const validatePassword = (password) => {
  if (!password) {
    return { valid: false, message: 'Password is required' };
  }
  if (password.length < 8) {
    return { valid: false, message: 'Password must be at least 8 characters long' };
  }
  return { valid: true, message: '' };
};

// Validation errors object
export const createErrorState = () => ({
  name: '',
  email: '',
  password: '',
  description: '',
  title: '',
  general: ''
});
