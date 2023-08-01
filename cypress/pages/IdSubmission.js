import 'cypress-iframe';
class IdSubmission {
    loc = {
        idVerificationBtn: '[data-tag="ocrIncompleteState"]',
        bankStatementBtn: '[data-tag="bankStatementsBtnOne"]',
        // bankStatementBtn: '[data-tag="bankStatementsProcessing"]',

        iveFinishedConnectingAccounts: '[data-tag="iveFinishedConnectingAccounts"]',
        bankNameTextBox: '#bankaccount',
        bankNameTextboxDropdownItems: '.ui-menu li',
        usernameLabel: '[for="cs-bank-LOGIN"]',
        usernameTextbox: '#cs-bank-LOGIN',
        passwordTextbox: '#cs-bank-PASSWORD',
        includePdfDropdown: '#cs-bank-OP_OPTION1',
        submitDetailsButton: '#submitdetails',
        changeBankButton: '[ng-if="!changeBankButtonContent"]',
        statusHeader: '#LoginStatusHeader',
        addAnotherBankButton: '[ng-click="backendService.addAnotherBank();"]',
        testScenarioDropdown: '#cs-bank-OP_OPTION',
        wait_tryagain_button: '#pleasewait a',
        termsAndConditions: {
            iAgreeButton: '#accept-terms button:first-child()',
            disagreeAndDeclineButton: '#accept-terms button:last-child()',
        },
        governmentBenefits: {
            yesButton: '[ng-click="yesButtonClicked()"]',
            noButton: '["ng-clicks="noButtonClicked()"]'
        },
        myGov: {
            userNameInput: '#CL-username',
            passwordInput: '#CL-password',
            submitButton: '#submitCtrLink',
            imUnableToLoginButotn: '#skipCentreLinkButton'
        }
    }
    elements = {

    }

    click_id_verification_button = () => {
        cy.get(this.loc.idVerificationBtn).click()
    }

    click_bankStatements_button = () => {
        cy.get(this.loc.bankStatementBtn).find('button').click()
    }

    selectBank = (bankName) => {
        // cy.iframe().find('iframe[title="Credit Sense"]').then($iframe=> {
        //     cy.wrap($iframe).find(this.loc.bankNameTextBox).type(bankName)
        // })

        cy.iframe().find(this.loc.bankNameTextBox).type(bankName)
        cy.iframe().find(this.loc.bankNameTextboxDropdownItems).contains(bankName).click()
        cy.iframe().find(this.loc.usernameLabel).should('be.visible')
        cy.iframe().find(this.loc.usernameTextbox).type('cs.testa')
        cy.iframe().find(this.loc.passwordTextbox).type('cs.testa')


        // cy.iframe().find(this.loc.iveFinishedConnectingAccounts).find('button').should('be.visible')


    }

    selectIncludePdf = (res) => {
        cy.iframe().find(this.loc.includePdfDropdown).select(res)
        cy.iframe().find(this.loc.changeBankButton).should('be.visible')
    }

    submitDetails_agreeSubmit = () => {
        cy.iframe().find(this.loc.submitDetailsButton).click()

        cy.iframe().find(this.loc.termsAndConditions.disagreeAndDeclineButton).should('be.visible')

        cy.iframe().find(this.loc.termsAndConditions.iAgreeButton).click()

    }


    submitDetails_disagreeLogout = () => {
        cy.iframe().find(this.loc.submitDetailsButton).click()

        cy.iframe().find(this.loc.termsAndConditions.disagreeAndDeclineButton).click()

    }

    resPondBenefits = (response) => {

        if (response === 'yes') {
            cy.iframe().find(this.loc.governmentBenefits.yesButton).click()
        }
        else if (response === 'no') {
            cy.iframe().find(this.loc.governmentBenefits.noButton).click()
        }
        else {
            cy.log('Response not valid')
        }
    }

    loginMyGov = (username, password) => {
        cy.iframe().find(this.loc.myGov.userNameInput).type(username)
        cy.iframe().find(this.loc.myGov.passwordInput).type(password)
        cy.iframe().find(this.loc.myGov.submitButton).click()
    }

    checkSuccessHeader = () => {
        cy.iframe().find(this.loc.statusHeader).should('have.text', 'Statement upload complete')
    }

    addAnotherBank = () => {
        cy.iframe().find(this.loc.addAnotherBankButton).click()
    }

    finishConnecting = () => {
        cy.get(this.loc.iveFinishedConnectingAccounts).click()
    }

    selectTestScenario = (scenario) => {
        cy.iframe().find(this.loc.testScenarioDropdown).select(scenario)
    }

    check402Faulure = () => {
        // cy.iframe().find('#pleasewait').should('have.text', 'We can\'t gather your information at this time due to a technical issue with your bank. Please try again at a later time.')
        // cy.iframe().find('#BankResult').should('not.have','Pending').then($bankresult=> {
        //     cy.wrap().should('have.text','Error')
        // })

        cy.iframe().find('#BankResult').should('include.text', 'Pending').then(() => {
           
            this.checkLoading()
            cy.intercept('POST', 'https://creditsense.com.au/ajax/pollBankStatus/*').as('creditsense')
            cy.iframe().find('#BankResult').should('include.text', 'Error')

            cy.wait('@creditsense').then(creditsense => {
                const resBody = creditsense.response.body
                const error_code = resBody.data[0].ErrorCode
                expect(error_code).to.equal('402')
            })

        })

    }

    checkLoading=()=> {
        cy.iframe().find('.BankResultLabel.pending img').should('not.exist')
    }

    processingTryAgainClick=()=> {
        this.checkLoading()
        cy.iframe().find(this.loc.wait_tryagain_button).click()
    }

    changeBankClick=()=> {
        cy.iframe().find(this.loc.changeBankButton).click()
    }

};
module.exports = new IdSubmission();