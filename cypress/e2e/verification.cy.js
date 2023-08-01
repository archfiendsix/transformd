import IdSubmission from "../pages/IdSubmission";
import DashboardPage from "../pages/DashboardPage";

describe('Verification Test Suite', () => {
    beforeEach(() => {
        // cy.login(Cypress.env('email'), Cypress.env('password'));
        // cy.intercept('POST', '/widget/api/submission-count*').as('postSubmissionCountbeforeEach');
        // cy.visit("/")
        // cy.wait('@postSubmissionCountbeforeEach')
        // const url = 'https://equifax-customer.transformd.com/staging/?submissionId=cde15a87099eb8f10d3aa6524dc7c56e7462d6e3'
        // const url = 'https://equifax-customer.transformd.com/staging/?submissionId=3a385d3f535ef91568dde4ccfab29c0d6df1e527'        
        // const url = 'https://equifax-customer.transformd.com/staging/?submissionId=67e72782fdf51087a7fe2c3203bcc90f3aea2fed'
        // const url ='https://equifax-customer.transformd.com/staging/?submissionId=1f7d79d4173058cb7be7de1326ec218037de7838'
        const url ='https://equifax-customer.transformd.com/staging/?submissionId=772368a959bbd107e56a858b8ae05104be62b5a4'
        // const url = 'https://equifax-customer.transformd.com/staging/?submissionId=1cb7e0962e984148ee4beed897fa781671c303c0'
        // const url = 'https://equifax-customer.transformd.com/staging/?submissionId=068b338b199bf8b2d0190bf2936d177504be0187'
        cy.viewport(500, 768)
        cy.visit(url, {
            onBeforeLoad: win => {
                Object.defineProperty(win.navigator, 'userAgent', {
                    value: 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Mobile Safari/537.36',
                });
            },
    
        })
        cy.checkLoading()
    });

    it('Should successfully submit bank detail',()=> {
        
        // IdSubmission.click_bankStatements_button()
        // IdSubmission.selectBank('Debug Bank AU (Debug Bank AU)')
        // IdSubmission.selectIncludePdf('No')
        // IdSubmission.submitDetails_agreeSubmit()
        // IdSubmission.resPondBenefits('yes')
        // IdSubmission.loginMyGov('cs.testa','cs.testa')
        IdSubmission.checkSuccessHeader()
    })

    it('Should successfully submit bank detail - Add Another Bank',()=> {
        
        // IdSubmission.click_bankStatements_button()
        // IdSubmission.selectBank('Debug Bank AU (Debug Bank AU)')
        // IdSubmission.selectIncludePdf('No')
        // IdSubmission.submitDetails_agreeSubmit()
        // IdSubmission.resPondBenefits('yes')
        // IdSubmission.loginMyGov('cs.testa','cs.testa')
        IdSubmission.checkSuccessHeader()
        IdSubmission.addAnotherBank()
    })

    it('Should successfully submit bank detail - Complete',()=> {
        
        // IdSubmission.click_bankStatements_button()
        // IdSubmission.selectBank('Debug Bank AU (Debug Bank AU)')
        // IdSubmission.selectIncludePdf('No')
        // IdSubmission.submitDetails_agreeSubmit()
        // IdSubmission.resPondBenefits('yes')
        // IdSubmission.loginMyGov('cs.testa','cs.testa')
        // IdSubmission.checkSuccessHeader()
        // IdSubmission.addAnotherBank()
        IdSubmission.finishConnecting()
    })

    it('Should unsuccessfully proceed  submit bank detail',()=> {
        
        // IdSubmission.click_bankStatements_button()
        // IdSubmission.selectBank('Debug Bank AU (Debug Bank AU)')
        // IdSubmission.selectIncludePdf('No')
        // IdSubmission.submitDetails_agreeSubmit()
        // IdSubmission.resPondBenefits('')
        // IdSubmission.loginMyGov('cs.testa','cs.testa')
        // IdSubmission.checkSuccessHeader()
        // IdSubmission.addAnotherBank()
        IdSubmission.finishConnecting()
    })

    it('Should unsuccessfully proceed submit bank detail - 402 error',()=> {
        
        // IdSubmission.click_bankStatements_button()
        // IdSubmission.addAnotherBank()
        IdSubmission.selectBank('Debug Bank AU (Debug Bank AU)')
        IdSubmission.selectIncludePdf('No')
        IdSubmission.selectTestScenario('Failure - 402 error')
        
        
        
        IdSubmission.submitDetails_agreeSubmit()
        // cy.wait('@creditsense').then(creditsense=> {
        //     const resBody = creditsense.response.body
        //     const error_code = resBody.data[0].ErrorCode
        //     expect(error_code).to.equal('402')
        // })
        // IdSubmission.resPondBenefits('No')
        // IdSubmission.loginMyGov('cs.testa','cs.testa')
        // IdSubmission.checkSuccessHeader()
        // IdSubmission.addAnotherBank()
        // IdSubmission.finishConnecting()
        IdSubmission.check402Faulure()
    })

    it('Should unsuccessfully proceed submit bank detail - try again on failure',()=> {
        IdSubmission.processingTryAgainClick()
        IdSubmission.changeBankClick()
        IdSubmission.selectBank('Debug Bank AU (Debug Bank AU)')
        IdSubmission.selectIncludePdf('No')
        IdSubmission.selectTestScenario('Failure - 403 error')
        
        
        
        IdSubmission.submitDetails_agreeSubmit()
        // cy.wait('@creditsense').then(creditsense=> {
        //     const resBody = creditsense.response.body
        //     const error_code = resBody.data[0].ErrorCode
        //     expect(error_code).to.equal('402')
        // })
        // IdSubmission.resPondBenefits('No')
        // IdSubmission.loginMyGov('cs.testa','cs.testa')
        // IdSubmission.checkSuccessHeader()
        // IdSubmission.addAnotherBank()
        // IdSubmission.finishConnecting()
        IdSubmission.check402Faulure()
    })

    it.only('Should unsuccessfully proceed submit bank detail - 403 error',()=> {
        // IdSubmission.processingTryAgainClick()
        // IdSubmission.changeBankClick()
        IdSubmission.selectBank('Debug Bank AU (Debug Bank AU)')
        IdSubmission.selectIncludePdf('No')
        IdSubmission.selectTestScenario('Failure - 402 error')
        
        
        
        IdSubmission.submitDetails_agreeSubmit()
        // cy.wait('@creditsense').then(creditsense=> {
        //     const resBody = creditsense.response.body
        //     const error_code = resBody.data[0].ErrorCode
        //     expect(error_code).to.equal('402')
        // })
        // IdSubmission.resPondBenefits('No')
        // IdSubmission.loginMyGov('cs.testa','cs.testa')
        // IdSubmission.checkSuccessHeader()
        // IdSubmission.addAnotherBank()
        // IdSubmission.finishConnecting()
        IdSubmission.check402Faulure()
    })

    it('Should unsuccessfully submit bank detail - disagree',()=> {
        
        IdSubmission.click_bankStatements_button()
        IdSubmission.selectBank('Debug Bank AU (Debug Bank AU)')
        IdSubmission.selectIncludePdf('No')
        IdSubmission.submitDetails_disaagreeSubmit()
    })
    it('Should successfully submit id verification',()=> {
        
        IdSubmission.click_id_verification_button()
        IdSubmission.selectBank('Debug Bank AU (Debug Bank AU)')
        IdSubmission.selectIncludePdf('No')
        IdSubmission.submitDetails_disagreeLogout()
        IdSubmission.resPondBenefits('yes')
        
    })
});