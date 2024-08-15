import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      config.env.email = process.env.email;
      config.env.password = process.env.password;
    },
  },
});
