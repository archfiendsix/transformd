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
            header_columns: (label) => cy.get('.gridview .gridview__row-header .gridview__column-header').contains(label),
            filter_columns: () => cy.get('.gridview .gridview__row-filter .gridview__column-filter'),
            column_label: (header_label) => cy.get('.gridview__row-header .gridview__column .gridview__column-container').contains(header_label),
            search_applicationId: () => cy.get('.gridview .gridview__row-filter input[placeholder="APPLICATION ID"]'),
            calendarButton: (label) => cy.get('.gridview__row-header button').contains(label),
            rows: () => cy.get('.gridview .gridview__rows .gridview__row'),
            columns: () => cy.get('.gridview .gridview__rows .gridview__row .gridview__column'),
            footer: {
                input: () => cy.get('.gridview__footer .gridview__footer--left input'),
                page_left: () => cy.get('.gridview__footer .gridview__footer--left .gridview__footer-pagination-buttons button').eq(0),
                page_right: () => cy.get('.gridview__footer .gridview__footer--left .gridview__footer-pagination-buttons button').eq(1),
                perpage_dropdown: () => cy.get('.gridview__footer .gridview__footer--right select')
            },
            date_picker: {
                start_date_button: () => cy.get('.rdrDateDisplayWrapper .rdrDateInput input[placeholder="Early"]'),
                end_date_button: () => cy.get('.rdrDateDisplayWrapper .rdrDateInput input[placeholder="Continuous"]'),
                month: () => cy.get('.rdrDateRangePickerWrapper .rdrMonthAndYearPickers .rdrMonthPicker select'),
                year: () => cy.get('.rdrDateRangePickerWrapper .rdrMonthAndYearPickers .rdrYearPicker select'),
                days_start: () => cy.get('.rdrDateRangePickerWrapper .rdrMonths .rdrMonth:nth-child(1) .rdrDays button'),
                days_end: () => cy.get('.rdrDateRangePickerWrapper .rdrMonths .rdrMonth:nth-child(1) .rdrDays button')
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
        cy.intercept('POST', '/widget/api/submission-data*').as('postSubmissionDataApplyFilter');
        this.elements.filters.link().contains(name).click()
        cy.wait('@postSubmissionDataApplyFilter')
    }
    applicationSearch = (input, query) => {
        // cy.intercept('POST', '/widget/api/submission-data*').as('postSubmissionData2');
        cy.intercept('POST', '/widget/api/submission-data*').as('postSubmissionDataapplicationSearch');
        this.elements.applicationsTable.input().find(`input[placeholder="${input}"]`).type(query)
        // cy.wait('@postSubmissionData').then((interception) => {
        //     expect(interception.request.body.query.values.ApplicantNames).to.eq(query)
        // })
        cy.wait('@postSubmissionDataapplicationSearch')
    }
    changeDate = (dates) => {
        this.elements.applicationsTable.calendarButton('Open').click()
        this.elements.applicationsTable.date_picker.start_date_button().click()
        this.elements.applicationsTable.date_picker.month().select(dates.start_date.month)
        this.elements.applicationsTable.date_picker.year().select(dates.start_date.year)
        this.elements.applicationsTable.date_picker.days_start().not('.rdrDayPassive').contains(dates.start_date.day).click()

        this.elements.applicationsTable.date_picker.end_date_button().click()
        this.elements.applicationsTable.date_picker.month().select(dates.end_date.month)
        this.elements.applicationsTable.date_picker.year().select(dates.end_date.year)
        this.elements.applicationsTable.date_picker.days_start().not('.rdrDayPassive').contains(dates.end_date.day).click()
        this.elements.applicationsTable.calendarButton('Close').click()
    }
    sortColumn = (header_label, order) => {
        if (order === 'asc') {
            this.elements.applicationsTable.header_columns(header_label).parent().find('i.up').clickUntilHasClass('active');
        }
        else if (order === 'desc') {
            this.elements.applicationsTable.header_columns(header_label).parent().find('i.down').clickUntilHasClass('active');
        }
        else {

        }
    }
    leftPaginationClick = () => {
        this.elements.applicationsTable.footer.page_left().click()
    }
    rightPaginationClick = () => {
        this.elements.applicationsTable.footer.page_right().click()
    }

    checkTableFetchResponseBody = (res) => {
        const responseBody = res.response.body;
        cy.get('.gridview .gridview__rows .gridview__row').each(($row, index) => {
            cy.wrap($row).find('.gridview__column').eq(0).then($col => {
                cy.wrap($col).invoke('text').then(text => {
                    const values = responseBody.data.rows[index].document.values
                    const keyValues = Object.values(values);
                    const sortColumn = responseBody.data.rows[index].sortColumn
                    if (text === 'Not Set') {
                        // expect(sortColumn).to.equal('')
                        // cy.log(text)
                        // keyValues.forEach((val, ind) => {
                        //     cy.log(`${ind} - ${val}`)
                        // })
                        cy.wrap($col).eq(1).invoke('text').then(text2 => {
                            expect(keyValues.includes(text2), `Checking ${text2}...`).to.equal(true)
                        })


                    }
                    else {
                        // cy.log(text)
                        // keyValues.forEach((val, ind) => {
                        //     cy.log(`${ind} - ${val}`)
                        // })
                        expect(keyValues.includes(text), `Checking ${text} is in row-${index}...`).to.equal(true)
                    }
                })
            })
        })
    }
    changePerPage = (number) => {
        cy.intercept('POST', '/widget/api/submission-data*').as('postSubmissionDatachangePerPage');
        this.elements.applicationsTable.footer.perpage_dropdown().select(number)
        cy.wait('@postSubmissionDatachangePerPage')
    }
    checkTableColumns = (col_index, col_text) => {

        this.elements.applicationsTable.rows().find(`.gridview__column:nth-child(${col_index})`).each((row, index) => {
            let row_wrap = cy.wrap(row)
            row_wrap.invoke('text').then(text => {
                expect(text,`Checking if this row has ${col_text} in column-${col_index} of row-${index}`).to.contain(col_text)
            })
        })

    }
    deleteDrafts = () => {

        cy.get('.gridview .gridview__rows').each(($el) => {
            const row_wrap = cy.wrap($el)
            row_wrap.find('.gridview__column:nth-child(1)').each((app_id, index) => {
                let appid = app_id.text()
                if (appid === 'Not Set') {
                    cy.log(appid)
                    cy.get('.gridview .gridview__rows').find('.gridview__column:nth-child(7)').eq(index).then($el => {
                        const status = $el.text()
                        if (status === 'Draft') {
                            cy.get('.gridview .gridview__rows').find('.gridview__column:nth-child(8)').eq(index).click()

                            cy.get('.react-confirm-alert .react-confirm-alert-button-group button:nth-child(1)').click()

                            cy.intercept('POST', '/widget/api/submission-count*').as('postSubmissionCount');
                            cy.wait('@postSubmissionCount')
                        }
                    })
                }
            })
        })
    }

    checkTableRowCount(expected_count) {
        this.elements.applicationsTable.rows().should('have.length', expected_count);
    }

};
module.exports = new DashboardPage();