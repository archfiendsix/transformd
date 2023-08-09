const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://app.equifax-broker-stg.transformd.com",
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
  // screenshotOnRunFailure: false,
  defaultCommandTimeout: 30000,
  // retries: {
  //   runMode: 10,          // Number of retries for the entire test run
  //   openMode: 10          // Number of retries for individual test cases in the Test Runner
  // }

  
});
