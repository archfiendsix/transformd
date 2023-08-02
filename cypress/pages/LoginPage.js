class LoginPage {
    loc = {
        logo: ".header-logo",
        btn_logout: ".equifax__layout-header a[href='/site/logout']",
        input_email: "input[name='LoginForm[email]']",
        input_password: "input[name='LoginForm[password]']",
        btn_login: "button[name='login-button']",

        // locators for error message
        err_msg: ".section__form-container .control-container+.help-block span",
        err_msg_email: ".type--text > .help-block > span",
        err_msg_password: ".type--password > .help-block > span",
    };

    // redirect to login page
    goToLoginPage = () => {
        cy.visit('/');
        cy.get(".page-title").should("be.visible").contains("Log in");
    };

    // user account logout
    logoutAccount = () => {
        this.LoginWithValidCreds();
        cy.get(this.loc.btn_logout).should("be.visible");
        cy.intercept('POST', '/site/logout').as('postLogout');
        cy.get(this.loc.btn_logout).click();
        cy.wait("@postLogout");
    };

    enterCreds = (email, password) => {
        email != '' ? cy.get(this.loc.input_email).type(email) : cy.get(this.loc.input_email).clear();
        password != '' ? cy.get(this.loc.input_password).type(password) : cy.get(this.loc.input_password).clear();
    };

    clickLoginButton = () => {
        cy.clickEl(this.loc.btn_login)
    };

    checkError_password = (error_msg) => {
        cy.get(this.loc.err_msg_password).contains(error_msg).should("be.visible");
    };

    checkError_email = (error_msg) => {
        cy.get(this.loc.err_msg_email).contains(error_msg).should("be.visible");
    };

    checkLogo=()=> {
       
        cy.get( this.loc.logo).should("be.visible");
    }
}

module.exports = new LoginPage();
