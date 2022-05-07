class Helpers {
  checkEmailValidity(email: string) {
    const result = email.match(/^[\S^@]+@+[\S^@]+\.+[\S^@]+$/);
    return result ? true : false;
  }

  checkPasswordStrength(password: string) {
    const length = password.length;
    let complexity = 0;

    if (password.match(/(?=.*[a-z])/)) complexity += 26;
    if (password.match(/(?=.*[A-Z])/)) complexity += 26;
    if (password.match(/(?=.*[0-9])/)) complexity += 10;
    if (password.match(/([!-/:-@[-`{-~])/)) complexity += 32;

    const strength = Math.floor(Math.log(Math.pow(complexity, length)) / Math.log(2));

    if (strength > 100) return "very strong";
    if (strength > 75) return "strong";
    if (strength > 50) return "medium";
    return "weak";
  }

  shortenText(text: string) {
    if (text.length > 15) return `${text.substring(0, 15)}...`;
    return text;
  }
};

const helpers = new Helpers();
export default helpers;