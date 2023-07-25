import DashboardPage from "../pages/DashboardPage";

describe('Login Page Test Suite', () => {
    beforeEach(() => {
        cy.login(Cypress.env('email'), Cypress.env('password'));
        cy.intercept('POST', '/widget/api/submission-count*').as('postSubmissionCountbeforeEach');
        cy.visit("/")
        cy.wait('@postSubmissionCountbeforeEach')
        cy.checkLoading()
    });

    it('Should load number cards correctly and with correct counts', () => {
        cy.intercept('POST', '/widget/api/submission-data*').as('postSubmissionData');
        DashboardPage.applyFilter('ALL')
        cy.wait('@postSubmissionData').then(postSubmissionData=> {
            DashboardPage.elements.cardlist.card_count('DRAFTS').should('be.visible')
            DashboardPage.elements.cardlist.card_count('WITH CUSTOMER').should('be.visible')
            DashboardPage.elements.cardlist.card_count('READY FOR REVIEW').should('be.visible')
            DashboardPage.elements.cardlist.card_count('REVIEWED').should('be.visible')
            DashboardPage.checkTotalCardCardCount(postSubmissionData)
        })
    })

    it('Should apply "All" filter correctly', () => {
        cy.intercept('POST', '/widget/api/submission-data*').as('postSubmissionDataapplyFilter');
        DashboardPage.applyFilter('ALL')
        cy.wait('@postSubmissionDataapplyFilter').then((postSubmissionDataapplyFilter) => {
            DashboardPage.checkTableFetchResponseBody(postSubmissionDataapplyFilter);
            DashboardPage.checkTotalCardCardCount(postSubmissionDataapplyFilter)
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
    it("Should change current page correctly using footer page input", () => {

        
        cy.intercept('POST', '/widget/api/submission-data*').as('postSubmissionDatachangeCurrentPage')
        // DashboardPage.changeCurrentPage(10)
        DashboardPage.nextPaginationClick()
        cy.wait('@postSubmissionDatachangeCurrentPage').then((postSubmissionDatachangeCurrentPage) => {
            DashboardPage.reviewCurrentPage(postSubmissionDatachangeCurrentPage);
        });

    })
    it('Should sort table column according to Application Id', () => {
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

    it('Should change pagination on next arrow click', () => {
        cy.intercept('POST', '/widget/api/submission-data*').as('postSubmissionDatanextPaginationClick');
        DashboardPage.nextPaginationClick()
        cy.wait('@postSubmissionDatanextPaginationClick').then((postSubmissionDatanextPaginationClick) => {
            DashboardPage.checkTableFetchResponseBody(postSubmissionDatanextPaginationClick);
        });

        cy.intercept('POST', '/widget/api/submission-data*').as('postSubmissionDatanextPaginationClick');
        DashboardPage.nextPaginationClick()
        cy.wait('@postSubmissionDatanextPaginationClick').then((postSubmissionDatanextPaginationClick) => {
            DashboardPage.checkTableFetchResponseBody(postSubmissionDatanextPaginationClick);
        });
        
    })

    it('Should change pagination on previous arrow click', () => {
        DashboardPage.nextPaginationClick()
        cy.intercept('POST', '/widget/api/submission-data*').as('postSubmissionDatapreviousPaginationClick');
        DashboardPage.nextPaginationClick()
        cy.wait('@postSubmissionDatapreviousPaginationClick').then(postSubmissionDatapreviousPaginationClick => {
            DashboardPage.checkTableFetchResponseBody(postSubmissionDatapreviousPaginationClick);
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