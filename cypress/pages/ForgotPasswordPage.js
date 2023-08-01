class ForgotPasswordPage {
    loc = {
        forgotpassword_link: "a[href='/site/forgot-password']",
        resetPage_subtitle: ".page-sub-title",
        input_email: "#passwordresetrequestform-email",
        btn_reset: ".pull-left > .btn",
        success_msg: "#w0-success",
    };

    // User login redirect to forgot password
    clickForgotPassword = () => {
        cy.intercept('GET', '/site/forgot-password').as("getForgotPassword")
        cy.get(this.loc.forgotpassword_link).click();
        cy.wait("@getForgotPassword");
        cy.get(this.loc.resetPage_subtitle).should("be.visible").contains("Enter your e-mail below and we will send you reset instructions.");
    };

    //user successful reset password
    SuccessResetPassword = () => {

    };

    // User reset password with no input email
    ResetWithNoInputEmail = () => {
        this.clickForgotPassword();
        cy.get(this.loc.input_email).clear();
        cy.get(this.loc.btn_reset).click();
        cy.get(this.loc.success_msg).should("not.be.visible").contains("A reset e-mail has been sent.");
    };

    // User reset password with invalid email
    ResetWithInvalidEmail = () => {
        this.clickForgotPassword();
        cy.get(this.loc.input_email).type("useremail.com");
        cy.get(this.loc.btn_reset).click();
        cy.get(this.loc.success_msg).should("not.be.visible").contains("A reset e-mail has been sent.");
    };
};
module.exports = new ForgotPasswordPage();