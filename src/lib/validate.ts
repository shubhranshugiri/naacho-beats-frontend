// frontend/lib/validate.ts
export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
};

export const validatePassword = (password: string): boolean => {
  // At least 6 chars
  return password.length >= 6;
};
