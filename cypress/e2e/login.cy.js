import LoginPage from "../pages/LoginPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";

const broker_email = Cypress.env('BROKER_EMAIL')
const broker_password = Cypress.env('BROKER_PASSWORD')

describe('Login Page Test Suite', () => {
    beforeEach(() => {
        LoginPage.goToLoginPage();
    });

    it('Should successfully login using valid Credentials', () => {
        LoginPage.enterCreds(Cypress.env('email'), Cypress.env('password'))
        cy.fixture('interceptionPoints.json').then(interceptionPoints=> {
            cy.intercept('POST', interceptionPoints['site_login']).as('postLogin');
        })
        
        LoginPage.clickLoginButton()
        cy.wait('@postLogin')
        
        LoginPage.checkLogo()
    });

    it('Should unsuccessfully login with Invalid Credentials for both fields', () => {
        const invalid_email = "testuser.gmail.com"
        const invalid_password = "wrongpassword"
        
        LoginPage.enterCreds(invalid_email, invalid_password)
        LoginPage.clickLoginButton()
        LoginPage.checkError_password('Incorrect email/username or password')
    });

    it("Should unsuccessfully login with invalid email, valid password", () => {
        const invalid_email = "testuser.gmail.com"

        LoginPage.enterCreds(invalid_email, broker_password)
        LoginPage.clickLoginButton()
        LoginPage.checkError_password('Incorrect email/username or password')
    });

    it("Should unsuccessfully login with wrong password", () => {
        const invalid_password = "wrongpassword"

        LoginPage.enterCreds(broker_email, invalid_password)
        LoginPage.clickLoginButton()
        LoginPage.checkError_password("Incorrect email/username or password")
    });

    it('Should unsuccessfully login with valid email, no password input', () => {
        LoginPage.enterCreds(broker_email, '');
        LoginPage.clickLoginButton();
        LoginPage.checkError_password("Password cannot be blank")
    });

    it('Should unsuccessfully login with valid password, no email input', () => {
        LoginPage.enterCreds('', broker_password);
        LoginPage.clickLoginButton()
        LoginPage.checkError_email('Email or Username cannot be blank')
    });

    it('Should unsuccessfully login with no email and password input', () => {
        LoginPage.enterCreds('', '')
        LoginPage.clickLoginButton()
        LoginPage.checkError_password("Password cannot be blank")
        LoginPage.checkError_email("Email or Username cannot be blank");

    });

    it.skip('Redirect to forgot password', () => {
        ForgotPasswordPage.clickForgotPassword();
    });

    it.skip('Successful reset password', () => {
        ForgotPasswordPage.clickForgotPassword();

        ForgotPasswordPage.enterCreds(broker_email)
        ForgotPasswordPage.elements.success_msg().should("be.visible").contains("A reset e-mail has been sent.");


    });

    it.skip('Unsuccessful forgot password - Email field is empty', () => {
        ForgotPasswordPage.clickForgotPassword();
        ForgotPasswordPage.ResetWithNoInputEmail();
    });

    it.skip('Unsuccessful forgot password - Invalid input email', () => {
        ForgotPasswordPage.ResetWithInvalidEmail();
    });

    
});