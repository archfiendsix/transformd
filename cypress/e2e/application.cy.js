import ApplicationPage from "../pages/ApplicationPage";
import DashboardPage from "../pages/DashboardPage";

const url = Cypress.env('SAMPLE_APPLLICATION_URL')
const bank_username = Cypress.env('BANK_USERNAME')
const bank_password = Cypress.env('BANK_PASSWORD')

describe('Verification Test Suite', () => {
    beforeEach(() => {
        cy.visitMobileMode(url)
        cy.checkLoading()
    });

    it('Should successfully submit bank detail', () => {
        ApplicationPage.clickAddAnotherBank()
        ApplicationPage.addAnotherBank('Debug Bank AU (Debug Bank AU)', bank_username , bank_password)
        ApplicationPage.selectIncludePdf('No')
        ApplicationPage.submitDetails_agreeSubmit()
        ApplicationPage.resPondBenefits('no')
        ApplicationPage.addAnotherBankCheckProcessingResults('Statement upload complete', 'Success')
    })

    it('Should successfully submit bank detail - select Include PDF', () => {
        ApplicationPage.clickAddAnotherBank()
        ApplicationPage.addAnotherBank('Debug Bank AU (Debug Bank AU)', bank_username, bank_password)
        ApplicationPage.selectIncludePdf('Yes')
        ApplicationPage.submitDetails_agreeSubmit()
        ApplicationPage.resPondBenefits('no')
        ApplicationPage.addAnotherBankCheckProcessingResults('Statement upload complete', 'Success')
    })

    it('Should successfully submit bank detail - Gov Benefits respond Yes', () => {
        ApplicationPage.clickAddAnotherBank()
        ApplicationPage.addAnotherBank('Debug Bank AU (Debug Bank AU)', bank_username, bank_password)
        ApplicationPage.selectIncludePdf('No')
        ApplicationPage.submitDetails_agreeSubmit()
        ApplicationPage.resPondBenefits('yes')
        ApplicationPage.loginMyGov(Cypress.env('BANK_USERNAME'), Cypress.env('BANK_USERNAME'))
        ApplicationPage.addAnotherBankCheckProcessingResults('Statement upload complete', 'Success')
    })

    it('Should successfully submit bank detail - Add Another Bank', () => {
        ApplicationPage.clickAddAnotherBank()
        ApplicationPage.addAnotherBank('Debug Bank AU (Debug Bank AU)', bank_username, bank_password)
        ApplicationPage.selectIncludePdf('No')
        ApplicationPage.submitDetails_agreeSubmit()
        ApplicationPage.addAnotherBankRespondBenefits('no')
        ApplicationPage.addAnotherBankCheckProcessingResults('Statement upload complete', 'Success')
    })

    it('Should successfully submit bank detail - select Include PDF, Gov Benefits respond Yes ', () => {
        ApplicationPage.clickAddAnotherBank()
        ApplicationPage.addAnotherBank('Debug Bank AU (Debug Bank AU)', bank_username, bank_password)
        ApplicationPage.selectIncludePdf('Yes')
        ApplicationPage.submitDetails_agreeSubmit()
        ApplicationPage.resPondBenefits('yes')
        ApplicationPage.loginMyGov(Cypress.env('BANK_USERNAME'), Cypress.env('BANK_USERNAME'))
        ApplicationPage.addAnotherBankCheckProcessingResults('Statement upload complete', 'Success','Success!')

    })


    it('Should unsuccessfully proceed submit bank detail - 402 error', () => {
        ApplicationPage.clickAddAnotherBank()
        ApplicationPage.addAnotherBank('Debug Bank AU (Debug Bank AU)', bank_username, bank_password)
        ApplicationPage.selectIncludePdf('No')
        ApplicationPage.selectTestScenario('Failure - 402 error')
        ApplicationPage.submitDetails_agreeSubmit()
        ApplicationPage.resPondBenefits('yes')
        ApplicationPage.loginMyGov(Cypress.env('BANK_USERNAME'), Cypress.env('BANK_USERNAME'))
        ApplicationPage.addAnotherBankCheckProcessingResults('Processing failure', 'Error', 'Success!')
    
    })

    it('Should unsuccessfully proceed submit bank detail - 403 error', () => {
        ApplicationPage.clickAddAnotherBank()
        ApplicationPage.addAnotherBank('Debug Bank AU (Debug Bank AU)', bank_username, bank_password)
        ApplicationPage.selectIncludePdf('No')
        ApplicationPage.selectTestScenario('Failure - 403 error')
        ApplicationPage.submitDetails_agreeSubmit()
        ApplicationPage.resPondBenefits('yes')
        ApplicationPage.loginMyGov(Cypress.env('BANK_USERNAME'), Cypress.env('BANK_USERNAME'))
        ApplicationPage.addAnotherBankCheckProcessingResults('Processing failure', 'Error', 'Success!')
    })


    it.skip('Should unsuccessfully proceed submit bank detail - try again on failure', () => {
        ApplicationPage.clickAddAnotherBank()
        ApplicationPage.addAnotherBank('Debug Bank AU (Debug Bank AU)', bank_username, bank_password)
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
        ApplicationPage.addAnotherBankCheckProcessingResults('Statement upload complete', 'Success','Success!')
    })



    it('Should unsuccessfully submit bank detail - disagree', () => {
        ApplicationPage.clickAddAnotherBank()
        ApplicationPage.addAnotherBank('Debug Bank AU (Debug Bank AU)', bank_username, bank_password)
        ApplicationPage.selectIncludePdf('No')
        ApplicationPage.submitDetails_disagreeLogout()
        ApplicationPage.checkBankSelectPageHeader('Select your bank')
    })

    it.skip('Should unsuccessfully submit bank detail - invalid BANK username', () => { // Test Skipped, no proper error message yet on bank login

        ApplicationPage.clickAddAnotherBank()
        ApplicationPage.addAnotherBank('Debug Bank AU (Debug Bank AU)', 'invalidUsername12345', Cypress.env('BANK_PASSWORD'))
        ApplicationPage.selectIncludePdf('No')
        ApplicationPage.submitDetails_agreeSubmit()
        ApplicationPage.resPondBenefits('no')
        ApplicationPage.addAnotherBankCheckProcessingResults('Statement upload complete', 'Success','Success!')
    })

    
    it.skip('Should unsuccessfully submit bank detail - invalid BANK password', () => { // Test Skipped, no proper error message yet bank login

        ApplicationPage.clickAddAnotherBank()
        ApplicationPage.addAnotherBank('Debug Bank AU (Debug Bank AU)', Cypress.env('BANK_USERNAME'), 'invalidpass12873')
        ApplicationPage.selectIncludePdf('No')
        ApplicationPage.submitDetails_agreeSubmit()
        ApplicationPage.resPondBenefits('no')
        ApplicationPage.addAnotherBankCheckProcessingResults('Statement upload complete', 'Success','Success!')
    })


});