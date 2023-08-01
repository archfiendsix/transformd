import LoginPage from "../pages/LoginPage";
import NewAssessmentPage from "../pages/NewAssessmentPage";
import DashboardPage from "../pages/DashboardPage";

describe('New Assessment Page Test Suite', () => {
    beforeEach(() => {
        cy.login(Cypress.env('email'), Cypress.env('password'));
        cy.visit("/")
    });

    it('Should open a new assessment', () => {
        NewAssessmentPage.openNewAssessment();
    });

    it('Should be unable to proceed if required fields are not filled', () => { 
        NewAssessmentPage.openNewAssessment();
        NewAssessmentPage.clickNext()
        NewAssessmentPage.nextDidNotProceed()
        NewAssessmentPage.checkRequiredFields();
    });

    it('Should be unable to proceed if required fields are not filled - Manual Address entry', () => { 
        NewAssessmentPage.openNewAssessment();
        NewAssessmentPage.clickNext()
        NewAssessmentPage.nextDidNotProceed()
        NewAssessmentPage.checkRequiredFields();
        const manualaddress = {
            "ApplicantCurrentAddress": {
                "Manual": true
            }
        }
        NewAssessmentPage.fillApplication(manualaddress)
        NewAssessmentPage.clickNext()
        NewAssessmentPage.nextDidNotProceed()
    });

    it ('Should Unsuccessfully submit assessment if without consent', () => {
        NewAssessmentPage.openNewAssessment();
        cy.fixture('simpleData.json').then((formData) => {
            NewAssessmentPage.fillApplication(formData)
        })
        NewAssessmentPage.clickNext()
        NewAssessmentPage.sendAssessmentWithoutConsent();
        NewAssessmentPage.checkErrorMsg('[data-tag="consentConfirm"]', '.formatic-error-message', 'This field is required')
    });

    it('Should show error messages when numbers and special characters are entered as First, middle and last name', () => {
        NewAssessmentPage.openNewAssessment();
        cy.fixture('simpleDataSpecialCharacters.json').then((formData) => {
            NewAssessmentPage.fillApplication(formData)
        })
        NewAssessmentPage.clickNext()
        NewAssessmentPage.checkErrorMsg("[data-tag='ApplicantFirstName']", '.formatic-error-message', 'Invalid characters')
        NewAssessmentPage.checkErrorMsg("[data-tag='ApplicantMiddleName']", '.formatic-error-message', 'Invalid characters')
        NewAssessmentPage.checkErrorMsg("[data-tag='ApplicantLastName']", '.formatic-error-message', 'Invalid characters')

    });

    it('Should only be able to have a Maximum of 4 applicants', () => {
        NewAssessmentPage.openNewAssessment();
        NewAssessmentPage.addNewOtherApplicant()
        NewAssessmentPage.addNewOtherApplicant()
        NewAssessmentPage.addNewOtherApplicant()
        NewAssessmentPage.addNewOtherApplicant()
        NewAssessmentPage.checkOtherApplicantForms();
    });

    it('Successful submission of new assessment using Look-up address and verifying the generation of application ID', () => {
        NewAssessmentPage.openNewAssessment();
        cy.fixture('simpleDataManualCurrentAddress.json').then((formData) => {
            NewAssessmentPage.fillApplication(formData)
        })
        NewAssessmentPage.clickNext()
        NewAssessmentPage.sendAssessment()
        cy.visit("/");
        DashboardPage.checkTableAddedApplication();
    });

   

});

