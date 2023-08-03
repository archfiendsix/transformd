import ApplicationPage from "../pages/ApplicationPage";
import DashboardPage from "../pages/DashboardPage";

describe('Verification Test Suite', () => {
    beforeEach(() => {
        const url = 'https://equifax-customer.transformd.com/staging/?submissionId=772368a959bbd107e56a858b8ae05104be62b5a4'

        cy.visitMobileMode(url)
        cy.checkLoading()
    });

    it('Should successfully submit bank detail', () => {

        // ApplicationPage.click_bankStatements_button()
        // ApplicationPage.selectBank('Debug Bank AU (Debug Bank AU)', Cypress.env('bank_username'), Cypress.env('bank_password'))
        ApplicationPage.clickAddAnotherBank()
        ApplicationPage.addAnotherBank('Debug Bank AU (Debug Bank AU)', Cypress.env('bank_username'), Cypress.env('bank_password'))
        ApplicationPage.selectIncludePdf('No')
        ApplicationPage.submitDetails_agreeSubmit()
        ApplicationPage.resPondBenefits('no')
        ApplicationPage.addAnotherBankCheckProcessingResults('Statement upload complete', 'Success')
    })

    it('Should successfully submit bank detail - select Include PDF', () => {

        // ApplicationPage.click_bankStatements_button()
        // ApplicationPage.selectBank('Debug Bank AU (Debug Bank AU)', Cypress.env('bank_username'), Cypress.env('bank_password'))
        ApplicationPage.clickAddAnotherBank()
        ApplicationPage.addAnotherBank('Debug Bank AU (Debug Bank AU)', Cypress.env('bank_username'), Cypress.env('bank_password'))
        ApplicationPage.selectIncludePdf('Yes')
        ApplicationPage.submitDetails_agreeSubmit()
        ApplicationPage.resPondBenefits('no')
        ApplicationPage.addAnotherBankCheckProcessingResults('Statement upload complete', 'Success')
    })

    it('Should successfully submit bank detail - Gov Benefits respond Yes', () => {

        // ApplicationPage.click_bankStatements_button()
        // ApplicationPage.selectBank('Debug Bank AU (Debug Bank AU)', Cypress.env('bank_username'), Cypress.env('bank_password'))
        ApplicationPage.clickAddAnotherBank()
        ApplicationPage.addAnotherBank('Debug Bank AU (Debug Bank AU)', Cypress.env('bank_username'), Cypress.env('bank_password'))
        ApplicationPage.selectIncludePdf('No')
        ApplicationPage.submitDetails_agreeSubmit()
        ApplicationPage.resPondBenefits('yes')
        ApplicationPage.loginMyGov(Cypress.env('bank_username'), Cypress.env('bank_username'))
        ApplicationPage.addAnotherBankCheckProcessingResults('Statement upload complete', 'Success')
    })

    it('Should successfully submit bank detail - Add Another Bank', () => {
        ApplicationPage.clickAddAnotherBank()
        ApplicationPage.addAnotherBank('Debug Bank AU (Debug Bank AU)', Cypress.env('bank_username'), Cypress.env('bank_password'))
        ApplicationPage.selectIncludePdf('No')
        ApplicationPage.submitDetails_agreeSubmit()
        ApplicationPage.addAnotherBankRespondBenefits('no')
        ApplicationPage.addAnotherBankCheckProcessingResults('Statement upload complete', 'Success')
    })

    it('Should successfully submit bank detail - select Include PDF, Gov Benefits respond Yes ', () => {

        // ApplicationPage.click_bankStatements_button()
        // ApplicationPage.selectBank('Debug Bank AU (Debug Bank AU)', Cypress.env('bank_username'), Cypress.env('bank_password'))
        ApplicationPage.clickAddAnotherBank()
        ApplicationPage.addAnotherBank('Debug Bank AU (Debug Bank AU)', Cypress.env('bank_username'), Cypress.env('bank_password'))
        ApplicationPage.selectIncludePdf('Yes')
        ApplicationPage.submitDetails_agreeSubmit()
        ApplicationPage.resPondBenefits('yes')
        ApplicationPage.loginMyGov(Cypress.env('bank_username'), Cypress.env('bank_username'))
        ApplicationPage.addAnotherBankCheckProcessingResults('Statement upload complete', 'Success','Success!')

    })


    it('Should unsuccessfully proceed submit bank detail - 402 error', () => {

        // ApplicationPage.click_bankStatements_button()
        // ApplicationPage.selectBank('Debug Bank AU (Debug Bank AU)', Cypress.env('bank_username'), Cypress.env('bank_password'))
        ApplicationPage.clickAddAnotherBank()
        ApplicationPage.addAnotherBank('Debug Bank AU (Debug Bank AU)', Cypress.env('bank_username'), Cypress.env('bank_password'))
        ApplicationPage.selectIncludePdf('No')
        ApplicationPage.selectTestScenario('Failure - 402 error')
        ApplicationPage.submitDetails_agreeSubmit()
        ApplicationPage.resPondBenefits('yes')
        ApplicationPage.loginMyGov(Cypress.env('bank_username'), Cypress.env('bank_username'))
        ApplicationPage.addAnotherBankCheckProcessingResults('Processing failure', 'Error', 'Success!')
    
    })

    it('Should unsuccessfully proceed submit bank detail - 403 error', () => {
        // ApplicationPage.click_bankStatements_button()
        // ApplicationPage.selectBank('Debug Bank AU (Debug Bank AU)', Cypress.env('bank_username'), Cypress.env('bank_password'))
        ApplicationPage.clickAddAnotherBank()
        ApplicationPage.addAnotherBank('Debug Bank AU (Debug Bank AU)', Cypress.env('bank_username'), Cypress.env('bank_password'))
        ApplicationPage.selectIncludePdf('No')
        ApplicationPage.selectTestScenario('Failure - 403 error')
        ApplicationPage.submitDetails_agreeSubmit()
        ApplicationPage.resPondBenefits('yes')
        ApplicationPage.loginMyGov(Cypress.env('bank_username'), Cypress.env('bank_username'))
        ApplicationPage.addAnotherBankCheckProcessingResults('Processing failure', 'Error', 'Success!')
    })


    it.skip('Should unsuccessfully proceed submit bank detail - try again on failure', () => {
        // ApplicationPage.click_bankStatements_button()
        // ApplicationPage.selectBank('Debug Bank AU (Debug Bank AU)', Cypress.env('bank_username'), Cypress.env('bank_password'))
        ApplicationPage.clickAddAnotherBank()
        ApplicationPage.addAnotherBank('Debug Bank AU (Debug Bank AU)', Cypress.env('bank_username'), Cypress.env('bank_password'))
        ApplicationPage.selectIncludePdf('No')
        ApplicationPage.selectTestScenario('Failure - 402 error')
        ApplicationPage.submitDetails_agreeSubmit()
        ApplicationPage.resPondBenefits('yes')
        ApplicationPage.loginMyGov(Cypress.env('bank_username'), Cypress.env('bank_username'))
        ApplicationPage.addAnotherBankCheckProcessingResults('Processing failure', 'Error')
        
        ApplicationPage.clickAddAnotherBank()
        ApplicationPage.addAnotherBank('Debug Bank AU (Debug Bank AU)', Cypress.env('bank_username'), Cypress.env('bank_password'))
        ApplicationPage.selectIncludePdf('Yes')
        ApplicationPage.submitDetails_agreeSubmit()
        ApplicationPage.resPondBenefits('yes')
        ApplicationPage.loginMyGov(Cypress.env('bank_username'), Cypress.env('bank_username'))
        ApplicationPage.addAnotherBankCheckProcessingResults('Statement upload complete', 'Success','Success!')
    })



    it('Should unsuccessfully submit bank detail - disagree', () => {

        // ApplicationPage.click_bankStatements_button()
        // ApplicationPage.selectBank('Debug Bank AU (Debug Bank AU)', Cypress.env('bank_username'), Cypress.env('bank_password'))
        ApplicationPage.clickAddAnotherBank()
        ApplicationPage.addAnotherBank('Debug Bank AU (Debug Bank AU)', Cypress.env('bank_username'), Cypress.env('bank_password'))
        ApplicationPage.selectIncludePdf('No')
        ApplicationPage.submitDetails_disagreeLogout()
        ApplicationPage.checkBankSelectPageHeader('Select your bank')
    })

    it.skip('Should unsuccessfully submit bank detail - invalid BANK username', () => { // Test Skipped, no proper error message yet on bank login

        // ApplicationPage.click_bankStatements_button()
        // ApplicationPage.selectBank('Debug Bank AU (Debug Bank AU)', Cypress.env('bank_username'), Cypress.env('bank_password'))
        ApplicationPage.clickAddAnotherBank()
        ApplicationPage.addAnotherBank('Debug Bank AU (Debug Bank AU)', 'invalidUsername12345', Cypress.env('bank_password'))
        ApplicationPage.selectIncludePdf('No')
        ApplicationPage.submitDetails_agreeSubmit()
        ApplicationPage.resPondBenefits('no')
        ApplicationPage.addAnotherBankCheckProcessingResults('Statement upload complete', 'Success','Success!')
    })

    
    it.skip('Should unsuccessfully submit bank detail - invalid BANK password', () => { // Test Skipped, no proper error message yet bank login

        // ApplicationPage.click_bankStatements_button()
        // ApplicationPage.selectBank('Debug Bank AU (Debug Bank AU)', Cypress.env('bank_username'), Cypress.env('bank_password'))
        ApplicationPage.clickAddAnotherBank()
        ApplicationPage.addAnotherBank('Debug Bank AU (Debug Bank AU)', Cypress.env('bank_username'), 'invalidpass12873')
        ApplicationPage.selectIncludePdf('No')
        ApplicationPage.submitDetails_agreeSubmit()
        ApplicationPage.resPondBenefits('no')
        ApplicationPage.addAnotherBankCheckProcessingResults('Statement upload complete', 'Success','Success!')
    })


});