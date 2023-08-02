import ApplicationPage from "../pages/ApplicationPage";
import DashboardPage from "../pages/DashboardPage";

describe('Verification Test Suite', () => {
    beforeEach(() => {
        // const url = 'https://equifax-customer.transformd.com/staging/?submissionId=cde15a87099eb8f10d3aa6524dc7c56e7462d6e3'
        // const url = 'https://equifax-customer.transformd.com/staging/?submissionId=3a385d3f535ef91568dde4ccfab29c0d6df1e527'        
        // const url = 'https://equifax-customer.transformd.com/staging/?submissionId=67e72782fdf51087a7fe2c3203bcc90f3aea2fed'
        // const url ='https://equifax-customer.transformd.com/staging/?submissionId=1f7d79d4173058cb7be7de1326ec218037de7838'
        const url ='https://equifax-customer.transformd.com/staging/?submissionId=772368a959bbd107e56a858b8ae05104be62b5a4'
        // const url = 'https://equifax-customer.transformd.com/staging/?submissionId=1cb7e0962e984148ee4beed897fa781671c303c0'
        // const url = 'https://equifax-customer.transformd.com/staging/?submissionId=068b338b199bf8b2d0190bf2936d177504be0187'
        cy.visitMobileMode(url)
        cy.checkLoading()
    });

    it('Should successfully submit bank detail',()=> {
        
        VerificationPage.click_bankStatements_button()
        VerificationPage.selectBank('Debug Bank AU (Debug Bank AU)')
        VerificationPage.selectIncludePdf('No')
        VerificationPage.submitDetails_agreeSubmit()
        VerificationPage.resPondBenefits('yes')
        VerificationPage.loginMyGov('cs.testa','cs.testa')
        VerificationPage.checkSuccessHeader()
    })

    it('Should successfully submit bank detail - Add Another Bank',()=> {
        
        VerificationPage.click_bankStatements_button()
        VerificationPage.selectBank('Debug Bank AU (Debug Bank AU)')
        VerificationPage.selectIncludePdf('No')
        VerificationPage.submitDetails_agreeSubmit()
        VerificationPage.resPondBenefits('yes')
        VerificationPage.loginMyGov('cs.testa','cs.testa')
        VerificationPage.checkSuccessHeader()
        VerificationPage.addAnotherBank()
    })

    it('Should successfully submit bank detail - Complete',()=> {
        
        VerificationPage.click_bankStatements_button()
        VerificationPage.selectBank('Debug Bank AU (Debug Bank AU)')
        VerificationPage.selectIncludePdf('No')
        VerificationPage.submitDetails_agreeSubmit()
        VerificationPage.resPondBenefits('yes')
        VerificationPage.loginMyGov('cs.testa','cs.testa')
        VerificationPage.checkSuccessHeader()
        VerificationPage.addAnotherBank()
        VerificationPage.finishConnecting()
    })

    it('Should unsuccessfully proceed  submit bank detail',()=> {
        
        VerificationPage.click_bankStatements_button()
        VerificationPage.selectBank('Debug Bank AU (Debug Bank AU)')
        VerificationPage.selectIncludePdf('No')
        VerificationPage.submitDetails_agreeSubmit()
        VerificationPage.resPondBenefits('')
        VerificationPage.loginMyGov('cs.testa','cs.testa')
        VerificationPage.checkSuccessHeader()
        VerificationPage.addAnotherBank()
        VerificationPage.finishConnecting()
    })

    it('Should unsuccessfully proceed submit bank detail - 402 error',()=> {
        
        VerificationPage.click_bankStatements_button()
        VerificationPage.addAnotherBank()
        VerificationPage.selectBank('Debug Bank AU (Debug Bank AU)')
        VerificationPage.selectIncludePdf('No')
        VerificationPage.selectTestScenario('Failure - 402 error')
        
        
        
        VerificationPage.submitDetails_agreeSubmit()
        cy.wait('@creditsense').then(creditsense=> {
            const resBody = creditsense.response.body
            const error_code = resBody.data[0].ErrorCode
            expect(error_code).to.equal('402')
        })
        VerificationPage.resPondBenefits('No')
        VerificationPage.loginMyGov('cs.testa','cs.testa')
        VerificationPage.checkSuccessHeader()
        VerificationPage.addAnotherBank()
        VerificationPage.finishConnecting()
        VerificationPage.check402Faulure()
    })

    it('Should unsuccessfully proceed submit bank detail - try again on failure',()=> {
        VerificationPage.processingTryAgainClick()
        VerificationPage.changeBankClick()
        VerificationPage.selectBank('Debug Bank AU (Debug Bank AU)')
        VerificationPage.selectIncludePdf('No')
        VerificationPage.selectTestScenario('Failure - 403 error')
        
        
        
        VerificationPage.submitDetails_agreeSubmit()
        cy.wait('@creditsense').then(creditsense=> {
            const resBody = creditsense.response.body
            const error_code = resBody.data[0].ErrorCode
            expect(error_code).to.equal('402')
        })
        VerificationPage.resPondBenefits('No')
        VerificationPage.loginMyGov('cs.testa','cs.testa')
        VerificationPage.checkSuccessHeader()
        VerificationPage.addAnotherBank()
        VerificationPage.finishConnecting()
        VerificationPage.check402Faulure()
    })

    it('Should unsuccessfully proceed submit bank detail - 403 error',()=> {
        VerificationPage.processingTryAgainClick()
        VerificationPage.changeBankClick()
        VerificationPage.selectBank('Debug Bank AU (Debug Bank AU)')
        VerificationPage.selectIncludePdf('No')
        VerificationPage.selectTestScenario('Failure - 402 error')
        
        
        
        VerificationPage.submitDetails_agreeSubmit()
        cy.wait('@creditsense').then(creditsense=> {
            const resBody = creditsense.response.body
            const error_code = resBody.data[0].ErrorCode
            expect(error_code).to.equal('402')
        })
        VerificationPage.resPondBenefits('No')
        VerificationPage.loginMyGov('cs.testa','cs.testa')
        VerificationPage.checkSuccessHeader()
        VerificationPage.addAnotherBank()
        VerificationPage.finishConnecting()
        VerificationPage.check402Faulure()
    })

    it('Should unsuccessfully submit bank detail - disagree',()=> {
        
        VerificationPage.click_bankStatements_button()
        VerificationPage.selectBank('Debug Bank AU (Debug Bank AU)')
        VerificationPage.selectIncludePdf('No')
        VerificationPage.submitDetails_disaagreeSubmit()
    })
    it('Should successfully submit id verification',()=> {
        
        VerificationPage.click_id_verification_button()
        VerificationPage.selectBank('Debug Bank AU (Debug Bank AU)')
        VerificationPage.selectIncludePdf('No')
        VerificationPage.submitDetails_disagreeLogout()
        VerificationPage.resPondBenefits('yes')
        
    })
});