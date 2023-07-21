class ForgotPasswordPage {
    elements = {
        forgotpassword_link: () => cy.get("a[href='/site/forgot-password']"),
        resetPage_subtitle: () => cy.get(".page-sub-title"),
        input_email: () => cy.get("#passwordresetrequestform-email"),
        btn_reset: () => cy.get(".pull-left > .btn"),
        // success message
        success_msg: () => cy.get("#w0-success"),
    }
    //user login redirect to forgot password
    clickForgotPassword = () => {
        cy.intercept('GET', '/site/forgot-password').as("getForgotPassword")
        this.elements.forgotpassword_link().click();
        cy.wait("@getForgotPassword");
        this.elements.resetPage_subtitle().should("be.visible").contains("Enter your e-mail below and we will send you reset instructions.");
    };
    //user successful reset password
    SuccessResetPassword = () => {

    };
    //user reset password with no input email
    ResetWithNoInputEmail = () => {
        this.clickForgotPassword();
        this.elements.input_email().clear();
        this.elements.btn_reset().click();
        this.elements.success_msg().should("not.be.visible").contains("A reset e-mail has been sent.");
    };
    //user reset password with invalid email
    ResetWithInvalidEmail = () => {
        this.clickForgotPassword();
        cy.forgotpasswordwith_creds("useremail.com");
        this.elements.success_msg().should("not.be.visible").contains("A reset e-mail has been sent.");
    };

    enterCreds = (email) => {
        cy.forgotpasswordwith_creds();
    }
};
module.exports = new ForgotPasswordPage();