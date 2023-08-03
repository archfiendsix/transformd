import eqfCustomers from '../../fixtures/equifax-customer.json'
import { aliasQuery, aliasMutation } from '../../utils/graphql-test-utils'
import { nanoid, customAlphabet } from 'nanoid'

const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
const nanoidCustom = customAlphabet(alphabet, 10)
	const un = Cypress.env('usernameBroker')
	const pw = Cypress.env('passwordBroker')


describe("Filter Assessments", () => {
	beforeEach(() => {
		cy.login(un, pw)
		cy.intercept('POST', `${Cypress.env("internalAPIBaseURL")}/address/search/query`).as(
			'getAddress')
		cy.intercept('POST', `${Cypress.env("internalAPIBaseURL")}/graphql`, (req) => {
			aliasQuery(req, 'getForm')
			aliasMutation(req, 'SetSubmissionValues')
		})
	})

	it('Should be able to filter assessments by name', () => {
		cy.intercept('POST', `/widget/api/submission-data?widgetPolicyId=*`, (req) => {}).as('getAssessments')
		cy.intercept('POST', `/widget/api/submission-count?widgetPolicyId=*`, (req) => {}).as('getAssessmentCount')
		cy.visit('/')
		const firstName = nanoidCustom()
		cy.createAssessment({ ...eqfCustomers[11],["FIRST NAME"]: firstName, mobileNumber: '0400000000' })
		cy.get('label').contains('Applicant SMS Sent').should('exist')
    cy.visit('/')
    cy.get('button').contains('NEW ASSESSMENT').should('exist')
		cy.wait('@getAssessmentCount')
		cy.wait('@getAssessments')
		cy.wait(10000) // after many attempts, this is the only way to make sure the assessments are loaded
		cy.get('input[placeholder="APPLICANT NAME"]').type(firstName)
		cy.wait('@getAssessments')
		cy.wait(3000) // after many attempts, this is the only way to make sure the assessments are loaded
			cy.get(".gridview__rows")
    .find(".gridview__row")
    .then((row) => {
      cy.log(row);
			expect(row.length).to.be.eq(1);
			 expect(row[0].innerText).not.to.be.eq('Records not found');
    });
	})

	it('Should be able to filter assessments by status DRAFT', () => {

	})


})
