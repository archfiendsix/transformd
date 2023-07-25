import DashboardPage from "../pages/DashboardPage";

describe('Login Page Test Suite', () => {
    beforeEach(() => {
        cy.login(Cypress.env('email'), Cypress.env('password'));
        cy.intercept('POST', '/widget/api/submission-count*').as('postSubmissionCountbeforeEach');
        cy.visit("/")
        cy.wait('@postSubmissionCountbeforeEach')
        cy.checkLoading()
    });

    it('Should apply "All" filter correctly', () => {
        cy.intercept('POST', '/widget/api/submission-data*').as('postSubmissionDataapplyFilter');
        DashboardPage.applyFilter('ALL')
        cy.wait('@postSubmissionDataapplyFilter').then((postSubmissionDataapplyFilter) => {
            DashboardPage.checkTableFetchResponseBody(postSubmissionDataapplyFilter);
        });
    })
    it('Should apply "DRAFTS" filter correctly', () => {
        cy.intercept('POST', '/widget/api/submission-data*').as('postSubmissionDataapplyFilter');
        DashboardPage.applyFilter('DRAFTS')
        cy.wait('@postSubmissionDataapplyFilter').then((postSubmissionDataapplyFilter) => {
            DashboardPage.checkTableFetchResponseBody(postSubmissionDataapplyFilter);
        });
        DashboardPage.checkTableColumns(7, 'Draft')
    })
    it('Should apply "WITH CUSTOMER" filter correctly', () => {
        cy.intercept('POST', '/widget/api/submission-data*').as('postSubmissionDataapplyFilter');
        DashboardPage.applyFilter('WITH CUSTOMER')
        cy.wait('@postSubmissionDataapplyFilter').then((postSubmissionDataapplyFilter) => {
            DashboardPage.checkTableFetchResponseBody(postSubmissionDataapplyFilter);
        });
        DashboardPage.checkTableColumns(7, 'With Customer')
    })
    it('Should apply "READY FOR REVIEW" filter correctly', () => {
        cy.intercept('POST', '/widget/api/submission-data*').as('postSubmissionDataapplyFilter');
        DashboardPage.applyFilter('READY FOR REVIEW')
        cy.wait('@postSubmissionDataapplyFilter').then((postSubmissionDataapplyFilter) => {
            DashboardPage.checkTableFetchResponseBody(postSubmissionDataapplyFilter);
        });
        DashboardPage.checkTableColumns(7, 'Ready for Review')
    })
    it('Should apply "REVIEWED" filter correctly', () => {
        cy.intercept('POST', '/widget/api/submission-data*').as('postSubmissionDataapplyFilter');
        DashboardPage.applyFilter('REVIEWED')
        cy.wait('@postSubmissionDataapplyFilter').then((postSubmissionDataapplyFilter) => {
            DashboardPage.checkTableFetchResponseBody(postSubmissionDataapplyFilter);
        });
        DashboardPage.checkTableColumns(7, 'Reviewed')
    })

    it("Should properly search by Application ID", () => {
        cy.intercept('POST', '/widget/api/submission-data*').as('postSubmissionDataapplyFilter');
        DashboardPage.applicationSearch('APPLICATION ID', 'TRF-QMNJ817IO')
        cy.wait('@postSubmissionDataapplyFilter').then((postSubmissionDataapplyFilter) => {
            DashboardPage.checkTableFetchResponseBody(postSubmissionDataapplyFilter);
        });
        DashboardPage.checkTableColumns(1, 'TRF-QMNJ817IO')
    })

    it('Should properly search by "Last Update"', () => {
        const dates = {
            start_date: {
                day: '1',
                month: "July",
                year: "2023"
            },
            end_date: {
                day: '24',
                month: "July",
                year: "2023"
            }
        }
        cy.intercept('POST', '/widget/api/submission-data*').as('postSubmissionDatachangeDate');
        DashboardPage.changeDate(dates)
        cy.wait('@postSubmissionDatachangeDate').then((postSubmissionDatachangeDate) => {
            
            DashboardPage.checkTableFetchResponseBody(postSubmissionDatachangeDate);
        });

    })
   
    it("Should properly search by Application Name", () => {
        DashboardPage.applicationSearch('APPLICANT NAME', 'ronald laifoo')
        DashboardPage.checkTableColumns(col_index=2, 'ronald laifoo')
    })
    it("Should properly search by Application Status", () => {
        DashboardPage.applicationSearch('INFORMATION STATUS', 'Draft')
        DashboardPage.checkTableColumns(col_index=7, 'Draft')
        DashboardPage.applicationSearch('INFORMATION STATUS', 'With Customer')
        DashboardPage.checkTableColumns(col_index=7, 'With Customer')
        DashboardPage.applicationSearch('INFORMATION STATUS', 'Ready for review')
        DashboardPage.checkTableColumns(col_index=7, 'Ready for review')
        DashboardPage.applicationSearch('INFORMATION STATUS', 'Reviewed')
        DashboardPage.checkTableColumns(col_index=7, 'Reviewed')
    })
    it("Should show card list", () => {

        DashboardPage.elements.cardlist.card_count('DRAFTS').should('be.visible').invoke('text').then(text => {
            cy.log(text)
        })

    })
    it.only('Should sort table column according to Application Id', () => {
        cy.intercept('POST', '/widget/api/submission-data*').as('postSubmissionDatasortColumn')
            DashboardPage.sortColumn('APPLICATION', 'desc')
        cy.wait('@postSubmissionDatasortColumn').then((postSubmissionDatasortColumn) => {
            DashboardPage.checkTableFetchResponseBody(postSubmissionDatasortColumn);
        });

        cy.intercept('POST', '/widget/api/submission-data*').as('postSubmissionDatasortColumn')
            DashboardPage.sortColumn('APPLICATION', 'asc')
        cy.wait('@postSubmissionDatasortColumn').then((postSubmissionDatasortColumn) => {
            DashboardPage.checkTableFetchResponseBody(postSubmissionDatasortColumn);
        });
        
    })

    it('Should sort table column according to Application Name', () => {
        cy.intercept('POST', '/widget/api/submission-data*').as('postSubmissionDatasortColumn')
        DashboardPage.sortColumn('APPLICANT NAME(S)', 'asc')
        cy.wait('@postSubmissionDatasortColumn').then((postSubmissionDatasortColumn) => {
            DashboardPage.checkTableFetchResponseBody(postSubmissionDatasortColumn);
        })

        cy.intercept('POST', '/widget/api/submission-data*').as('postSubmissionDatasortColumn')
        DashboardPage.sortColumn('APPLICANT NAME(S)', 'desc')
        cy.wait('@postSubmissionDatasortColumn').then((postSubmissionDatasortColumn) => {
            DashboardPage.checkTableFetchResponseBody(postSubmissionDatasortColumn);
        })
    })

    it('Should sort table column according to "Last Updated"', () => {

        cy.intercept('POST', '/widget/api/submission-data*').as('postSubmissionDatasortColumn');
        DashboardPage.sortColumn('LAST UPDATED', 'asc')
        cy.wait('@postSubmissionDatasortColumn').then((postSubmissionDatasortColumn) => {
            DashboardPage.checkTableFetchResponseBody(postSubmissionDatasortColumn);
        });

        cy.intercept('POST', '/widget/api/submission-data*').as('postSubmissionDatasortColumn');
        DashboardPage.sortColumn('LAST UPDATED', 'desc')
        cy.wait('@postSubmissionDatasortColumn').then((postSubmissionDatasortColumn) => {
            DashboardPage.checkTableFetchResponseBody(postSubmissionDatasortColumn);
        });
        
    })

    it('Should sort table column according to Status', () => {
        cy.intercept('POST', '/widget/api/submission-data*').as('postSubmissionDatasortColumn');
        DashboardPage.sortColumn('Status', 'asc')
        cy.wait('@postSubmissionDatasortColumn').then((postSubmissionDatasortColumn) => {
            DashboardPage.checkTableFetchResponseBody(postSubmissionDatasortColumn);
        });

        cy.intercept('POST', '/widget/api/submission-data*').as('postSubmissionDatasortColumn');
        DashboardPage.sortColumn('Status', 'desc')
        cy.wait('@postSubmissionDatasortColumn').then((postSubmissionDatasortColumn) => {
            DashboardPage.checkTableFetchResponseBody(postSubmissionDatasortColumn);
        });
    })

    it('Should change pagination right arrow click', () => {
        cy.intercept('POST', '/widget/api/submission-data*').as('postSubmissionDatarightPaginationClick');
        DashboardPage.rightPaginationClick()
        cy.wait('@postSubmissionDatarightPaginationClick').then((postSubmissionDatarightPaginationClick) => {
            DashboardPage.checkTableFetchResponseBody(postSubmissionDatarightPaginationClick);
        });

        cy.intercept('POST', '/widget/api/submission-data*').as('postSubmissionDatarightPaginationClick');
        DashboardPage.rightPaginationClick()
        cy.wait('@postSubmissionDatarightPaginationClick').then((postSubmissionDatarightPaginationClick) => {
            DashboardPage.checkTableFetchResponseBody(postSubmissionDatarightPaginationClick);
        });
        
    })

    it('Should change pagination left arrow click', () => {
        DashboardPage.rightPaginationClick()
        cy.intercept('POST', '/widget/api/submission-data*').as('postSubmissionDataleftPaginationClick');
        DashboardPage.rightPaginationClick()
        cy.wait('@postSubmissionDataleftPaginationClick').then(postSubmissionDataleftPaginationClick => {
            DashboardPage.checkTableFetchResponseBody(postSubmissionDataleftPaginationClick);
        });
        
    })
    it('Should change displayed table rows upon selecting per page value', () => {
        cy.intercept('POST', '/widget/api/submission-data*').as('postSubmissionDatachangePerPage');
            DashboardPage.changePerPage('100')
        cy.wait('@postSubmissionDatachangePerPage').then((postSubmissionDatachangePerPage) => {
            DashboardPage.checkTableFetchResponseBody(postSubmissionDatachangePerPage);
            DashboardPage.checkTableRowCount(100)
        });

        cy.intercept('POST', '/widget/api/submission-data*').as('postSubmissionDatachangePerPage');
            DashboardPage.changePerPage('25')
        cy.wait('@postSubmissionDatachangePerPage').then((postSubmissionDatachangePerPage) => {
            DashboardPage.checkTableFetchResponseBody(postSubmissionDatachangePerPage);
            DashboardPage.checkTableRowCount(25)
        });
        
        cy.intercept('POST', '/widget/api/submission-data*').as('postSubmissionDatachangePerPage');
            DashboardPage.changePerPage('50')
        cy.wait('@postSubmissionDatachangePerPage').then((postSubmissionDatachangePerPage) => {
            DashboardPage.checkTableFetchResponseBody(postSubmissionDatachangePerPage);
            DashboardPage.checkTableRowCount(50)
        });
    })
   
});