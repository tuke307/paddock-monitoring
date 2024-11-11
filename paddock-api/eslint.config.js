const eslintPluginUnicorn = require('eslint-plugin-unicorn');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const globals = require('globals');

module.exports = [
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
      ".commitlintrc*",
      ".docker",
      ".eslintcache",
      ".eslintrc*",
      ".prettierrc*",
      "node_modules",
      "coverage",
      "dist",
      "logs",
      "package-lock.json",
      "yarn.lock",
      "public",
      "jest.config.*"
    ],
  },
  eslintPluginPrettierRecommended
];
