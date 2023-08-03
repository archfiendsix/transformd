// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//

import { aliasQuery, aliasMutation } from '../utils/graphql-test-utils'


import { MailSlurp } from "mailslurp-client";


	const un = Cypress.env('usernameBroker')
	const pw = Cypress.env('passwordBroker')
const mailSlurpApiKey = '5b7f7e6709f897df435922656c3083d1001556d862c358bc61360c3979376c58'

// if (!mailSlurpApiKey) {
// 	throw new Error(
// 		'Error no MailSlurp API Key. Please set the `CYPRESS_MAILSLURP_API_KEY` ' +
// 		'environment variable to the value of your MailSlurp API Key to use the MailSlurp Cypress plugin. ' +
// 		'Create a free account at https://app.mailslurp.com/sign-up/. See https://docs.cypress.io/guides/guides/environment-variables#Option-3-CYPRESS_ for more information.'
// 	);
// }


const mailslurp = new MailSlurp({ apiKey:mailSlurpApiKey, basePath: 'https://cypress.api.mailslurp.com' });
Cypress.Commands.add('mailslurp', () => {
	cy.log(mailslurp)
	return Promise.resolve(mailslurp);
},{timeout: 50000});


Cypress.Commands.add('getInputByMachineTag', (machineTag,...args) => {
	return cy.get(`div[data-tag="${machineTag}"]`,...args).find('input')
})


Cypress.Commands.add('getInputByLabel', (label) => {
	return cy
	.contains('label', label)
	.invoke('attr', 'for')
	.then((id) => {
		cy.get('#' + id)
	})
})

Cypress.Commands.add('login', (username, password) => {
	cy.session(
		username,
		() => {
			cy.visit('/')
			cy.get('input[name="LoginForm[email]"]').type(username) // your email
			cy.get('input[name="LoginForm[password]"]').type(password) // your password
			cy.get('button[name="login-button"]').click()

		},
		{
			validate: () => {
				cy.getCookie('PHPSESSID').should('exist')
			},
		}
	)
})

Cypress.Commands.add('createAssesmentFillFirstPage', (applicant) => {
		const address = applicant["STREET NO"] + ' ' + applicant["STREET NAME"] + ' ' + applicant["STREET TYPE"] + ',' + applicant["SUBURB"] + ' ' + applicant["STATE"] + ' ' + applicant["POST CODE"]
	cy.intercept('POST', `${Cypress.env("internalAPIBaseURL")}/address/search/query`).as(
			'getAddress')
	cy.getInputByMachineTag("ApplicantFirstName").type(applicant["FIRST NAME"])
		cy.getInputByMachineTag("ApplicantMiddleName").type(applicant["MIDDLE NAME"])
		cy.getInputByMachineTag("ApplicantLastName").type(applicant["SURNAME"])
		cy.get('div[data-tag="ApplicantDateOfBirth"]').find('input[placeholder="DD/MM/YYYY"]').type(
			applicant["DOB"])
		cy.get('div[data-tag="ApplicantGender"]').find('.ant-select-search__field')
		.type(applicant["GENDER"] === 'M' ? 'Male' : 'Female', { force: true })
		cy.getInputByMachineTag("ApplicantMobileNumber").type(applicant.mobileNumber || '0482090581')
		cy.getInputByMachineTag("ApplicantDriversLicenceNumber").type(applicant["DL"][0])
		cy.getInputByMachineTag("ApplicantCurrentAddress")
		.type(`${address}` + '{enter}')
		cy.wait('@getAddress')
		cy.getInputByMachineTag("ApplicantCurrentAddress")
		.click().type('{enter}')
		cy.getInputByMachineTag("loanAmount").type('5000')
})

Cypress.Commands.add('createAssessment', (applicant) => {

	cy.intercept('POST', `${Cypress.env("internalAPIBaseURL")}/graphql`, (req) => {
			aliasQuery(req, 'getForm')
			aliasMutation(req, 'SetSubmissionValues')
		})


		cy.get('button').contains('NEW ASSESSMENT').click()
		cy.wait('@gqlSetSubmissionValuesMutation')

cy.createAssesmentFillFirstPage(applicant)
		cy.get('button').contains('Next').click()
		cy.getInputByMachineTag("consentConfirm").check({ force: true })
		cy.get('button').contains('Send Assessments').click()

})



