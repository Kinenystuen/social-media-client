import { defineConfig } from 'cypress';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Implement node event listeners here
    },
  },
  env: {
    email: process.env.email,
    password: process.env.password,
    invalidEmail: process.env.invalidEmail,
    invalidPassword: process.env.invalidPassword,
  },
});
