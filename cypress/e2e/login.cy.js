import LoginPage from "../pages/LoginPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";

describe('Login Page Test Suite', () => {
    beforeEach(() => {
        LoginPage.goToLoginPage();
    });

    it('Successful login_Valid Credentials', () => {
        LoginPage.enterCreds(Cypress.env('email'), Cypress.env('password'))
        cy.intercept('POST', '/site/login').as('postLogin');
        LoginPage.clickLoginButton()
        cy.wait('@postLogin')
        LoginPage.elements.logo().should("be.visible");
    });

    it('Unsuccessful login_Invalid Credentials for both fields', () => {
        const invalid_email = "testuser.gmail.com"
        const invalid_password = "wrongpassword"
        
        LoginPage.enterCreds(invalid_email, invalid_password)
        LoginPage.clickLoginButton()
        LoginPage.checkError_password('Incorrect email/username or password')
    });

    it("Unsuccessful login_Invalid email", () => {
        const invalid_email = "testuser.gmail.com"

        LoginPage.enterCreds(invalid_email, Cypress.env("password"))
        LoginPage.clickLoginButton()
        LoginPage.checkError_password('Incorrect email/username or password')
    });

    it("Unsuccessful login_Invalid password", () => {
        const invalid_password = "wrongpassword"

        LoginPage.enterCreds(Cypress.env("email"), invalid_password)
        LoginPage.clickLoginButton()
        LoginPage.checkError_password("Incorrect email/username or password")
    });

    it('Unsuccessful login with valid email and no input password', () => {
        LoginPage.enterCreds(Cypress.env("email"), '');
        LoginPage.clickLoginButton();
        LoginPage.checkError_password("Password cannot be blank")
    });

    it('Unsuccessful login with valid password and no input email', () => {
        LoginPage.enterCreds('', Cypress.env("password"));
        LoginPage.clickLoginButton()
        LoginPage.checkError_email('Email or Username cannot be blank')
    });

    it('Unsuccessful login with no email and password input', () => {
        LoginPage.enterCreds('', '')
        LoginPage.clickLoginButton()
        LoginPage.checkError_password("Password cannot be blank")
        LoginPage.checkError_email("Email or Username cannot be blank");

    });

    // it('Redirect to forgot password', () => {
    //     ForgotPasswordPage.clickForgotPassword();
    // });
    // it.only('Successful reset password', () => {
    //     ForgotPasswordPage.clickForgotPassword();

    //     ForgotPasswordPage.enterCreds(Cypress.env('email'))
    //     ForgotPasswordPage.elements.success_msg().should("be.visible").contains("A reset e-mail has been sent.");


    // });
    // it('Unsuccessful forgot password - Email field is empty', () => {
    //     ForgotPasswordPage.clickForgotPassword();
    //     ForgotPasswordPage.ResetWithNoInputEmail();
    // });
    // it('Unsuccessful forgot password - Invalid input email', () => {
    //     ForgotPasswordPage.ResetWithInvalidEmail();
    // });
});