import 'cypress-iframe';
class ApplicationPage {
    loc = {
        idVerificationBtn: '[data-tag="ocrIncompleteState"]',
        bankStatementBtn: '[data-tag="bankStatementsBtnOne"]',

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
        bankAccountStatementResult: '#BankResult',
        supportinDocumentResults: '#CentrelinkResultWrapper #CentrelinkResult',
        addAnotherBankButton: '[ng-click="backendService.addAnotherBank();"]',
        testScenarioDropdown: '#cs-bank-OP_OPTION',
        wait_tryagain_button: '#pleasewait a',
        bankSelectPageHeader: '#BankSelect h2',
        termsAndConditions: {
            iAgreeButton: '#accept-terms button:first-child()',
            disagreeAndDeclineButton: '#accept-terms button:last-child()',
        },
        governmentBenefits: {
            yesButton: '#Q-Benefits [ng-click="yesButtonClicked()"]',
            noButton: '#Q-Benefits [ng-click="noButtonClicked()"]'
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

    clickBankStatements_button = () => {
        cy.get(this.loc.bankStatementBtn).find('button').click()
    }

    selectBank = (bankName, username, password) => {

        cy.iframe().find(this.loc.bankNameTextBox).type(bankName)
        cy.iframe().find(this.loc.bankNameTextboxDropdownItems).contains(bankName).click()
        cy.iframe().find(this.loc.usernameLabel).should('be.visible')
        cy.iframe().find(this.loc.usernameTextbox).type(username)
        cy.iframe().find(this.loc.passwordTextbox).type(password)

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
            cy.iframe().find(this.loc.governmentBenefits.yesButton).eq(0).click()
        }
        else if (response === 'no') {
            cy.iframe().find(this.loc.governmentBenefits.noButton).eq(0).click()
        }
        else {
            cy.log('Response not valid')
        }
    }

    addAnotherBankRespondBenefits = (response) => {

        if (response === 'yes') {
            cy.get('[title="Credit Sense"]').iframeDirect().find(this.loc.governmentBenefits.yesButton).eq(0).click()
        }
        else if (response === 'no') {
            cy.get('[title="Credit Sense"]').iframeDirect().find(this.loc.governmentBenefits.noButton).eq(0).click()
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

    checkSuccessSupportingDoc = () => {
        cy.iframe().find(this.loc.bankAccountStatementResult).should('be.visible')
    }

    checkSuccessHeader = () => {
        cy.iframe().find(this.loc.statusHeader).should('have.text', 'Statement upload complete')
    }

    checkProcessingResults = (header_text, bankAccountStatementResult_text, supportinDocumentResults_text) => {
        cy.iframe().find(this.loc.statusHeader).should('have.text', header_text)
        cy.iframe().find(this.loc.bankAccountStatementResult).should('include', bankAccountStatementResult_text)
        cy.iframe().find(this.loc.supportinDocumentResults).should('include', supportinDocumentResults_text)

    }

    addAnotherBankCheckProcessingResults = (header_text, bankAccountStatementResult_text) => {
        cy.get('[title="Credit Sense"]').iframeDirect().find(this.loc.statusHeader).contains(header_text)
        cy.get('[title="Credit Sense"]').iframeDirect().find(this.loc.bankAccountStatementResult).contains(bankAccountStatementResult_text)
    }

    clickAddAnotherBank = () => {
        cy.iframe().find(this.loc.addAnotherBankButton).click()
    }


    addAnotherBank = (bankName, username, password) => {

        cy.get('[title="Credit Sense"]').iframeOnload().find(this.loc.bankNameTextBox).should('be.visible').type(bankName)
        cy.iframe().find(this.loc.bankNameTextboxDropdownItems).contains(bankName).click()
        cy.iframe().find(this.loc.usernameLabel).should('be.visible')
        cy.iframe().find(this.loc.usernameTextbox).type(username)
        cy.iframe().find(this.loc.passwordTextbox).type(password)
    }

    finishConnecting = () => {
        cy.get(this.loc.iveFinishedConnectingAccounts).click()
    }

    selectTestScenario = (scenario) => {
        cy.iframe().find(this.loc.testScenarioDropdown).select(scenario)
    }

    check402Failure = () => {

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

    gotoMailslurpSmsLink = (phoneId)=> {
        cy.mailslurp()
            .then({ timeout: 50000 }, mailslurp => {
                return mailslurp.waitController.waitForLatestSms({
                    waitForSingleSmsOptions: {
                        phoneNumberId: phoneId,
                        timeout: 50_000,
                        unreadOnly: false,
                    },
                });
            })
            .then((sms) => {
                const smsUrl = sms.body.match(/(http|https):\/\/[^ "']+/)[0];
                // expect(smsUrl).contains('test')
                cy.log(smsUrl)
                cy.visitMobileMode(smsUrl)

            })
    }

    checkLoading = () => {
        cy.iframe().find('.BankResultLabel.pending img').should('not.exist')
    }

    processingTryAgainClick = () => {
        cy.iframe().find(this.loc.wait_tryagain_button).click()
    }

    changeBankClick = () => {
        cy.iframe().find(this.loc.changeBankButton).click()
    }

    checkBankSelectPageHeader = (text) => {
        cy.get('[title="Credit Sense"]').iframeOnload().find(this.loc.bankSelectPageHeader).contains(text)
    }

};
module.exports = new ApplicationPage();