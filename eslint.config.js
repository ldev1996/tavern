import svelte from "eslint-plugin-svelte";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig(
	{ ignores: ["**/dist/**", "**/node_modules/**"] },
	...tseslint.configs.recommended,
	...svelte.configs["flat/recommended"],
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.es2025,
				Bun: "readonly",
			},
		},

		rules: {
			eqeqeq: ["error", "smart"],
			"no-underscore-dangle": "off",
			"prefer-const": "error",
			"no-console": "warn",
			"no-debugger": "error",
			"@typescript-eslint/no-explicit-any": "error",

			"@typescript-eslint/no-unused-vars": [
				"warn",
				{
					argsIgnorePattern: "^_",
					varsIgnorePattern: "^_",
					caughtErrorsIgnorePattern: "^_",
				},
			],
		},
	},
	{
		files: ["**/*.{ts,tsx,mts,cts,svelte}"],
		ignores: ["**/*.d.ts"],

		languageOptions: {
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
				extraFileExtensions: [".svelte"],
			},
		},

		rules: {
			"@typescript-eslint/no-floating-promises": "error",
		},
	},
	{
		files: ["**/*.svelte"],

		languageOptions: {
			parserOptions: {
				parser: tseslint.parser,
			},
		},
		rules: {
			"prefer-const": "off",
			"svelte/prefer-const": "error",
		},
	},
);
