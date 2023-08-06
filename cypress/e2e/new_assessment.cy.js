import LoginPage from "../pages/LoginPage";
import NewAssessmentPage from "../pages/NewAssessmentPage";
import DashboardPage from "../pages/DashboardPage";


const phoneId = Cypress.env("MAILSLURP_PHONEID");
const broker_email = Cypress.env('BROKER_EMAIL')
const broker_password = Cypress.env('BROKER_PASSWORD')

describe('New Assessment Page Test Suite', () => {
    beforeEach(() => {
        // cy.login(broker_email, broker_password);
        // cy.visit("/")
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

    it('Should Unsuccessfully submit assessment if without consent', () => {
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


    it.only('', () => {
        // NewAssessmentPage.openNewAssessment();
        // cy.fixture('simpleData2.json').then((formData) => {
        //     NewAssessmentPage.fillApplication(formData)
        // })
        
        // NewAssessmentPage.clickNext()
        // NewAssessmentPage.sendAssessment()


        cy.mailslurp()
            // use inbox id and a timeout of 30 seconds
            .then({ timeout: 50000 }, mailslurp => {
                return mailslurp.waitController.waitForLatestSms({
                    waitForSingleSmsOptions: {
                        phoneNumberId: '5df3315b-0645-44a1-b80a-10e03af9ac7b',
                        timeout: 50000,
                        unreadOnly: true,
                    },
                });y
            })
            .then((sms) => {
                const url = sms.body.match(/(http|https):\/\/[^ "']+/)[0];
                cy.visit(url, {
                    onBeforeLoad: (win) => {
                        Object.defineProperty(win.navigator, "userAgent", {
                            value:
                                "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1"
                        });
                    }
                });
                cy.get('div[data-tag="incompleteText"]').contains(firstName).should('exist')

        

    });

  


});

