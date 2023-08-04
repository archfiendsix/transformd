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


    it('', () => {
        const apiKey = "1e2a2164b25ce51edc62e1aab95692f9da4b68754ca0694a717c4e7a8a9ac2de";
        const phoneId = "c3693080-c4c1-4af1-96b0-5db09acf649b";
        const phoneNumber = "0483903391";
        const basePath = "https://cypress.api.mailslurp.com/";


        NewAssessmentPage.openNewAssessment();
        cy.fixture('simpleData2.json').then((formData) => {
            NewAssessmentPage.fillApplication(formData)
        })
        NewAssessmentPage.clickNext()
        NewAssessmentPage.sendAssessment()


        cy.mailslurp()
            .then((mailslurp) => {
                return mailslurp.waitController.waitForLatestSms({
                    waitForSingleSmsOptions: {
                        phoneNumberId: phoneId,
                        timeout: 50_000,
                        unreadOnly: true,
                    },
                });
            })
            .then((sms) => {
                // Add your assertions or actions here
                expect(sms.body).to.contain.text('Test')

                // Extract the URL from the SMS body and visit it
                const url = sms.body.match(/(http|https):\/\/[^ "']+/)[0];
                cy.log(url);
                cy.visit(url, {
                    onBeforeLoad: (win) => {
                        Object.defineProperty(win.navigator, "userAgent", {
                            value:
                                "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1",
                        });
                    },
                });
            });

        // const [sms] = cy.mailslurp().waitController.waitForLatestSms({
        //     waitForSmsConditions: {
        //       count: 1,
        //       unreadOnly: true,
        //       phoneNumberId: phoneNumber.id,
        //       timeout: 30_000,
        //     },
        //   });

        //   expect(sms.body).toContain('Your code: 123');

    });

    it.only('can load the plugin', async function () {
        // test we can connect to mailslurp
        const mailslurp = await cy.mailslurp();
        const userInfo = await mailslurp.userController.getUserInfo();
        expect(userInfo).to.exist
    })


});

