import DashboardPage from "../pages/DashboardPage";

describe('Login Page Test Suite', () => {
    beforeEach(() => {
        cy.login(Cypress.env('email'), Cypress.env('password'));
        cy.intercept('POST', '/widget/api/submission-count*').as('postCardCount');
        cy.visit("/")
        cy.wait('@postCardCount')
        cy.checkLoading()
    });

    it('Should apply "All" filter correctly', () => {
        DashboardPage.applyFilter('ALL')
    })
    it('Should apply "DRAFTS" filter correctly', () => {
        DashboardPage.applyFilter('ALL')
    })
    it('Should apply "WITH CUSTOMER" filter correctly', () => {
        DashboardPage.applyFilter('WITH CUSTOMER')
    })
    it('Should apply "READY FOR REVIEW" filter correctly', () => {
        DashboardPage.applyFilter('READY FOR REVIEW')
    })
    it('Should apply "REVIEWED" filter correctly', () => {
        DashboardPage.applyFilter('REVIEWED')
    })

    it("Should properly search by Application ID",()=> {
        DashboardPage.applicationSearch('APPLICATION ID','TRF-QMNJ817IO')
    })
    it.only("Should properly search by Application Name",()=> {
        DashboardPage.applicationSearch('APPLICANT NAME','ronald laifoo')
    })
    it("Should properly search by Application Status",()=> {
        DashboardPage.applicationSearch('APPLICANT NAME','ronald laifoo')
    })
    it("Should show card list",()=> {
        
        DashboardPage.elements.cardlist.card_count('DRAFTS').should('be.visible').invoke('text').then(text=> {
            cy.log(text)
        })
        
    })
});