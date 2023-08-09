const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    testIsolation: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    
  },
  viewportWidth: 1366,
  viewportHeight: 768,
  // numTestsKeptInMemory: 0,
  responseTimeout: 50000,
  pageLoadTimeout: 40000,
  chromeWebSecurity: false,
  watchForFileChanges: false,
  requestTimeout: 30000,
  screenshotOnRunFailure: true,
  defaultCommandTimeout: 30000,
  retries: {
    runMode: 0,          
    openMode: 0
  }

  
});
