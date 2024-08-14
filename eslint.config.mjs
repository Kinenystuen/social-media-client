import globals from 'globals';
import pluginJs from '@eslint/js';
import jest from 'eslint-plugin-jest';
import cypress from 'eslint-plugin-cypress';

export default [
  // Base configuration
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'no-unused-vars': 'warn', // Instead of disabling, warn about unused vars
      'no-undef': 'error', // Keep it enabled to catch actual errors
    },
  },

  // Use the recommended settings from the @eslint/js plugin
  pluginJs.configs.recommended,

  // Jest configuration for test files
  {
    files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
    plugins: {
      jest,
    },
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    rules: {
      ...jest.configs.recommended.rules,
    },
  },

  // Cypress configuration for Cypress files
  {
    files: ['cypress/**/*.[jt]s?(x)', '**/*.cy.js'], // Covering both Cypress folders and test files
    plugins: {
      cypress,
    },
    languageOptions: {
      globals: {
        ...globals.cypress,
      },
    },
    rules: {
      ...cypress.configs.recommended.rules,
      'cypress/no-unnecessary-waiting': 'off', // Specific customization
    },
  },
];
