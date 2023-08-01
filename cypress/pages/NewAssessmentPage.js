class NewAssessmentPage {
    loc = {
        btn_newAssessment: "button[class='btn btn--primary btn--square w-100']",
        h1_newApplication: "div[class='page page__edit'] h1",
        h2_applicantDetails: "h2[class='formatic-heading']",
        input_text: "input[class='formatic-text__input']",
        inputFirstName: "[data-tag='ApplicantFirstName'] input",
        inputLastName: "[data-tag='ApplicantLastName'] input",
        inputMiddleName: "[data-tag='ApplicantMiddleName'] input",
        inputDateOfBirth: "[data-tag='ApplicantDateOfBirth'] input.formatic-date-picker__date-picker",
        dropdownGender: "div[class='formatic-dropdown__select ant-select ant-select-enabled'] div[class='ant-select-selection__placeholder']",
        inputGender: "[data-tag='ApplicantGender'] input",
        inputMobileNumber: "[data-tag='ApplicantMobileNumber'] input",
        inputDriversLicenceNumber: "[data-tag='ApplicantDriversLicenceNumber'] input",
        selectManualAddressEntry: "button[class='formatic-address-lookup__button-enter-manually']",
        inputCurrentAddress: "[data-tag='ApplicantCurrentAddress'] input",
        inputPreviousAddress: "[data-tag='ApplicantPreviousAddress'] input",
        inputLoanAmount: "[data-tag='loanAmount'] input",
        inputApplicantEmployer: "[data-tag='ApplicantEmployer'] input",
        btnNext: ".formatic-button.formatic-action-bar-root__next",
        checkAgreement: "input[label='I have read and agree to the consent statement above']",
        btnSendAssessment: "[data-tag='sendAssessments'] button",
        addNewOtherApplicants: "button[class='formatic-repeatable__add-repeatable-button']",
        applicantDetailForm: "[data-tag='ApplicantDetails'] .formatic-repetition-transition--add",
        errormsg: ".formatic-error-message",
        consentConfirmErrorMsg: "[data-tag='consentConfirm'] .formatic-error-message",
        pleaseReadTheBelowConsentStatement: "[data-tag='pleaseReadTheBelowConsentStatement'] .formatic-label"
    };

    sendAssessment = () => {
        cy.get(this.loc.checkAgreement).check({ force: true });
        cy.get(this.loc.btnSendAssessment).click()
        cy.get('.formatic-label__content').contains('Applicant SMS Sent');
    }

    selectManualAddressEntry = () => {
        cy.get('.ant-select-selection__placeholder').last().contains('Please, start typing an address...').click({ force: true });
        cy.get('.ant-select-dropdown').not('have.class', '.ant-select-dropdown-hidden').last()
            .then($el => {
                cy.wrap($el).find('button').click({ force: true });
            }
            );
    }

    openNewAssessment = () => {
        this.clickBtnNewAssessment();
    }

    clickNext = () => {
        cy.checkLoading();
        cy.get('[data-tag="ApplicantFirstName"] input').should('be.visible')
        cy.get(this.loc.btnNext).click()
        cy.checkLoading();
    }

    clickBtnNewAssessment = () => {
        cy.get(this.loc.btn_newAssessment).should("be.visible").click();
    }

    checkRequiredFields = () => {
        //check the required fields
        cy.get(this.loc.errormsg).eq(0).should("be.visible").contains("This field is required");
        cy.get(this.loc.errormsg).eq(1).should("be.visible").contains("This field is required");
        cy.get(this.loc.errormsg).eq(2).should("be.visible").contains("Please enter valid date");
        cy.get(this.loc.errormsg).eq(3).should("be.visible").contains("This field is required");
        cy.get(this.loc.errormsg).eq(4).should("be.visible").contains("This field is required");
        cy.get(this.loc.errormsg).eq(5).should("be.visible").contains("This field is required");
        cy.get(this.loc.errormsg).eq(6).should("be.visible").contains("Please select a valid address")
        cy.get(this.loc.errormsg).eq(7).should("be.visible").contains("This field is required");

        cy.get(this.loc.inputFirstName).should("be.visible").type("Test");
        this.clickNext()
    }

    sendAssessmentWithoutConsent = () => {
        cy.get(this.loc.btnSendAssessment).click();
        cy.get(this.loc.consentConfirmErrorMsg).should("be.visible").contains("This field is required");
    };

    fillApplication = (formData) => {
        cy.checkLoading()
        Object.keys(formData).forEach(key => {
            if (key === 'ApplicantGender') {
                cy.clickEl(this.loc.dropdownGender)
                cy.get(`[data-tag="${key}"]`).find('input').first().type(`${formData[key]}`)
            }
            else if (key === "ApplicantCurrentAddress") {
                                if (formData[key]["Manual"] === true) {
                    this.selectManualAddressEntry()
                    formData[key]["Address"] == '' || !formData[key]["Address"] ? cy.get(this.loc.inputCurrentAddress).eq(0).clear() : cy.get(this.loc.inputCurrentAddress).eq(0).type(formData[key]["Address"]);
                    formData[key]["Suburb"] == '' || !formData[key]["Suburb"] ? cy.get(this.loc.inputCurrentAddress).eq(1).clear() : cy.get(this.loc.inputCurrentAddress).eq(1).type(formData[key]["Suburb"]);
                    formData[key]["Post_Code"] == '' || !formData[key]["Post_Code"] ? cy.get(this.loc.inputCurrentAddress).eq(2).clear() : cy.get(this.loc.inputCurrentAddress).eq(2).type(formData[key]["Post_Code"]);
                    formData[key]["Country"] ? cy.dropdownSelect('Please select a country', formData[key]["Country"]) : cy.log("Test");
                    formData[key]["State"] ? cy.dropdownSelect('Please select a state', formData[key]["State"]) : cy.log("Test");
                } else {
                    cy.get(this.loc.inputCurrentAddress).type(formData[key]["Address"]);
                    cy.dropdownSelect('Please, start typing an address...', formData[key]["Address"]);
                }
            } else {
                cy.get(`[data-tag="${key}"]`).find('input').first().type(formData[key]);
            }
        })
    };

    checkOtherApplicantForms = () => {
        cy.get(this.loc.applicantDetailForm).should('have.length', 4);
        cy.get(this.loc.addNewOtherApplicants).should('not.exist');
    };

    addNewOtherApplicant = () => {
        cy.get(this.loc.addNewOtherApplicants).last().click();
    }

    checkErrorMsg = (container = "div", child, errormsg) => {
        cy.get(container).find(child).should("be.visible").contains(errormsg);
    
    }

    nextDidNotProceed = () => {
        cy.shouldNotExist(this.loc.pleaseReadTheBelowConsentStatement)
    }
};
module.exports = new NewAssessmentPage(); 
