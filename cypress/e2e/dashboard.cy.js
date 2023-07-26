import DashboardPage from "../pages/DashboardPage";

describe('Dashboard Test Suite', () => {
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
        cy.wait('@postSubmissionData').then(postSubmissionData => {
            DashboardPage.elements.cardlist.card_count('DRAFTS').should('be.visible')
            DashboardPage.elements.cardlist.card_count('WITH CUSTOMER').should('be.visible')
            DashboardPage.elements.cardlist.card_count('READY FOR REVIEW').should('be.visible')
            DashboardPage.elements.cardlist.card_count('REVIEWED').should('be.visible')
            DashboardPage.checkTotalCardCount(postSubmissionData)
        })
    })

    it('Should apply "All" filter correctly', () => {
        cy.intercept('POST', '/widget/api/submission-data*').as('postSubmissionDataapplyFilter');
        DashboardPage.applyFilter('ALL')
        cy.wait('@postSubmissionDataapplyFilter').then((postSubmissionDataapplyFilter) => {
            DashboardPage.checkTableFetchResponseBody(postSubmissionDataapplyFilter);
            DashboardPage.checkTotalCardCount(postSubmissionDataapplyFilter)
        });
    })
    it('Should apply "DRAFTS" filter correctly', () => {
        cy.intercept('POST', '/widget/api/submission-data*').as('postSubmissionDataapplyFilter');
        DashboardPage.applyFilter('DRAFTS')
        cy.wait('@postSubmissionDataapplyFilter').then((postSubmissionDataapplyFilter) => {
            DashboardPage.checkTableFetchResponseBody(postSubmissionDataapplyFilter);
            DashboardPage.checkTableColumns(postSubmissionDataapplyFilter, 7, 'Draft')
        });

    })
    it('Should apply "WITH CUSTOMER" filter correctly', () => {
        cy.intercept('POST', '/widget/api/submission-data*').as('postSubmissionDataapplyFilter');
        DashboardPage.applyFilter('WITH CUSTOMER')
        cy.wait('@postSubmissionDataapplyFilter').then((postSubmissionDataapplyFilter) => {
            DashboardPage.checkTableFetchResponseBody(postSubmissionDataapplyFilter);
            DashboardPage.checkTableColumns(postSubmissionDataapplyFilter, 7, 'With Customer')
        });

    })
    it('Should apply "READY FOR REVIEW" filter correctly', () => {
        cy.intercept('POST', '/widget/api/submission-data*').as('postSubmissionDataapplyFilter');
        DashboardPage.applyFilter('READY FOR REVIEW')
        cy.wait('@postSubmissionDataapplyFilter').then((postSubmissionDataapplyFilter) => {
            DashboardPage.checkTableFetchResponseBody(postSubmissionDataapplyFilter);
            DashboardPage.checkTableColumns(postSubmissionDataapplyFilter, 7, 'Ready for Review')
        });

    })
    it('Should apply "REVIEWED" filter correctly', () => {
        cy.intercept('POST', '/widget/api/submission-data*').as('postSubmissionDataapplyFilter');
        DashboardPage.applyFilter('REVIEWED')
        cy.wait('@postSubmissionDataapplyFilter').then((postSubmissionDataapplyFilter) => {
            DashboardPage.checkTableFetchResponseBody(postSubmissionDataapplyFilter);
            DashboardPage.checkTableColumns(postSubmissionDataapplyFilter, 7, 'Reviewed')
        });

    })

    it("Should properly search by Application ID", () => {
        cy.intercept('POST', '/widget/api/submission-data*').as('postSubmissionDataapplicationSearch');
        DashboardPage.applicationSearch('APPLICATION ID', 'TRF-QMNJ817IO')
        cy.wait('@postSubmissionDataapplicationSearch').then((postSubmissionDataapplicationSearch) => {
            DashboardPage.checkTableFetchResponseBody(postSubmissionDataapplicationSearch);
            DashboardPage.checkTableColumns(postSubmissionDataapplicationSearch, 1, 'TRF-QMNJ817IO')
        });

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
        DashboardPage.changeDate(dates)
        cy.intercept('POST', '/widget/api/submission-data*').as('postSubmissionDatachangeDate');
        DashboardPage.elements.applicationsTable.calendarButton('Close').click()

        cy.wait('@postSubmissionDatachangeDate').then((postSubmissionDatachangeDate) => {
            DashboardPage.checkTableFetchResponseBody(postSubmissionDatachangeDate);
        });

    })

    it("Should properly search by Application Name", () => {
        cy.intercept('POST', '/widget/api/submission-data*').as('postSubmissionDataapplicationSearch');
        DashboardPage.applicationSearch('APPLICANT NAME', 'RONALD LAIFOO, Ute GIERINGER')
        cy.wait('@postSubmissionDataapplicationSearch').then((postSubmissionDataapplicationSearch) => {
            DashboardPage.checkTableColumns(postSubmissionDataapplicationSearch, 2, 'RONALD LAIFOO, Ute GIERINGER')
        })
    })
    it("Should properly search by Application Status", () => {
        cy.intercept('POST', '/widget/api/submission-data*').as('postSubmissionDataapplicationSearch');
        DashboardPage.applicationSearch('INFORMATION STATUS', 'Draft')
        cy.wait('@postSubmissionDataapplicationSearch').then((postSubmissionDataapplicationSearch) => {
            DashboardPage.checkTableColumns(postSubmissionDataapplicationSearch, 7, 'Draft')
        })

        cy.intercept('POST', '/widget/api/submission-data*').as('postSubmissionDataapplicationSearch');
        DashboardPage.applicationSearch('INFORMATION STATUS', 'With Customer')
        cy.wait('@postSubmissionDataapplicationSearch').then((postSubmissionDataapplicationSearch) => {
            DashboardPage.checkTableColumns(postSubmissionDataapplicationSearch, 7, 'With Customer')
        })

        cy.intercept('POST', '/widget/api/submission-data*').as('postSubmissionDataapplicationSearch');
        DashboardPage.applicationSearch('INFORMATION STATUS', 'Ready for review')
        cy.wait('@postSubmissionDataapplicationSearch').then((postSubmissionDataapplicationSearch) => {
            DashboardPage.checkTableColumns(postSubmissionDataapplicationSearch, 7, 'Ready for review')
        })
    })
    it("Should change current page correctly using footer page input (Currently the number input is buggy)", () => {
        // Current Page input box currently unstable skipping this for now
        cy.intercept('POST', '/widget/api/submission-data*').as('postSubmissionDatachangeCurrentPage')
        DashboardPage.changeCurrentPage(10)
        DashboardPage.nextPaginationClick()
        cy.wait('@postSubmissionDatachangeCurrentPage').then((postSubmissionDatachangeCurrentPage) => {
            DashboardPage.reviewCurrentPage(postSubmissionDatachangeCurrentPage);
        });

    })
    it('Should sort table column according to Application Id', () => {
        const header_title = 'APPLICATION'
        /* Descending order test*/
        cy.intercept('POST', '/widget/api/submission-data*').as('postSubmissionDatasortColumn')
        // DashboardPage.sortColumn('APPLICATION', 'desc')
        DashboardPage.elements.applicationsTable.header_columns(header_title).parent().find('i.up').click()
        cy.wait('@postSubmissionDatasortColumn').then((postSubmissionDatasortColumn) => {
            DashboardPage.elements.applicationsTable.header_columns(header_title).parent().find('i.up').should('have.class', 'active')
            DashboardPage.elements.applicationsTable.header_columns(header_title).parent().find('i.down').should('not.have.class', 'active')
            DashboardPage.checkTableFetchResponseBody(postSubmissionDatasortColumn);
        });

        /* Ascending order test*/
        cy.intercept('POST', '/widget/api/submission-data*').as('postSubmissionDatasortColumn')
        // DashboardPage.sortColumn('APPLICATION', 'asc')
        DashboardPage.elements.applicationsTable.header_columns(header_title).parent().find('i.down').click()
        cy.wait('@postSubmissionDatasortColumn').then((postSubmissionDatasortColumn) => {
            DashboardPage.elements.applicationsTable.header_columns(header_title).parent().find('i.down').should('have.class', 'active')
            DashboardPage.elements.applicationsTable.header_columns(header_title).parent().find('i.up').should('not.have.class', 'active')
            DashboardPage.checkTableFetchResponseBody(postSubmissionDatasortColumn);
        });



    })

    it.only('Should sort table column according to Application Name', () => {
        const header_title = 'APPLICANT NAME(S)'

        /* Descending order test*/
        cy.intercept('POST', '/widget/api/submission-data*').as('postSubmissionDatasortColumn')
        // DashboardPage.sortColumn('APPLICATION', 'desc')
        DashboardPage.elements.applicationsTable.header_columns(header_title).parent().find('i.up').click()
        cy.wait('@postSubmissionDatasortColumn').then((postSubmissionDatasortColumn) => {
            DashboardPage.elements.applicationsTable.header_columns(header_title).parent().find('i.up').should('have.class', 'active')
            DashboardPage.elements.applicationsTable.header_columns(header_title).parent().find('i.down').should('not.have.class', 'active')
            DashboardPage.checkTableFetchResponseBody(postSubmissionDatasortColumn);
        });

        /* Ascending order test*/
        cy.intercept('POST', '/widget/api/submission-data*').as('postSubmissionDatasortColumn')
        // DashboardPage.sortColumn('APPLICATION', 'asc')
        DashboardPage.elements.applicationsTable.header_columns(header_title).parent().find('i.down').click()
        cy.wait('@postSubmissionDatasortColumn').then((postSubmissionDatasortColumn) => {
            DashboardPage.elements.applicationsTable.header_columns(header_title).parent().find('i.down').should('have.class', 'active')
            DashboardPage.elements.applicationsTable.header_columns(header_title).parent().find('i.up').should('not.have.class', 'active')
            DashboardPage.checkTableFetchResponseBody(postSubmissionDatasortColumn);
        });






    })

    it('Should sort table column according to "Last Updated"', () => {

        const header_title = 'LAST UPDATED'
        /* Descending order test*/
        cy.intercept('POST', '/widget/api/submission-data*').as('postSubmissionDatasortColumn')
        // DashboardPage.sortColumn('APPLICATION', 'desc')
        DashboardPage.elements.applicationsTable.header_columns(header_title).parent().find('i.up').click()
        cy.wait('@postSubmissionDatasortColumn').then((postSubmissionDatasortColumn) => {
            DashboardPage.elements.applicationsTable.header_columns(header_title).parent().find('i.up').should('have.class', 'active')
            DashboardPage.elements.applicationsTable.header_columns(header_title).parent().find('i.down').should('not.have.class', 'active')
            DashboardPage.checkTableFetchResponseBody(postSubmissionDatasortColumn);
        });

        /* Ascending order test*/
        cy.intercept('POST', '/widget/api/submission-data*').as('postSubmissionDatasortColumn')
        // DashboardPage.sortColumn('APPLICATION', 'asc')
        DashboardPage.elements.applicationsTable.header_columns(header_title).parent().find('i.down').click()
        cy.wait('@postSubmissionDatasortColumn').then((postSubmissionDatasortColumn) => {
            DashboardPage.elements.applicationsTable.header_columns(header_title).parent().find('i.down').should('have.class', 'active')
            DashboardPage.elements.applicationsTable.header_columns(header_title).parent().find('i.up').should('not.have.class', 'active')
            DashboardPage.checkTableFetchResponseBody(postSubmissionDatasortColumn);
        });


    })

    it('Should sort table column according to Status', () => {
        const header_title = 'Status'
        /* Descending order test*/
        cy.intercept('POST', '/widget/api/submission-data*').as('postSubmissionDatasortColumn')
        // DashboardPage.sortColumn('APPLICATION', 'desc')
        DashboardPage.elements.applicationsTable.header_columns(header_title).parent().find('i.up').click()
        cy.wait('@postSubmissionDatasortColumn').then((postSubmissionDatasortColumn) => {
            DashboardPage.elements.applicationsTable.header_columns(header_title).parent().find('i.up').should('have.class', 'active')
            DashboardPage.elements.applicationsTable.header_columns(header_title).parent().find('i.down').should('not.have.class', 'active')
            DashboardPage.checkTableFetchResponseBody(postSubmissionDatasortColumn);
        });

        /* Ascending order test*/
        cy.intercept('POST', '/widget/api/submission-data*').as('postSubmissionDatasortColumn')
        // DashboardPage.sortColumn('APPLICATION', 'asc')
        DashboardPage.elements.applicationsTable.header_columns(header_title).parent().find('i.down').click()
        cy.wait('@postSubmissionDatasortColumn').then((postSubmissionDatasortColumn) => {
            DashboardPage.elements.applicationsTable.header_columns(header_title).parent().find('i.down').should('have.class', 'active')
            DashboardPage.elements.applicationsTable.header_columns(header_title).parent().find('i.up').should('not.have.class', 'active')
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
    it('Should change displayed table rows upon selecting 100 items per page value', () => {
        cy.intercept('POST', '/widget/api/submission-data*').as('postSubmissionDatachangePerPage');
        DashboardPage.changePerPage('100')
        cy.wait('@postSubmissionDatachangePerPage').then((postSubmissionDatachangePerPage) => {
            DashboardPage.checkTableFetchResponseBody(postSubmissionDatachangePerPage);
            DashboardPage.checkTableRowCount(100)
        });


    })

    it('Should change displayed table rows upon selecting 50 items per page value', () => {
        cy.intercept('POST', '/widget/api/submission-data*').as('postSubmissionDatachangePerPage');
        DashboardPage.changePerPage('50')
        cy.wait('@postSubmissionDatachangePerPage').then((postSubmissionDatachangePerPage) => {
            DashboardPage.checkTableFetchResponseBody(postSubmissionDatachangePerPage);
            DashboardPage.checkTableRowCount(50)
        });
    })

});