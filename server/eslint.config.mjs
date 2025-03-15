import tsEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import eslintPrettierConfig from "eslint-config-prettier";
import prettier from "eslint-plugin-prettier";
import security from "eslint-plugin-security";

export default [
	{
		files: ["**/*.ts", "**/*.tsx"],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaVersion: "latest",
				project: "tsconfig.json",
				sourceType: "module",
			},
		},
		plugins: {
			"@typescript-eslint": tsEslint,
			prettier,
			security,
		},
		rules: {
			...tsEslint.configs.recommended.rules,
			...eslintPrettierConfig.rules,
			"prettier/prettier": "error",
			"@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
			"@typescript-eslint/no-explicit-any": "error",
			"@typescript-eslint/no-non-null-assertion": "warn",
			eqeqeq: ["error", "always"],
			"security/detect-object-injection": "warn",
			"security/detect-non-literal-require": "warn",
			"security/detect-non-literal-fs-filename": "warn",
			"security/detect-eval-with-expression": "error",
			"security/detect-possible-timing-attacks": "warn",
		},
	},
];
