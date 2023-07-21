class LoginPage {
    elements = {
        logo: () => cy.get(".header-logo"),
        btn_logout: () => cy.get(".equifax__layout-header a[href='/site/logout']"),
        input_email: () => cy.get("input[name='LoginForm[email]']"),
        input_password: () => cy.get("input[name='LoginForm[password]']"),
        btn_login: () => cy.get("button[name='login-button']"),

        //elements for error message
        err_msg: () => cy.get(".section__form-container .control-container+.help-block span"),
        err_msg_email: () => cy.get(".type--text > .help-block > span"),
        err_msg_password: () => cy.get(".type--password > .help-block > span"),
    };
    //redirect to login page
    goToLoginPage = () => {
        cy.visit('/');
        cy.get(".page-title").should("be.visible").contains("Log in");
    };

    //user account logout
    logoutAccount = () => {
        this.LoginWithValidCreds();
        this.elements.btn_logout().should("be.visible");
        cy.intercept('POST', '/site/logout').as('postLogout');
        this.elements.btn_logout().click();
        cy.wait("@postLogout");
    };


    enterCreds = (email, password) => {
        email != '' ? this.elements.input_email().type(email) : this.elements.input_email().clear()
        password != '' ? this.elements.input_password().type(password) : this.elements.input_password().clear()
    }

    clickLoginButton = () => {
        this.elements.btn_login().click()
    }

    checkError_password = (error_msg) => {
        this.elements.err_msg_password().contains(error_msg).should("be.visible");

    }
    checkError_email = (error_msg) => {
        this.elements.err_msg_email().contains(error_msg).should("be.visible");
    }

};
module.exports = new LoginPage();