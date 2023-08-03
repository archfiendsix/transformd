import eqfCustomers from '../../fixtures/equifax-customer.json'
import { aliasQuery, aliasMutation } from '../../utils/graphql-test-utils'
import { nanoid, customAlphabet } from 'nanoid'

const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
const nanoidCustom = customAlphabet(alphabet, 5)
	const un = Cypress.env('usernameBroker')
	const pw = Cypress.env('passwordBroker')
describe("Create Assessment", () => {
	beforeEach(() => {
		cy.login(un, pw)
		cy.intercept('POST', `${Cypress.env("internalAPIBaseURL")}/address/search/query`).as(
			'getAddress')
		cy.intercept('POST', `${Cypress.env("internalAPIBaseURL")}/graphql`, (req) => {
			aliasQuery(req, 'getForm')
			aliasMutation(req, 'SetSubmissionValues')
		})
	})


	it('Should be able to create an assessment for a single applicant', () => {
		cy.visit('/')
		cy.createAssessment({ ...eqfCustomers[11], mobileNumber: '0400000000' })
		cy.get('label').contains('Applicant SMS Sent').should('exist')
	})
	it(
		'Should Not be able to move to the Next page without filling the mandatory fields',
		() => {
			cy.intercept('POST', `${Cypress.env("internalAPIBaseURL")}/address/search/query`).as(
				'getAddress')
			cy.visit('/')
			cy.get('button').contains('NEW ASSESSMENT').click()
			cy.wait('@gqlSetSubmissionValuesMutation')
			cy.getInputByMachineTag("ApplicantCurrentAddress").should('exist') // Next button appears before the conditional logic is applied
			cy.get('button').contains('Next').click()
			cy.get('.formatic-error-message').contains('This field is required').should('exist')
			cy.get('div[data-tag="consentConfirm"]').should('not.exist')

		})

	it(
		'Should Not be able to complete the assessment without consenting',
		() => {
			cy.visit('/')
			cy.get('button').contains('NEW ASSESSMENT').click()
			cy.wait('@gqlSetSubmissionValuesMutation')
			cy.createAssesmentFillFirstPage({ ...eqfCustomers[11], mobileNumber: '0400000000' })
			cy.get('button').contains('Next').click()
			cy.get('div[data-tag="consentConfirm"]').should('exist')
			cy.get('button').contains('Send Assessments').click()
			cy.get('label').contains('Applicant SMS Sent').should('not.exist')
			cy.get('div[data-tag="consentConfirm"]').contains('This field is required').should('exist')
		})
	it('Should be able to add up to 4 joint applicants  ', function () {
		cy.visit('/')
		cy.get('button').contains('NEW ASSESSMENT').click()
		cy.wait('@gqlSetSubmissionValuesMutation')
		cy.get('button').contains('Add an other').as('addAnotherButton')
		cy.get('@addAnotherButton').should('exist')
		Array.from(Array(3)).forEach(() => {
			cy.get('@addAnotherButton').click()
		})

		cy.get('form').find('h2').should("have.length", 4)
	})
	it('Should Not be able to add up to 4 joint applicants  ', function () {
		cy.visit('/')
		cy.get('button').contains('NEW ASSESSMENT').click()
		cy.wait('@gqlSetSubmissionValuesMutation')
		cy.get('button').contains('Add an other').as('addAnotherButton')
		cy.get('@addAnotherButton').should('exist')
		Array.from(Array(3)).forEach(() => {
			cy.get('@addAnotherButton').click()
		})
		cy.get('form').find('h2').should("have.length", 4)
		cy.get('button').contains('Add an other').should('not.exist')
	})

	it('Should be able to get an SMS  ', function () {
		const firstName = nanoidCustom()
		cy.visit('/')
		cy.createAssessment({
			...eqfCustomers[11],
			["FIRST NAME"]: firstName,
			mobileNumber: '0482090581'
		})
		cy.mailslurp()
		// use inbox id and a timeout of 30 seconds
		.then( mailslurp => {
			cy.log(mailslurp)
			// return mailslurp.waitController.waitForLatestSms({
			// 		waitForSingleSmsOptions: {
			// 			phoneNumberId: '5df3315b-0645-44a1-b80a-10e03af9ac7b',
			// 			timeout: 50000,
			// 			unreadOnly: true,
			// 		},
			// 	}
			// )
		})
		// .then((sms) => {

		// 	console.log(sms.body)
		// 	expect(sms.body.includes(firstName)).to.be.true


		// 	const url = sms.body.match(/(http|https):\/\/[^ "']+/)[0];
		// 	cy.visit(url, {
		// 		onBeforeLoad: (win) => {
		// 			Object.defineProperty(win.navigator, "userAgent", {
		// 				value:
		// 					"Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1"
		// 			});
		// 		}
		// 	});
		// 	cy.get('div[data-tag="incompleteText"]').contains(firstName).should('exist')


		// })
	});
})
