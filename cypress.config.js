const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://app.equifax-broker-stg.transformd.com/site",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      login_email: "",
      login_password: "",
    },
  },
  viewportWidth: 1366,
  viewportHeight: 768,
  requestTimeout: 30000,
  // numTestsKeptInMemory: 0,
  responseTimeout: 30000,
  pageLoadTimeout: 40000,
  chromeWebSecurity: false,
  // screenshotOnRunFailure: false,
  defaultCommandTimeout: 30000,
  // retries: {
  //   runMode: 10,          // Number of retries for the entire test run
  //   openMode: 10          // Number of retries for individual test cases in the Test Runner
  // }
});
