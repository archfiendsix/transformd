# Cypress Project - Page Object Model

Welcome to the Cypress project using the Page Object Model! This project is designed to provide a robust and maintainable framework for end-to-end testing of web applications using Cypress. The Page Object Model pattern helps organize and improve test code readability by encapsulating the interactions with web elements on different pages of the application.

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)

## Introduction

Cypress is a powerful end-to-end testing framework that enables you to write fast, reliable, and scalable tests for web applications. This project adopts the Page Object Model pattern, which promotes writing reusable and structured test code. The use of Page Objects allows you to decouple the test code from the underlying page structure, making it easier to maintain and update tests as the application evolves.

## Prerequisites

Before you start using this project, ensure you have the following prerequisites:

- Node.js (v12 or higher) and npm installed on your machine.

## Installation

To set up the project, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project's root directory in the terminal.
3. Run the following command to install the required dependencies:

```
npm install
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
- `cypress.config.json`: The configuration file for Cypress.
- `cypress.env.json`: olds environment-specific configuration variables or settings used in Cypress tests
- `package.json`: The npm package file containing project dependencies and scripts.

---

Thank you for using our Cypress project. Happy testing! If you have any questions or need assistance, please don't hesitate to reach out.

