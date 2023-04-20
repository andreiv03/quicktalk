export const getPasswordStrength = (password: string) => {
  const lowercaseLettersRegex = /[a-z]/;
  const uppercaseLettersRegex = /[A-Z]/;
  const digitsRegex = /[0-9]/;
  const specialCharactersRegex = /[^a-zA-Z0-9]/;

  let complexity = 0;
  complexity = complexity + (lowercaseLettersRegex.test(password) ? 26 : 0);
  complexity = complexity + (uppercaseLettersRegex.test(password) ? 26 : 0);
  complexity = complexity + (digitsRegex.test(password) ? 10 : 0);
  complexity = complexity + (specialCharactersRegex.test(password) ? 32 : 0);

  const combinations = Math.pow(complexity, password.length);
  const strength = Math.floor(Math.log(combinations) / Math.log(2));

  if (strength > 100) return "very strong";
  if (strength > 75) return "strong";
  if (strength > 50) return "medium";
  return "weak";
};

export const truncateText = (text: string, maxLength: number, suffix = "...") => {
  if (text.length > maxLength) return `${text.substring(0, maxLength)}${suffix}`;
  return text;
};

export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
