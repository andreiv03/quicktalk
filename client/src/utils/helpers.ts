export const calculatePasswordStrength = (password: string): string => {
	if (!password) {
		return "weak";
	}

	const complexity =
		Number(/[a-z]/.test(password)) * 26 +
		Number(/[A-Z]/.test(password)) * 26 +
		Number(/[0-9]/.test(password)) * 10 +
		Number(/[^a-zA-Z0-9]/.test(password)) * 32;

	const combinations = Math.pow(complexity, password.length);
	const strength = Math.floor(Math.log2(combinations));

	let result = "weak";
	result = strength > 50 ? "medium" : result;
	result = strength > 75 ? "strong" : result;
	result = strength > 100 ? "very strong" : result;
	return result;
};

export const formatTime12Hour = (dateString: string): string => {
	const date = new Date(dateString);
	if (isNaN(date.getTime())) {
		return "Invalid Date";
	}

	const hours = date.getHours() % 12 || 12;
	const minutes = date.getMinutes().toString().padStart(2, "0");
	const period = date.getHours() >= 12 ? "PM" : "AM";

	return `${hours}:${minutes} ${period}`;
};

export const truncateString = (text: string, maxLength: number, suffix = "..."): string => {
	if (maxLength <= 0) {
		return "";
	}

	if (text.length <= maxLength) {
		return text;
	}

	return `${text.slice(0, maxLength)}${suffix}`;
};

export const validateEmail = (email: string): boolean => {
	if (!email) {
		return false;
	}

	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	return emailRegex.test(email);
};
