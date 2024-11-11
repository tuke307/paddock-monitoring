import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import { includeIgnoreFile } from '@eslint/compat';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, '.gitignore');

export default tseslint.config(
  includeIgnoreFile(gitignorePath),
  eslintPluginPrettierRecommended,
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.builtin,
        ...globals.node,
      },
    },
    plugins: {
      unicorn: eslintPluginUnicorn,
    },
    rules: {
      'prettier/prettier': ['error'],
      'unicorn/filename-case': [
        'warn',
        {
          case: 'kebabCase',
        },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-extraneous-class': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/strict-boolean-expressions': 'off',
    },
    ignores: [
      '.commitlintrc*',
      '.docker',
      '.eslintcache',
      '.eslintrc*',
      '.prettierrc*',
      'node_modules/',
      'coverage/*',
      'dist/',
      'logs/',
      'package-lock.json',
      'yarn.lock',
      'public/',
      'jest.config.*',
    ],
  }
);
