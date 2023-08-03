describe('Authentication', () => {
	const un = Cypress.env('usernameBroker')
	const pw = Cypress.env('passwordBroker')
	it('Should be able to login with correct username and password combination', () => {
		cy.visit('/')
		cy.get('input[name="LoginForm[email]"]').type(un)
		cy.get('input[name="LoginForm[password]"]').type(pw)
		cy.get('button[name="login-button"]').click()
		cy.get('.equifax__layout').contains('Log Out').should('exist')
	})
	it('Should NOT be able to login with incorrect username and password combination', () => {
		cy.visit('/')
		cy.get('input[name="LoginForm[email]"]').type(un)
		cy.get('input[name="LoginForm[password]"]').type('password')
		cy.get('button[name="login-button"]').click()
		cy.get('.help-block').contains('Incorrect email/username or password.').should('exist')
	})
})
