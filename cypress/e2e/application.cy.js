import ApplicationPage from "../pages/ApplicationPage";
import DashboardPage from "../pages/DashboardPage";

describe('Verification Test Suite', () => {
    beforeEach(() => {
        const url ='https://equifax-customer.transformd.com/staging/?submissionId=772368a959bbd107e56a858b8ae05104be62b5a4'

        cy.visitMobileMode(url)
        cy.checkLoading()
    });

    it('Should successfully submit bank detail',()=> {
        
        // ApplicationPage.click_bankStatements_button()
        // ApplicationPage.selectBank('Debug Bank AU (Debug Bank AU)', Cypress.env('bank_username'), Cypress.env('bank_password'))
        ApplicationPage.addAnotherBank('Debug Bank AU (Debug Bank AU)', Cypress.env('bank_username'), Cypress.env('bank_password'))
        ApplicationPage.selectIncludePdf('No')
        ApplicationPage.submitDetails_agreeSubmit()
        ApplicationPage.resPondBenefits('no')
        ApplicationPage.addAnotherBankCheckProcessingResults('Statement upload complete', 'Success')
    })

    it.only('Should successfully submit bank detail - Gov Benefits respond Yes',()=> {
        
        // ApplicationPage.click_bankStatements_button()
        // ApplicationPage.selectBank('Debug Bank AU (Debug Bank AU)', Cypress.env('bank_username'), Cypress.env('bank_password'))
        ApplicationPage.addAnotherBank('Debug Bank AU (Debug Bank AU)', Cypress.env('bank_username'), Cypress.env('bank_password'))
        ApplicationPage.selectIncludePdf('No')
        ApplicationPage.submitDetails_agreeSubmit()
        ApplicationPage.resPondBenefits('yes')
        ApplicationPage.loginMyGov(Cypress.env('bank_username'),Cypress.env('bank_username'))
        ApplicationPage.addAnotherBankCheckProcessingResults('Statement upload complete', 'Success')
    })

    it('Should successfully submit bank detail - Add Another Bank',()=> {
        
        ApplicationPage.addAnotherBank('Debug Bank AU (Debug Bank AU)', Cypress.env('bank_username'), Cypress.env('bank_password'))
        ApplicationPage.selectIncludePdf('No')
        ApplicationPage.submitDetails_agreeSubmit()
        ApplicationPage.addAnotherBankResPondBenefits('no')
        ApplicationPage.addAnotherBankCheckProcessingResults('Statement upload complete', 'Success')
    })

    it('Should successfully submit bank detail - Complete',()=> {
        
        // ApplicationPage.click_bankStatements_button()
        // ApplicationPage.selectBank('Debug Bank AU (Debug Bank AU)', Cypress.env('bank_username'), Cypress.env('bank_password'))
        ApplicationPage.addAnotherBank('Debug Bank AU (Debug Bank AU)', Cypress.env('bank_username'), Cypress.env('bank_password'))
        ApplicationPage.selectIncludePdf('Yes')
        ApplicationPage.submitDetails_agreeSubmit()
        ApplicationPage.resPondBenefits('yes')
        ApplicationPage.loginMyGov(Cypress.env('bank_username'),Cypress.env('bank_username'))
        ApplicationPage.addAnotherBankCheckProcessingResults('Statement upload complete', 'Success')
        // ApplicationPage.finishConnecting()
    })

    it.skip('Should unsuccessfully proceed submit bank detail',()=> {
        
        ApplicationPage.click_bankStatements_button()
        ApplicationPage.selectBank('Debug Bank AU (Debug Bank AU)', Cypress.env('bank_username'), Cypress.env('bank_password'))
        ApplicationPage.selectIncludePdf('No')
        ApplicationPage.submitDetails_agreeSubmit()
        ApplicationPage.resPondBenefits('')
        ApplicationPage.loginMyGov(Cypress.env('bank_username'),Cypress.env('bank_username'))
        ApplicationPage.checkSuccessHeader()
        ApplicationPage.addAnotherBank()
        ApplicationPage.finishConnecting()
    })

    it('Should unsuccessfully proceed submit bank detail - 402 error',()=> {
        
        // ApplicationPage.click_bankStatements_button()
        // ApplicationPage.selectBank('Debug Bank AU (Debug Bank AU)', Cypress.env('bank_username'), Cypress.env('bank_password'))
        ApplicationPage.addAnotherBank('Debug Bank AU (Debug Bank AU)', Cypress.env('bank_username'), Cypress.env('bank_password'))
        ApplicationPage.selectIncludePdf('No')
        ApplicationPage.selectTestScenario('Failure - 402 error')
        ApplicationPage.submitDetails_agreeSubmit()
        ApplicationPage.resPondBenefits('yes')
        ApplicationPage.loginMyGov(Cypress.env('bank_username'),Cypress.env('bank_username'))
        ApplicationPage.addAnotherBankCheckProcessingResults('Statement upload complete', 'Failed')
    })

    it.skip('Should unsuccessfully proceed submit bank detail - try again on failure',()=> {
        // ApplicationPage.click_bankStatements_button()
        // ApplicationPage.selectBank('Debug Bank AU (Debug Bank AU)', Cypress.env('bank_username'), Cypress.env('bank_password'))
        ApplicationPage.addAnotherBank('Debug Bank AU (Debug Bank AU)', Cypress.env('bank_username'), Cypress.env('bank_password'))
        ApplicationPage.selectIncludePdf('No')
        
        
        
        ApplicationPage.submitDetails_agreeSubmit()
        cy.wait('@creditsense').then(creditsense=> {
            const resBody = creditsense.response.body
            const error_code = resBody.data[0].ErrorCode
            expect(error_code).to.equal('402')
        })
        ApplicationPage.resPondBenefits('No')
        ApplicationPage.loginMyGov(Cypress.env('bank_username'),Cypress.env('bank_username'))
        ApplicationPage.addAnotherBankCheckProcessingResults('Statement upload complete', 'Failed')
    })

    it('Should unsuccessfully proceed submit bank detail - 403 error',()=> {
       // ApplicationPage.click_bankStatements_button()
        // ApplicationPage.selectBank('Debug Bank AU (Debug Bank AU)', Cypress.env('bank_username'), Cypress.env('bank_password'))
        ApplicationPage.addAnotherBank('Debug Bank AU (Debug Bank AU)', Cypress.env('bank_username'), Cypress.env('bank_password'))
        ApplicationPage.selectIncludePdf('No')
        
        
        
        ApplicationPage.submitDetails_agreeSubmit()
        ApplicationPage.resPondBenefits('yes')
        ApplicationPage.loginMyGov(Cypress.env('bank_username'),Cypress.env('bank_username'))
        ApplicationPage.addAnotherBankCheckProcessingResults('Statement upload complete', 'Failed')
    })

    it.skip('Should unsuccessfully submit bank detail - disagree',()=> {
        
        ApplicationPage.click_bankStatements_button()
        ApplicationPage.selectBank('Debug Bank AU (Debug Bank AU)', Cypress.env('bank_username'), Cypress.env('bank_password'))
        ApplicationPage.selectIncludePdf('No')
        ApplicationPage.submitDetails_disaagreeSubmit()
    })
    it.skip('Should successfully submit id verification',()=> {
        
        ApplicationPage.click_id_verification_button()
        ApplicationPage.selectBank('Debug Bank AU (Debug Bank AU)', Cypress.env('bank_username'), Cypress.env('bank_password'))
        ApplicationPage.selectIncludePdf('No')
        ApplicationPage.submitDetails_disagreeLogout()
        ApplicationPage.resPondBenefits('yes')
        
    })
});