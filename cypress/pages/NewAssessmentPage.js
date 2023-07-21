class NewAssessmentPage {
    elements = {
        btn_newAssessment: () => cy.get("button[class='btn btn--primary btn--square w-100']"),
        h1_newApplication: () => cy.get("div[class='page page__edit'] h1"),
        h2_applicantDetails: () => cy.get("h2[class='formatic-heading']"),
        input_text: () => cy.get("input[class='formatic-text__input']"),
        inputFirstName: () => cy.get("[data-tag='ApplicantFirstName'] input"),
        inputLastName: () => cy.get("[data-tag='ApplicantLastName'] input"),
        inputMiddleName: () => cy.get("[data-tag='ApplicantMiddleName'] input"),
        inputDateOfBirth: () => cy.get("[data-tag='ApplicantDateOfBirth'] input.formatic-date-picker__date-picker"),
        dropdownGender: () => cy.get("div[class='formatic-dropdown__select ant-select ant-select-enabled'] div[class='ant-select-selection__placeholder']"),
        inputGender: () => cy.get("[data-tag='ApplicantGender'] input"),
        inputMobileNumber: () => cy.get("[data-tag='ApplicantMobileNumber'] input"),
        inputDriversLicenceNumber: () => cy.get("[data-tag='ApplicantDriversLicenceNumber'] input"),
        selectManualAddressEntry: () => {
            cy.get("button[class='formatic-address-lookup__button-enter-manually']")
        },
        inputCurrentAddress: () => cy.get("[data-tag='ApplicantCurrentAddress'] input"),
        inputPreviousAddress: () => cy.get("[data-tag='ApplicantPreviousAddress'] input"),
        inputLoanAmount: () => cy.get("[data-tag='loanAmount'] input"),
        inputApplicantEmployer: () => cy.get("[data-tag='ApplicantEmployer'] input"),
        btnNext: () => cy.get("button[class='formatic-button formatic-action-bar-root__next']"),
        checkAgreement: () => cy.get("input[label='I have read and agree to the consent statement above']"),
        btnSendAssessment: () => cy.get("[data-tag='sendAssessments'] button"),
        addNewOtherApplicants: () => cy.get('button[class="formatic-repeatable__add-repeatable-button"]'),
        applicantDetailForm: () => cy.get('[data-tag="ApplicantDetails"] .formatic-repetition-transition--add'),

        errormsg: () => cy.get('.formatic-error-message'),
        consentConfirmErrorMsg: () => cy.get('[data-tag="consentConfirm"] .formatic-error-message')
    }

    sendAssessment = () => {
        this.elements.checkAgreement().check({ force: true });
        this.elements.btnSendAssessment().click()
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
        this.elements.btnNext().click();
        cy.checkLoading();
    }

    clickBtnNewAssessment = () => {
        this.elements.btn_newAssessment().should("be.visible").click();
    }

    checkRequiredFields = () => {
        //check the required fields
        this.elements.errormsg().eq(0).should("be.visible").contains("This field is required");
        this.elements.errormsg().eq(1).should("be.visible").contains("This field is required");
        this.elements.errormsg().eq(2).should("be.visible").contains("Please enter valid date");
        this.elements.errormsg().eq(3).should("be.visible").contains("This field is required");
        this.elements.errormsg().eq(4).should("be.visible").contains("This field is required");
        this.elements.errormsg().eq(5).should("be.visible").contains("This field is required");
        this.elements.errormsg().eq(6).should("be.visible").contains("Please select a valid address")
        this.elements.errormsg().eq(7).should("be.visible").contains("This field is required");

        this.elements.inputFirstName().should("be.visible").type("Test");
        this.clickNext()



        // cy.get('[data-tag="ApplicantFirstName"]').find('.formatic-error-message').should('not.exist');

        // this.elements.inputLastName().should("be.visible").type("Automator");
        // this.elements.btnNext().click();
        // cy.get('[data-tag="ApplicantLastName"]').find('.formatic-error-message').should('not.exist');

        // this.elements.inputDateOfBirth().type("12121997");
        // this.elements.btnNext().click();
        // cy.get('[data-tag="ApplicantDateOfBirth"]').find('.formatic-error-message').should('not.exist');

        // this.elements.dropdownGender().click();
        // this.elements.inputGender().type(`${"Male"}{enter}`);
        // this.elements.btnNext().click();
        // cy.get('[data-tag="ApplicantGender"]').find('.formatic-error-message').should('not.exist');

        // this.elements.inputMobileNumber().type("0431295336");
        // this.elements.btnNext().click();
        // cy.get('[data-tag="ApplicantMobileNumber"]').find('.formatic-error-message').should('not.exist');

        // this.elements.inputDriversLicenceNumber().type("2507MI");
        // this.elements.btnNext().click();
        // cy.get('[data-tag="ApplicantDriversLicenceNumber"]').find('.formatic-error-message').should('not.exist');

        // this.elements.inputCurrentAddress().eq(0).type("2 AIDAN ST, DEERAGUN QLD 4818");
        // // this.elements.inputPreviousAddress().click();
        // cy.dropdownSelect('Please, start typing an address...', '2 AIDAN ST, DEERAGUN QLD 4818');
        // this.elements.btnNext().click();
        // cy.get('[data-tag="ApplicantCurrentAddress"]').find('.formatic-error-message').should('not.exist');

        // this.elements.inputLoanAmount().type("30000");
        // this.elements.btnNext().click();
        // cy.get('[data-tag="loanAmount"]').find('.formatic-error-message').should('not.exist');
    }

    sendAssessmentWithoutConsent = () => {
        this.elements.btnSendAssessment().click();
        this.elements.consentConfirmErrorMsg().should("be.visible").contains("This field is required");
    };


    fillApplication = (formData) => {
        cy.checkLoading()
        Object.keys(formData).forEach(key => {
            if (key === 'ApplicantGender') {
                this.elements.dropdownGender().click();
                cy.get(`[data-tag="${key}"]`).find('input').first().type(`${formData[key]}`)
            }
            else if (key === "ApplicantCurrentAddress") {
                if (formData[key]["Manual"] === true) {
                    this.selectManualAddressEntry()
                    formData[key]["Address"] == '' || !formData[key]["Address"] ? this.elements.inputCurrentAddress().eq(0).clear() : this.elements.inputCurrentAddress().eq(0).type(formData[key]["Address"]);
                    formData[key]["Suburb"] == '' || !formData[key]["Suburb"] ? this.elements.inputCurrentAddress().eq(1).clear() : this.elements.inputCurrentAddress().eq(1).type(formData[key]["Suburb"]);
                    formData[key]["Post_Code"] == '' || !formData[key]["Post_Code"]? this.elements.inputCurrentAddress().eq(2).clear() : this.elements.inputCurrentAddress().eq(2).type(formData[key]["Post_Code"]);
                    formData[key]["Country"] ? cy.dropdownSelect('Please select a country', formData[key]["Country"]):cy.log("TEst")
                    formData[key]["State"] ? cy.dropdownSelect('Please select a state', formData[key]["State"]):cy.log("TEst")
                }
                else {
                    this.elements.inputCurrentAddress().type(formData[key]["Address"]);
                    cy.dropdownSelect('Please, start typing an address...', formData[key]["Address"]);

                }
            }
            else {
                cy.get(`[data-tag="${key}"]`).find('input').first().type(formData[key]);
            }
        })
    };

    checkOtherApplicantForms = () => {
        this.elements.applicantDetailForm().should('have.length', 4)
        this.elements.addNewOtherApplicants().should('not.exist');
    };

    addNewOtherApplicant = () => {
        this.elements.addNewOtherApplicants().last().click();
    }

    checkErrorMsg = (container = "div", child, errormsg) => {
        cy.get(container).find(child).should("be.visible").contains(errormsg)
    }
    nextDidNotProceed=()=> {
        cy.get('[data-tag="pleaseReadTheBelowConsentStatement"] .formatic-label').contains('Please read the below consent statement').should('not.be.visible')
    }
};
module.exports = new NewAssessmentPage(); 