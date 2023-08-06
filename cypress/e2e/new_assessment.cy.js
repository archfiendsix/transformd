import LoginPage from "../pages/LoginPage";
import NewAssessmentPage from "../pages/NewAssessmentPage";
import DashboardPage from "../pages/DashboardPage";

const url = Cypress.env('SAMPLE_APPLLICATION_URL')
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


        // cy.mailslurp()
        //     .then({ timeout: 50000 }, async mailslurp => {
        //         return await mailslurp.waitController.waitForLatestSms({
        //             waitForSingleSmsOptions: {
        //                 phoneNumberId: phoneId,
        //                 timeout: 50000,
        //                 unreadOnly: true,
        //             },
        //         });
        //     })
        //     .then((sms) => {
        //         const smsUrl = sms.body
        //         // .match(/(http|https):\/\/[^ "']+/)[0];
        //         cy.log(smsUrl)
        //         cy.visitMobileMode(smsUrl)
        //         cy.get('div[data-tag="incompleteText"]').contains(firstName).should('exist')

        //     })


        cy.mailslurp()
            .then({ timeout: 50000 }, async mailslurp => {
                // const inbox = await mailslurp.inboxController.createInboxWithDefaults();

                // const phone  = await mailslurp.phoneController.getPhoneNumbers({
                //     phoneCountry: 'AU',
                // })

                // cy.log(phone)
                // mailslurp.phoneController.testPhoneNumberSendSms({
                //     phoneNumberId: phoneId,
                //     // xTestId: testId,
                //     testPhoneNumberOptions: {
                //         message: url,
                //         timeout: 50000,
                //     },
                // });

                const result = await mailslurp.smsController.getSmsMessagesPaginated({
                    phoneNumber: phoneId
                });
                expect(result.totalElements).to.be.greaterThan(0);
                // content contains array of sms messages
                expect(result.content[0].body).to.contain('Your code')
            })
        

    });




});

