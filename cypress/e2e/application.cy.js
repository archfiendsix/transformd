import ApplicationPage from "../pages/ApplicationPage";
import DashboardPage from "../pages/DashboardPage";
import NewAssessmentPage from "../pages/NewAssessmentPage";
import ApplicationDetailsPage from "../pages/ApplicationDetailsPage";

const bank_username = Cypress.env('BANK_USERNAME')
const bank_password = Cypress.env('BANK_PASSWORD')
const phoneId = Cypress.env("MAILSLURP_PHONEID");
const broker_email = Cypress.env('BROKER_EMAIL')
const broker_password = Cypress.env('BROKER_PASSWORD')

describe('Verification Test Suite', () => {
    beforeEach(() => {

        if (Cypress.currentTest.title.includes('Assessment Test')) {
            cy.log('Assessment Test Running. Skipping beforeEach()')
        }
        else {
            cy.login(broker_email, broker_password);
            cy.fixture('interceptPoints.json').then(interceptPoints => {
                cy.intercept('POST', interceptPoints['submission_count']).as('postSubmissionCountbeforeEach');
            })
            cy.visit("/")
            cy.wait('@postSubmissionCountbeforeEach')
            cy.checkLoading()
        }


    });

    it('', () => {

        NewAssessmentPage.openNewAssessment();
        cy.fixture('applicantsData.json').then((formData) => {
            NewAssessmentPage.fillApplication(formData[11])

            NewAssessmentPage.clickNext()
            NewAssessmentPage.sendAssessment()
        })


    })

    it('Assessment Test - Should successfully submit bank detail - "Credit Activity" indicator on the assement list change from grey to green or amber - assessment details is included', () => {
        cy.fixture('applicantsData.json').then((formData) => {
            ApplicationPage.gotoMailslurpSmsLink(phoneId)


            ApplicationPage.clickBankStatements_button()
            ApplicationPage.selectBank('Debug Bank AU (Debug Bank AU)', bank_username, bank_password)
            ApplicationPage.selectIncludePdf('No')
            ApplicationPage.submitDetails_agreeSubmit()
            ApplicationPage.resPondBenefits('no')
            ApplicationPage.addAnotherBankCheckProcessingResults('Statement upload complete', 'Success')
            ApplicationPage.finishConnecting()

            ApplicationPage.getRefNumber(phoneId).then(referenceNumber => {
                DashboardPage.applicationSearch('APPLICATION ID', referenceNumber)
                DashboardPage.checkTableCreditActivity('APPLICATION ID', referenceNumber)
                DashboardPage.checkTableIncomeAndExpense('APPLICATION ID', referenceNumber)

                DashboardPage.openApplicationDetails('APPLICATION ID', referenceNumber)

                ApplicationDetailsPage.verifyDetails(formData[11], referenceNumber)
                ApplicationDetailsPage.checkBankReport('SUNCORP')
                ApplicationDetailsPage.checkSummaryReport()
                ApplicationDetailsPage.checkOtherReports()
                ApplicationDetailsPage.checkSnapshotBadge('CREDIT ACTIVITY', 'badge--gray')
                ApplicationDetailsPage.checkSnapshotBadge('ID VERIFICATION', 'badge--gray')
                ApplicationDetailsPage.checkSnapshotBadge('INCOME & EXPENSEVERIFICATION', 'badge--yellow')

            })

        })
    })

    it('Create New Assessment', () => {
        NewAssessmentPage.openNewAssessment();
        cy.fixture('applicantsData.json').then((formData) => {
            NewAssessmentPage.fillApplication(formData[12])
            NewAssessmentPage.clickNext()
            NewAssessmentPage.sendAssessment()

        })
    })

    it('Assessment Test - Should successfully submit bank detail - select Include PDF - "Credit Activity" indicator on the assement list change from grey to green or amber - assessment details is included', () => {
        cy.fixture('applicantsData.json').then((formData) => {
            ApplicationPage.gotoMailslurpSmsLink(phoneId)


            ApplicationPage.clickBankStatements_button()
            ApplicationPage.selectBank('Debug Bank AU (Debug Bank AU)', bank_username, bank_password)

            ApplicationPage.selectIncludePdf('Yes')
            ApplicationPage.submitDetails_agreeSubmit()
            ApplicationPage.resPondBenefits('no')
            ApplicationPage.addAnotherBankCheckProcessingResults('Statement upload complete', 'Success')
            ApplicationPage.finishConnecting()
            ApplicationPage.getRefNumber(phoneId).then(referenceNumber => {
                DashboardPage.applicationSearch('APPLICATION ID', referenceNumber)
                DashboardPage.checkTableCreditActivity('APPLICATION ID', referenceNumber)
                DashboardPage.checkTableIncomeAndExpense('APPLICATION ID', referenceNumber)

                DashboardPage.openApplicationDetails('APPLICATION ID', referenceNumber)

                ApplicationDetailsPage.verifyDetails(formData[12], referenceNumber)
                ApplicationDetailsPage.checkBankReport('SUNCORP')
                ApplicationDetailsPage.checkSummaryReport()
                ApplicationDetailsPage.checkOtherReports()
                ApplicationDetailsPage.checkSnapshotBadge('CREDIT ACTIVITY', 'badge--gray')
                ApplicationDetailsPage.checkSnapshotBadge('ID VERIFICATION', 'badge--gray')
                ApplicationDetailsPage.checkSnapshotBadge('INCOME & EXPENSEVERIFICATION', 'badge--yellow')

            })
        })
    })



    it('Create New Assessment', () => {
        cy.fixture('applicantsData.json').then((formData) => {
            NewAssessmentPage.openNewAssessment();
            cy.fixture('applicantsData.json').then((formData) => {
                NewAssessmentPage.fillApplication(formData[13])
                NewAssessmentPage.clickNext()
                NewAssessmentPage.sendAssessment()
            })
        })
    })

    it('Assessment Test - Should successfully submit bank detail - Gov Benefits respond Yes - "Credit Activity" indicator on the assement list change from grey to green or amber - assessment details is included', () => {
        cy.fixture('applicantsData.json').then((formData) => {
            ApplicationPage.gotoMailslurpSmsLink(phoneId)

            ApplicationPage.clickBankStatements_button()
            ApplicationPage.selectBank('Debug Bank AU (Debug Bank AU)', bank_username, bank_password)
            ApplicationPage.selectIncludePdf('No')
            ApplicationPage.submitDetails_agreeSubmit()
            ApplicationPage.resPondBenefits('yes')
            ApplicationPage.loginMyGov(bank_username, bank_username)
            ApplicationPage.addAnotherBankCheckProcessingResults('Statement upload complete', 'Success')
            ApplicationPage.finishConnecting()

            ApplicationPage.getRefNumber(phoneId).then(referenceNumber => {
                DashboardPage.applicationSearch('APPLICATION ID', referenceNumber)
                DashboardPage.checkTableCreditActivity('APPLICATION ID', referenceNumber)
                DashboardPage.checkTableIncomeAndExpense('APPLICATION ID', referenceNumber)
                DashboardPage.openApplicationDetails('APPLICATION ID', referenceNumber)

                ApplicationDetailsPage.verifyDetails(formData[13], referenceNumber)
                ApplicationDetailsPage.checkBankReport('SUNCORP')
                ApplicationDetailsPage.checkSummaryReport()
                ApplicationDetailsPage.checkOtherReports()
                ApplicationDetailsPage.checkSnapshotBadge('CREDIT ACTIVITY', 'badge--gray')
                ApplicationDetailsPage.checkSnapshotBadge('ID VERIFICATION', 'badge--gray')
                ApplicationDetailsPage.checkSnapshotBadge('INCOME & EXPENSEVERIFICATION', 'badge--yellow')

            })

        })
    })



    it('Create New Assessment', () => {
        cy.fixture('applicantsData.json').then((formData) => {
            NewAssessmentPage.openNewAssessment();
            cy.fixture('applicantsData.json').then((formData) => {
                NewAssessmentPage.fillApplication(formData[15])
                NewAssessmentPage.clickNext()
                NewAssessmentPage.sendAssessment()
            })

        })
    })

    it('Assessment Test - Should successfully submit bank detail - select Include PDF, Gov Benefits respond Yes ', () => {
        cy.fixture('applicantsData.json').then((formData) => {
            ApplicationPage.gotoMailslurpSmsLink(phoneId)


            ApplicationPage.clickBankStatements_button()
            ApplicationPage.selectBank('Debug Bank AU (Debug Bank AU)', bank_username, bank_password)
            ApplicationPage.selectIncludePdf('Yes')
            ApplicationPage.submitDetails_agreeSubmit()
            ApplicationPage.resPondBenefits('yes')
            ApplicationPage.loginMyGov(bank_username, bank_username)
            ApplicationPage.addAnotherBankCheckProcessingResults('Statement upload complete', 'Success')
            ApplicationPage.finishConnecting()

            ApplicationPage.getRefNumber(phoneId).then(referenceNumber => {
                DashboardPage.applicationSearch('APPLICATION ID', referenceNumber)
                DashboardPage.checkTableCreditActivity('APPLICATION ID', referenceNumber)
                DashboardPage.checkTableIncomeAndExpense('APPLICATION ID', referenceNumber)

                DashboardPage.openApplicationDetails('APPLICATION ID', referenceNumber)

                ApplicationDetailsPage.verifyDetails(formData[15], referenceNumber)
                ApplicationDetailsPage.checkBankReport('SUNCORP')
                ApplicationDetailsPage.checkSummaryReport()
                ApplicationDetailsPage.checkOtherReports()
                ApplicationDetailsPage.checkSnapshotBadge('CREDIT ACTIVITY', 'badge--gray')
                ApplicationDetailsPage.checkSnapshotBadge('ID VERIFICATION', 'badge--gray')
                ApplicationDetailsPage.checkSnapshotBadge('INCOME & EXPENSEVERIFICATION', 'badge--yellow')

            })

        })


    })


    it('Should unsuccessfully proceed submit bank detail - 402 error', () => {
        NewAssessmentPage.openNewAssessment();
        cy.fixture('applicantsData.json').then((formData) => {
            NewAssessmentPage.fillApplication(formData)
        })
        NewAssessmentPage.clickNext()
        NewAssessmentPage.sendAssessment()

        ApplicationPage.gotoMailslurpSmsLink(phoneId)

        ApplicationPage.clickBankStatements_button()
        ApplicationPage.selectBank('Debug Bank AU (Debug Bank AU)', bank_username, bank_password)

        ApplicationPage.selectIncludePdf('No')
        ApplicationPage.selectTestScenario('Failure - 402 error')
        ApplicationPage.submitDetails_agreeSubmit()
        ApplicationPage.resPondBenefits('yes')
        ApplicationPage.loginMyGov(bank_username, bank_username)
        ApplicationPage.addAnotherBankCheckProcessingResults('Processing failure', 'Error', 'Success!')
        ApplicationPage.finishConnecting()

    })

    it('Should unsuccessfully proceed submit bank detail - 403 error', () => {
        NewAssessmentPage.openNewAssessment();
        cy.fixture('applicantsData.json').then((formData) => {
            NewAssessmentPage.fillApplication(formData)
        })
        NewAssessmentPage.clickNext()
        NewAssessmentPage.sendAssessment()

        ApplicationPage.gotoMailslurpSmsLink(phoneId)

        ApplicationPage.clickBankStatements_button()
        ApplicationPage.selectBank('Debug Bank AU (Debug Bank AU)', bank_username, bank_password)

        ApplicationPage.selectIncludePdf('No')
        ApplicationPage.selectTestScenario('Failure - 403 error')
        ApplicationPage.submitDetails_agreeSubmit()
        ApplicationPage.resPondBenefits('yes')
        ApplicationPage.loginMyGov(bank_username, bank_username)
        ApplicationPage.addAnotherBankCheckProcessingResults('Processing failure', 'Error', 'Success!')
        ApplicationPage.finishConnecting()

    })


    it('Should unsuccessfully proceed submit bank detail - try again on Bank account statement failure', () => {
        NewAssessmentPage.openNewAssessment();
        cy.fixture('applicantsData.json').then((formData) => {
            NewAssessmentPage.fillApplication(formData)
        })
        NewAssessmentPage.clickNext()
        NewAssessmentPage.sendAssessment()

        ApplicationPage.gotoMailslurpSmsLink(phoneId)

        ApplicationPage.clickBankStatements_button()
        ApplicationPage.selectBank('Debug Bank AU (Debug Bank AU)', bank_username, bank_password)

        ApplicationPage.selectIncludePdf('Yes')
        ApplicationPage.selectTestScenario('Failure - 402 error')
        ApplicationPage.submitDetails_agreeSubmit()
        ApplicationPage.resPondBenefits('yes')
        ApplicationPage.loginMyGov(bank_username, bank_username)
        ApplicationPage.addAnotherBankCheckProcessingResults('Processing failure', 'Error')

        ApplicationPage.processingTryAgainClick()

        ApplicationPage.enterBankingDetails(bank_username, bank_password)
        ApplicationPage.selectIncludePdf('Yes')
        ApplicationPage.submitDetails_agreeSubmit()
        ApplicationPage.addAnotherBankCheckProcessingResults('Statement upload complete', 'Success', 'Success!')
        ApplicationPage.finishConnecting()
        ApplicationPage.getRefNumber(phoneId).then(referenceNumber => {
            DashboardPage.openApplicationDetails('APPLICATION ID', referenceNumber)
            cy.fixture('applicantsData.json').then((formData) => {
                ApplicationDetailsPage.verifyDetails(formData[11], referenceNumber)
            })
        })
    })



    it('Should unsuccessfully submit bank detail - disagree', () => {
        NewAssessmentPage.openNewAssessment();
        cy.fixture('applicantsData.json').then((formData) => {
            NewAssessmentPage.fillApplication(formData)
        })
        NewAssessmentPage.clickNext()
        NewAssessmentPage.sendAssessment()

        ApplicationPage.gotoMailslurpSmsLink(phoneId)

        ApplicationPage.clickBankStatements_button()
        ApplicationPage.selectBank('Debug Bank AU (Debug Bank AU)', bank_username, bank_password)

        ApplicationPage.selectIncludePdf('No')
        ApplicationPage.submitDetails_disagreeLogout()
        ApplicationPage.checkBankSelectPageHeader('Select your bank')
    })

    it.skip('Should unsuccessfully submit bank detail - invalid BANK username', () => { // Test Skipped, no proper error message yet on bank login

        NewAssessmentPage.openNewAssessment();
        cy.fixture('applicantsData.json').then((formData) => {
            NewAssessmentPage.fillApplication(formData)
        })
        NewAssessmentPage.clickNext()
        NewAssessmentPage.sendAssessment()

        ApplicationPage.gotoMailslurpSmsLink(phoneId)

        ApplicationPage.clickBankStatements_button()
        ApplicationPage.selectBank('Debug Bank AU (Debug Bank AU)', 'invalid', bank_password)

        ApplicationPage.selectIncludePdf('No')
        ApplicationPage.submitDetails_agreeSubmit()
        ApplicationPage.resPondBenefits('no')
        ApplicationPage.addAnotherBankCheckProcessingResults('Statement upload complete', 'Success', 'Success!')
    })


    it.skip('Should unsuccessfully submit bank detail - invalid BANK password', () => { // Test Skipped, no proper error message yet bank login

        NewAssessmentPage.openNewAssessment();
        cy.fixture('applicantsData.json').then((formData) => {
            NewAssessmentPage.fillApplication(formData)
        })
        NewAssessmentPage.clickNext()
        NewAssessmentPage.sendAssessment()

        ApplicationPage.gotoMailslurpSmsLink(phoneId)

        ApplicationPage.clickBankStatements_button()
        ApplicationPage.selectBank('Debug Bank AU (Debug Bank AU)', bank_username, bank_password)

        ApplicationPage.selectIncludePdf('No')
        ApplicationPage.submitDetails_agreeSubmit()
        ApplicationPage.resPondBenefits('no')
        ApplicationPage.addAnotherBankCheckProcessingResults('Statement upload complete', 'Success', 'Success!')
    })

    after(() => {
        cy.deleteAllSms(phoneId)
    });
});