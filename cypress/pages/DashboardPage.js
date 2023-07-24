class DashboardPage {
    locators = {

    }
    elements = {
        textWithCustomer: () => cy.get(".gridview .gridview__rows .gridview__row:nth-child(1) .gridview__column:nth-child(7)"),
        textWithoutSet: () => cy.get(".gridview .gridview__rows .gridview__row:nth-child(1) .gridview__column:nth-child(1)"),
        filters: {
            link: () => cy.get('.sidebar li.sidebar-item'),
            all: () => cy.get('.sidebar li.sidebar-item').contains('ALL'),
            drafts: () => cy.get('.sidebar li.sidebar-item').contains('DRAFTS'),
            with_customer: () => cy.get('.sidebar li.sidebar-item').contains('WITH CUSTOMER'),
            ready_for_review: () => cy.get('.sidebar li.sidebar-item').contains('READY FOR REVIEW'),
            reviewed: () => cy.get('.sidebar li.sidebar-item').contains('REVIEWED'),
        },
        applicationsTable: {
            input: () => cy.get('.gridview .gridview__row-filter'),
            column_label: (header_label) => cy.get('.gridview__row-header .gridview__column .gridview__column-container').contains(header_label),
            search_applicationId: () => cy.get('.gridview .gridview__row-filter input[placeholder="APPLICATION ID"]'),
            calendarButton: ()=> cy.get('.gridview__row-header button'),
            rows: ()=> cy.get('.gridview .gridview__rows'),
            columns: ()=> cy.get('.gridview .gridview__rows .gridview__row .gridview__column'),
            footer: {
                input: () => cy.get('.gridview__footer .gridview__footer--left input'),
                page_left: () => cy.get('.gridview__footer .gridview__footer--left .gridview__footer-pagination-buttons button').eq(0),
                page_right: () => cy.get('.gridview__footer .gridview__footer--left .gridview__footer-pagination-buttons button').eq(1),
                perpage_dropdown: () => cy.get('.gridview__footer .gridview__footer--right select')
            },
            date_picker: {
                start: ()=> cy.get('.rdrDateDisplayWrapper .rdrDateInput input[placeholder="Early"]'),
                end:  ()=> cy.get('.rdrDateDisplayWrapper .rdrDateInput input[placeholder="Continuous"]'),
                month: ()=> cy.get('.rdrDateRangePickerWrapper .rdrYearPicker .rdrMonthPicker '),
                year: ()=> cy.get('.rdrDateRangePickerWrapper .rdrMonthAndYearWrapper .rdrMonthPicker select'),
                days_start: ()=> cy.get('.rdrCalendarWrapper rdrDateRangeWrapper .rdrMonths .rdrMonth:nth-child(1) .rdrDays button'), 
                days_end: ()=> cy.get('.rdrCalendarWrapper rdrDateRangeWrapper .rdrMonths .rdrMonth:nth-child(2) .rdrDays button')           
            }
        },
        cardlist: {
            card_count: (card_label) => cy.get('.card__list .card__label').contains(card_label).next('.card__count')
        }
    }
    checkTableAddedApplication = () => {
        cy.checkLoading()
        this.elements.textWithCustomer().should("have.text", "With Customer");
        this.elements.textWithoutSet().should("not.have.text", "Not Set");
    }
    applyFilter = (name) => {
        cy.intercept('POST', '/widget/api/submission-data*').as('postSubmissionData');
        this.elements.filters.link().contains(name).click()
        cy.wait('@postSubmissionData')
    }
    applicationSearch = (input, query) => {
        // cy.intercept('POST', '/widget/api/submission-data*').as('postSubmissionData2');
        cy.intercept('POST', '/widget/api/submission-data*').as('postSubmissionData');
        this.elements.applicationsTable.input().find(`input[placeholder="${input}"]`).type(query)
        // cy.wait('@postSubmissionData').then((interception) => {
        //     expect(interception.request.body.query.values.ApplicantNames).to.eq(query)
        // })
        cy.wait('@postSubmissionData')
    }
    changeDate = () => {
        // cy.intercept('POST', '/widget/api/submission-data*').as('postSubmissionData');
        this.elements.applicationsTable.calendarButton().click()

        // cy.wait('@postSubmissionData')
    }
    sortColumn = (header_label, order) => {
        this.elements.applicationsTable.column_label(header_label).click()
    }
    leftPaginationClick = () => {
        cy.intercept('POST', '/widget/api/submission-data*').as('postSubmissionData');
        this.elements.applicationsTable.footer.page_left().click()
        cy.wait('@postSubmissionData')
    }
    rightPaginationClick = () => {
        cy.intercept('POST', '/widget/api/submission-data*').as('postSubmissionData');
        this.elements.applicationsTable.footer.page_right().click()
        cy.wait('@postSubmissionData')
    }
    changePerPage = (number) => {
        cy.intercept('POST', '/widget/api/submission-data*').as('postSubmissionData');
        this.elements.applicationsTable.footer.perpage_dropdown().select(number)
        cy.wait('@postSubmissionData')
    }
    checkTableColumns=(col_index, col_text)=> {
        this.elements.applicationsTable.rows().find(`.gridview__column:nth-child(${col_index})`).each(row=> {
            let row_wrap = cy.wrap(row)
            row_wrap.invoke('text').then(text=> {
                expect(text).to.contain(col_text)
            })
        })
    }
};
module.exports = new DashboardPage();