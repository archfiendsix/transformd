import DashboardPage from "../pages/DashboardPage";

describe('Login Page Test Suite', () => {
    beforeEach(() => {
        cy.login(Cypress.env('email'), Cypress.env('password'));
        cy.intercept('POST', '/widget/api/submission-count*').as('postSubmissionCount');
        cy.visit("/")
        cy.wait('@postSubmissionCount')
        cy.checkLoading()
    });

    it('Should apply "All" filter correctly', () => {
        DashboardPage.applyFilter('ALL')
    })
    it('Should apply "DRAFTS" filter correctly', () => {
        DashboardPage.applyFilter('DRAFTS')
        DashboardPage.checkTableColumns(7, 'Draft')
    })
    it('Should apply "WITH CUSTOMER" filter correctly', () => {
        DashboardPage.applyFilter('WITH CUSTOMER')
        DashboardPage.checkTableColumns(7, 'With Customer')
    })
    it('Should apply "READY FOR REVIEW" filter correctly', () => {
        DashboardPage.applyFilter('READY FOR REVIEW')
        // DashboardPage.checkTableColumns(7, 'With Customer')
    })
    it('Should apply "REVIEWED" filter correctly', () => {
        DashboardPage.applyFilter('REVIEWED')
        DashboardPage.checkTableColumns(7, 'Reviewed')
    })

    it.only("Should properly search by Application ID",()=> {
        DashboardPage.applicationSearch('APPLICATION ID','TRF-QMNJ817IO')
        DashboardPage.checkTableColumns(1, 'TRF-QMNJ817IO')
    })

    it("Should properly search by Last Update",()=> {
        DashboardPage.changeDate()
    })
    it("Should properly search by Update Date",()=> {
        DashboardPage.applicationSearch('LAST UPDATED','')
    })
    it("Should properly search by Application Name",()=> {
        DashboardPage.applicationSearch('APPLICANT NAME','ronald laifoo')
    })
    it("Should properly search by Application Status",()=> {
        /*
            Draft
            With Customer
            Ready for review
            Reviewed
        */
        DashboardPage.applicationSearch('INFORMATION STATUS','ronald laifoo')
    })
    it("Should show card list",()=> {
        
        DashboardPage.elements.cardlist.card_count('DRAFTS').should('be.visible').invoke('text').then(text=> {
            cy.log(text)
        })
        
    })
    it('Should sort table column according to Application Id',()=> {
        DashboardPage.sortColumn('APPLICATION','asc')
    })

    it('Should change pagination on left and right arrow click',()=> {
        DashboardPage.rightPaginationClick()
        DashboardPage.leftPaginationClick()
        
    })
    it('Should change displayed table rows upon selecting per page value',()=> {
        DashboardPage.changePerPage('100')
        DashboardPage.changePerPage('25')
        DashboardPage.changePerPage('50')
    })    
});