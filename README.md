# Cypress Project - Page Object Model

Welcome to the Cypress project using the Page Object Model! This project is designed to provide a robust and maintainable framework for end-to-end testing of web applications using Cypress. The Page Object Model pattern helps organize and improve test code readability by encapsulating the interactions with web elements on different pages of the application.

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration and Environment Variables](#configuration-and-environment-variables)
- [Usage](#usage)
- [Project Structure](#project-structure)

## Introduction

This project adopts the Page Object Model pattern, which promotes writing reusable and structured test code. The use of Page Objects allows you to decouple the test code from the underlying page structure, making it easier to maintain and update tests as the application evolves.

## Pre-requisites

Before you can run this Cypress project, make sure you have the following pre-requisites installed on your machine:

1. **Node.js and npm**: Cypress requires Node.js and npm to be installed. If you don't have them, you can download the latest version of Node.js from the official website: https://nodejs.org

2. **Git**: You'll need Git to clone the project repository and manage code versioning. You can download Git from the official website: https://git-scm.com/

3. **Project Dependencies**: To install the project dependencies, navigate to the project root directory and run the following command:

   ```
   npm install
   ```


## Installation

To set up the project, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project's root directory in the terminal.
3. Run the following command to install the required dependencies:

```
npm install
```

## Configuration and Environment Variables



This Cypress project requires certain environment variables to be set in the `cypress.env.json` file. These variables are used for test data and authentication credentials.

Before running the tests, make sure to create a `cypress.env.json` file in the project root directory with the following content:

```json
{
  "email": "<your_email_here>",
  "password": "<your_password_here>",
  "bank_username": "<your_bank_username_here>",
  "bank_password": "<your_bank_password_here>"
}
```
To customize Cypress settings and behavior, you can create a `cypress.config.js` file in the project root directory. This file allows you to modify various Cypress configuration options according to your specific testing needs.

To set up the common `cypress.config.js` file for this project, follow these steps:

1. **Create the File**: If you don't already have a `cypress.config.js` file, create one in the project root directory.

2. **Export Configuration Object**: Inside the `cypress.config.js` file, export a configuration object with the desired settings. Here's an example of a common Cypress configuration:

```javascript
// cypress.config.js

module.exports = {
  // Base URL for your application, typically your local development server
  baseUrl: 'http://localhost:3000',

  // Folder where your Cypress test files are located
  integrationFolder: 'cypress/tests',

  // Folder where your Cypress custom commands are located
  supportFile: 'cypress/support/commands.js',

  // Set this to true to automatically run tests in headless mode
  // headless: true,

  // Set this to false to stop Cypress from clearing cookies and local storage between tests
  // defaultCommandTimeout: 4000,

  // Modify any other desired Cypress configuration options here
};
```


## Usage

To run the Cypress tests, use the following command:

```
npm run test
```


This will launch the Cypress Test Runner, allowing you to interactively execute tests in the browser.
To run the tests in headless mode, you can use the following command:

```
npm run test:headless
```


## Project Structure

The project follows a well-organized structure to keep the test code manageable and maintainable. Here's an overview of the directory structure:


- `cypress/`: This directory contains all the test-related code.
    - `downloads/`: Folder where files downloaded during a test are saved
    - `e2e/`: Test files where the test scenarios are written using the Page Object Model.
    - `fixtures/`: Holds the test data or sample JSON files used in the tests.
    - `pages/`: The Page Object Model classes representing different pages of the application.
    - `support/`: Contains utility functions and custom commands to support test execution.
    - `videos/`: Contains captured video recording of the test execution(s)
- `cypress.config.json`: The configuration file for Cypress.
- `cypress.env.json`: olds environment-specific configuration variables or settings used in Cypress tests
- `package.json`: The npm package file containing project dependencies and scripts.

---

Thank you for using our Cypress project. Happy testing! If you have any questions or need assistance, please don't hesitate to reach out.

