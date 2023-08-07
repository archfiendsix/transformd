import ApplicationPage from "../pages/ApplicationPage";
import DashboardPage from "../pages/DashboardPage";

const url = Cypress.env('SAMPLE_APPLLICATION_URL')
const bank_username = Cypress.env('BANK_USERNAME')
const bank_password = Cypress.env('BANK_PASSWORD')
const phoneId = Cypress.env("MAILSLURP_PHONEID");


describe('Verification Test Suite', () => {
    beforeEach(() => {
        // cy.visitMobileMode(url)
        
        // cy.checkLoading()
    });

    it.only('Should successfully submit bank detail', () => {

        NewAssessmentPage.openNewAssessment();
        cy.fixture('simpleData.json').then((formData) => {
            NewAssessmentPage.fillApplication(formData)
        })
        NewAssessmentPage.clickNext()
        NewAssessmentPage.sendAssessment()

        cy.mailslurp()
            .then({ timeout: 50000 }, mailslurp => {
                return mailslurp.waitController.waitForLatestSms({
                    waitForSingleSmsOptions: {
                        phoneNumberId: phoneId,
                        timeout: 50_000,
                        unreadOnly: true,
                    },
                });
            })
            .then((sms) => {
                const smsUrl = sms.body.match(/(http|https):\/\/[^ "']+/)[0];
                // expect(smsUrl).contains('test')
                cy.log(smsUrl)
                cy.visitMobileMode(smsUrl)

            })

        ApplicationPage.click_bankStatements_button()
        ApplicationPage.selectBank('Debug Bank AU (Debug Bank AU)', Cypress.env('bank_username'), Cypress.env('bank_password'))
        ApplicationPage.selectIncludePdf('No')
        ApplicationPage.submitDetails_agreeSubmit()
        ApplicationPage.resPondBenefits('no')
        ApplicationPage.addAnotherBankCheckProcessingResults('Statement upload complete', 'Success')



    })

    it('Should successfully submit bank detail - select Include PDF', () => {
        NewAssessmentPage.openNewAssessment();
        cy.fixture('simpleData.json').then((formData) => {
            NewAssessmentPage.fillApplication(formData)
        })
        NewAssessmentPage.clickNext()
        NewAssessmentPage.sendAssessment()

        cy.mailslurp()
            .then({ timeout: 50000 }, mailslurp => {
                return mailslurp.waitController.waitForLatestSms({
                    waitForSingleSmsOptions: {
                        phoneNumberId: phoneId,
                        timeout: 50_000,
                        unreadOnly: true,
                    },
                });
            })
            .then((sms) => {
                const smsUrl = sms.body.match(/(http|https):\/\/[^ "']+/)[0];
                // expect(smsUrl).contains('test')
                cy.log(smsUrl)
                cy.visitMobileMode(smsUrl)

            })

        ApplicationPage.click_bankStatements_button()
        ApplicationPage.selectBank('Debug Bank AU (Debug Bank AU)', Cypress.env('bank_username'), Cypress.env('bank_password'))

        ApplicationPage.selectIncludePdf('Yes')
        ApplicationPage.submitDetails_agreeSubmit()
        ApplicationPage.resPondBenefits('no')
        ApplicationPage.addAnotherBankCheckProcessingResults('Statement upload complete', 'Success')
    })

    it('Should successfully submit bank detail - Gov Benefits respond Yes', () => {
        NewAssessmentPage.openNewAssessment();
        cy.fixture('simpleData.json').then((formData) => {
            NewAssessmentPage.fillApplication(formData)
        })
        NewAssessmentPage.clickNext()
        NewAssessmentPage.sendAssessment()

        cy.mailslurp()
            .then({ timeout: 50000 }, mailslurp => {
                return mailslurp.waitController.waitForLatestSms({
                    waitForSingleSmsOptions: {
                        phoneNumberId: phoneId,
                        timeout: 50_000,
                        unreadOnly: true,
                    },
                });
            })
            .then((sms) => {
                const smsUrl = sms.body.match(/(http|https):\/\/[^ "']+/)[0];
                // expect(smsUrl).contains('test')
                cy.log(smsUrl)
                cy.visitMobileMode(smsUrl)

            })

        ApplicationPage.click_bankStatements_button()
        ApplicationPage.selectBank('Debug Bank AU (Debug Bank AU)', Cypress.env('bank_username'), Cypress.env('bank_password'))

        ApplicationPage.selectIncludePdf('No')
        ApplicationPage.submitDetails_agreeSubmit()
        ApplicationPage.resPondBenefits('yes')
        ApplicationPage.loginMyGov(Cypress.env('BANK_USERNAME'), Cypress.env('BANK_USERNAME'))
        ApplicationPage.addAnotherBankCheckProcessingResults('Statement upload complete', 'Success')
    })

    it('Should successfully submit bank detail - Add Another Bank', () => {
        NewAssessmentPage.openNewAssessment();
        cy.fixture('simpleData.json').then((formData) => {
            NewAssessmentPage.fillApplication(formData)
        })
        NewAssessmentPage.clickNext()
        NewAssessmentPage.sendAssessment()

        cy.mailslurp()
            .then({ timeout: 50000 }, mailslurp => {
                return mailslurp.waitController.waitForLatestSms({
                    waitForSingleSmsOptions: {
                        phoneNumberId: phoneId,
                        timeout: 50_000,
                        unreadOnly: true,
                    },
                });
            })
            .then((sms) => {
                const smsUrl = sms.body.match(/(http|https):\/\/[^ "']+/)[0];
                // expect(smsUrl).contains('test')
                cy.log(smsUrl)
                cy.visitMobileMode(smsUrl)

            })

        ApplicationPage.click_bankStatements_button()
        ApplicationPage.selectBank('Debug Bank AU (Debug Bank AU)', Cypress.env('bank_username'), Cypress.env('bank_password'))

        ApplicationPage.selectIncludePdf('No')
        ApplicationPage.submitDetails_agreeSubmit()
        ApplicationPage.addAnotherBankRespondBenefits('no')
        ApplicationPage.addAnotherBankCheckProcessingResults('Statement upload complete', 'Success')
    })

    it('Should successfully submit bank detail - select Include PDF, Gov Benefits respond Yes ', () => {
        NewAssessmentPage.openNewAssessment();
        cy.fixture('simpleData.json').then((formData) => {
            NewAssessmentPage.fillApplication(formData)
        })
        NewAssessmentPage.clickNext()
        NewAssessmentPage.sendAssessment()

        cy.mailslurp()
            .then({ timeout: 50000 }, mailslurp => {
                return mailslurp.waitController.waitForLatestSms({
                    waitForSingleSmsOptions: {
                        phoneNumberId: phoneId,
                        timeout: 50_000,
                        unreadOnly: true,
                    },
                });
            })
            .then((sms) => {
                const smsUrl = sms.body.match(/(http|https):\/\/[^ "']+/)[0];
                // expect(smsUrl).contains('test')
                cy.log(smsUrl)
                cy.visitMobileMode(smsUrl)

            })

        ApplicationPage.click_bankStatements_button()
        ApplicationPage.selectBank('Debug Bank AU (Debug Bank AU)', Cypress.env('bank_username'), Cypress.env('bank_password'))

        ApplicationPage.selectIncludePdf('Yes')
        ApplicationPage.submitDetails_agreeSubmit()
        ApplicationPage.resPondBenefits('yes')
        ApplicationPage.loginMyGov(Cypress.env('BANK_USERNAME'), Cypress.env('BANK_USERNAME'))
        ApplicationPage.addAnotherBankCheckProcessingResults('Statement upload complete', 'Success', 'Success!')

    })


    it('Should unsuccessfully proceed submit bank detail - 402 error', () => {
        NewAssessmentPage.openNewAssessment();
        cy.fixture('simpleData.json').then((formData) => {
            NewAssessmentPage.fillApplication(formData)
        })
        NewAssessmentPage.clickNext()
        NewAssessmentPage.sendAssessment()

        cy.mailslurp()
            .then({ timeout: 50000 }, mailslurp => {
                return mailslurp.waitController.waitForLatestSms({
                    waitForSingleSmsOptions: {
                        phoneNumberId: phoneId,
                        timeout: 50_000,
                        unreadOnly: true,
                    },
                });
            })
            .then((sms) => {
                const smsUrl = sms.body.match(/(http|https):\/\/[^ "']+/)[0];
                // expect(smsUrl).contains('test')
                cy.log(smsUrl)
                cy.visitMobileMode(smsUrl)

            })

        ApplicationPage.click_bankStatements_button()
        ApplicationPage.selectBank('Debug Bank AU (Debug Bank AU)', Cypress.env('bank_username'), Cypress.env('bank_password'))

        ApplicationPage.selectIncludePdf('No')
        ApplicationPage.selectTestScenario('Failure - 402 error')
        ApplicationPage.submitDetails_agreeSubmit()
        ApplicationPage.resPondBenefits('yes')
        ApplicationPage.loginMyGov(Cypress.env('BANK_USERNAME'), Cypress.env('BANK_USERNAME'))
        ApplicationPage.addAnotherBankCheckProcessingResults('Processing failure', 'Error', 'Success!')

    })

    it('Should unsuccessfully proceed submit bank detail - 403 error', () => {
        NewAssessmentPage.openNewAssessment();
        cy.fixture('simpleData.json').then((formData) => {
            NewAssessmentPage.fillApplication(formData)
        })
        NewAssessmentPage.clickNext()
        NewAssessmentPage.sendAssessment()

        cy.mailslurp()
            .then({ timeout: 50000 }, mailslurp => {
                return mailslurp.waitController.waitForLatestSms({
                    waitForSingleSmsOptions: {
                        phoneNumberId: phoneId,
                        timeout: 50_000,
                        unreadOnly: true,
                    },
                });
            })
            .then((sms) => {
                const smsUrl = sms.body.match(/(http|https):\/\/[^ "']+/)[0];
                // expect(smsUrl).contains('test')
                cy.log(smsUrl)
                cy.visitMobileMode(smsUrl)

            })

        ApplicationPage.click_bankStatements_button()
        ApplicationPage.selectBank('Debug Bank AU (Debug Bank AU)', Cypress.env('bank_username'), Cypress.env('bank_password'))

        ApplicationPage.selectIncludePdf('No')
        ApplicationPage.selectTestScenario('Failure - 403 error')
        ApplicationPage.submitDetails_agreeSubmit()
        ApplicationPage.resPondBenefits('yes')
        ApplicationPage.loginMyGov(Cypress.env('BANK_USERNAME'), Cypress.env('BANK_USERNAME'))
        ApplicationPage.addAnotherBankCheckProcessingResults('Processing failure', 'Error', 'Success!')
    })


    it.skip('Should unsuccessfully proceed submit bank detail - try again on failure', () => {
        NewAssessmentPage.openNewAssessment();
        cy.fixture('simpleData.json').then((formData) => {
            NewAssessmentPage.fillApplication(formData)
        })
        NewAssessmentPage.clickNext()
        NewAssessmentPage.sendAssessment()

        cy.mailslurp()
            .then({ timeout: 50000 }, mailslurp => {
                return mailslurp.waitController.waitForLatestSms({
                    waitForSingleSmsOptions: {
                        phoneNumberId: phoneId,
                        timeout: 50_000,
                        unreadOnly: true,
                    },
                });
            })
            .then((sms) => {
                const smsUrl = sms.body.match(/(http|https):\/\/[^ "']+/)[0];
                // expect(smsUrl).contains('test')
                cy.log(smsUrl)
                cy.visitMobileMode(smsUrl)

            })

        ApplicationPage.click_bankStatements_button()
        ApplicationPage.selectBank('Debug Bank AU (Debug Bank AU)', Cypress.env('bank_username'), Cypress.env('bank_password'))

        ApplicationPage.selectIncludePdf('No')
        ApplicationPage.selectTestScenario('Failure - 402 error')
        ApplicationPage.submitDetails_agreeSubmit()
        ApplicationPage.resPondBenefits('yes')
        ApplicationPage.loginMyGov(Cypress.env('BANK_USERNAME'), Cypress.env('BANK_USERNAME'))
        ApplicationPage.addAnotherBankCheckProcessingResults('Processing failure', 'Error')

        ApplicationPage.clickAddAnotherBank()
        ApplicationPage.addAnotherBank('Debug Bank AU (Debug Bank AU)', bank_username, bank_password)
        ApplicationPage.selectIncludePdf('Yes')
        ApplicationPage.submitDetails_agreeSubmit()
        ApplicationPage.resPondBenefits('yes')
        ApplicationPage.loginMyGov(Cypress.env('BANK_USERNAME'), Cypress.env('BANK_USERNAME'))
        ApplicationPage.addAnotherBankCheckProcessingResults('Statement upload complete', 'Success', 'Success!')
    })



    it('Should unsuccessfully submit bank detail - disagree', () => {
        NewAssessmentPage.openNewAssessment();
        cy.fixture('simpleData.json').then((formData) => {
            NewAssessmentPage.fillApplication(formData)
        })
        NewAssessmentPage.clickNext()
        NewAssessmentPage.sendAssessment()

        cy.mailslurp()
            .then({ timeout: 50000 }, mailslurp => {
                return mailslurp.waitController.waitForLatestSms({
                    waitForSingleSmsOptions: {
                        phoneNumberId: phoneId,
                        timeout: 50_000,
                        unreadOnly: true,
                    },
                });
            })
            .then((sms) => {
                const smsUrl = sms.body.match(/(http|https):\/\/[^ "']+/)[0];
                // expect(smsUrl).contains('test')
                cy.log(smsUrl)
                cy.visitMobileMode(smsUrl)

            })

        ApplicationPage.click_bankStatements_button()
        ApplicationPage.selectBank('Debug Bank AU (Debug Bank AU)', Cypress.env('bank_username'), Cypress.env('bank_password'))

        ApplicationPage.selectIncludePdf('No')
        ApplicationPage.submitDetails_disagreeLogout()
        ApplicationPage.checkBankSelectPageHeader('Select your bank')
    })

    it.skip('Should unsuccessfully submit bank detail - invalid BANK username', () => { // Test Skipped, no proper error message yet on bank login

        NewAssessmentPage.openNewAssessment();
        cy.fixture('simpleData.json').then((formData) => {
            NewAssessmentPage.fillApplication(formData)
        })
        NewAssessmentPage.clickNext()
        NewAssessmentPage.sendAssessment()

        cy.mailslurp()
            .then({ timeout: 50000 }, mailslurp => {
                return mailslurp.waitController.waitForLatestSms({
                    waitForSingleSmsOptions: {
                        phoneNumberId: phoneId,
                        timeout: 50_000,
                        unreadOnly: true,
                    },
                });
            })
            .then((sms) => {
                const smsUrl = sms.body.match(/(http|https):\/\/[^ "']+/)[0];
                // expect(smsUrl).contains('test')
                cy.log(smsUrl)
                cy.visitMobileMode(smsUrl)

            })

        ApplicationPage.click_bankStatements_button()
        ApplicationPage.selectBank('Debug Bank AU (Debug Bank AU)', Cypress.env('bank_username'), Cypress.env('bank_password'))

        ApplicationPage.selectIncludePdf('No')
        ApplicationPage.submitDetails_agreeSubmit()
        ApplicationPage.resPondBenefits('no')
        ApplicationPage.addAnotherBankCheckProcessingResults('Statement upload complete', 'Success', 'Success!')
    })


    it.skip('Should unsuccessfully submit bank detail - invalid BANK password', () => { // Test Skipped, no proper error message yet bank login

        NewAssessmentPage.openNewAssessment();
        cy.fixture('simpleData.json').then((formData) => {
            NewAssessmentPage.fillApplication(formData)
        })
        NewAssessmentPage.clickNext()
        NewAssessmentPage.sendAssessment()

        cy.mailslurp()
            .then({ timeout: 50000 }, mailslurp => {
                return mailslurp.waitController.waitForLatestSms({
                    waitForSingleSmsOptions: {
                        phoneNumberId: phoneId,
                        timeout: 50_000,
                        unreadOnly: true,
                    },
                });
            })
            .then((sms) => {
                const smsUrl = sms.body.match(/(http|https):\/\/[^ "']+/)[0];
                // expect(smsUrl).contains('test')
                cy.log(smsUrl)
                cy.visitMobileMode(smsUrl)

            })

        ApplicationPage.click_bankStatements_button()
        ApplicationPage.addAnotherBank('Debug Bank AU (Debug Bank AU)', Cypress.env('BANK_USERNAME'), 'invalidpass12873')
        
        ApplicationPage.selectIncludePdf('No')
        ApplicationPage.submitDetails_agreeSubmit()
        ApplicationPage.resPondBenefits('no')
        ApplicationPage.addAnotherBankCheckProcessingResults('Statement upload complete', 'Success', 'Success!')
    })


});