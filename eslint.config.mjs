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
  },

  // Use the recommended settings from the @eslint/js plugin
  pluginJs.configs.recommended,

  // Jest configuration
  {
    files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
    plugins: {
      jest,
    },
    languageOptions: {
      globals: {
        ...jest.configs.recommended.globals,
      },
    },
    rules: {
      ...jest.configs.recommended.rules,
    },
  },

  // Cypress configuration
  {
    files: ['cypress/**/*.[jt]s?(x)'],
    plugins: {
      cypress,
    },
    languageOptions: {
      globals: {
        ...cypress.configs.recommended.globals,
      },
    },
    rules: {
      ...cypress.configs.recommended.rules,
    },
  },
];
