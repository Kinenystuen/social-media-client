import { defineConfig } from 'cypress';
import dotenv from 'dotenv';

// Last inn miljøvariablene
dotenv.config();

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    email: process.env.email,
    password: process.env.password,
  },
});
