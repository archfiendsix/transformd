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
            emptyTable: () => cy.get('.gridview__rows .gridview__row-empty'),
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
        // cy.intercept('POST', '/widget/api/submission-data*').as('postSubmissionDataapplicationSearch');

        if (input === 'INFORMATION STATUS') {
            this.elements.applicationsTable.input().find('select').select(query)
        }
        else {
            this.elements.applicationsTable.input().find(`input[placeholder="${input}"]`).type(query)
        }
        // cy.wait('@postSubmissionDataapplicationSearch')
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
    previousPaginationClick = () => {
        this.elements.applicationsTable.footer.page_left().click()
    }
    nextPaginationClick = () => {
        this.elements.applicationsTable.footer.page_right().click()
    }

    checkTableFetchResponseBody = (res) => {
        const responseBody = res.response.body;
        const keys = responseBody.keys;

        if (responseBody.data.count === 0) {
            this.elements.applicationsTable.emptyTable().should('be.visible').then($el => {
                cy.wrap($el).should('have.text', 'Records not found')
            })
        }

        else {
            cy.get('.gridview .gridview__rows .gridview__row').each(($row, index) => {
                cy.wrap($row).find('.gridview__column').eq(0).then($col => {
                    cy.wrap($col).invoke('text').then(textApplicantId => {
                        const values = responseBody.data.rows[index].document.values
                        const keyValues = Object.values(values);
                        const sortColumn = responseBody.data.rows[index].sortColumn

                        cy.wrap($row).find('.gridview__column').eq(0).invoke('text').then(textAppId => {
                            const appid_key = keys["ApplicationId"]
                            const app_id_val = responseBody.data.rows[index].document.values[appid_key]
                            app_id_val ? expect(textAppId, `Checking ${textAppId}...`).to.equal(app_id_val) : cy.log('not found')
                        })

                        cy.wrap($row).find('.gridview__column').eq(1).invoke('text').then(textApplicantNames => {
                            const applicantnames_key = keys["ApplicantNames"]
                            const applicantnames_val = responseBody.data.rows[index].document.values[applicantnames_key]
                            applicantnames_val ? expect(textApplicantNames, `Checking ${textApplicantNames}...`).to.equal(applicantnames_val) : cy.log('not found')
                        })

                        // cy.wrap($row).find('.gridview__column').eq(2).invoke('text').then(textUpdatedDate => {
                        //     const updated_timestamp = responseBody.data.rows[index].document.updated
                        //     const updated_val = cy.convertTime(updated_timestamp)
                        //     updated_val ? expect(textUpdatedDate, `Checking ${textUpdatedDate}...`).to.equal(updated_val) : cy.log('not found')
                        // })

                        cy.wrap($row).find('.gridview__column').eq(6).invoke('text').then(textStatus => {
                            const status_key = keys["Status"]
                            const status_val = responseBody.data.rows[index].document.values[status_key]
                            cy.log(status_val)
                            status_val ? expect(textStatus, `Checking ${textStatus}...`).to.equal(status_val) : cy.log('not found')
                        })

                    })
                })
            })
        }
    }
    changePerPage = (number) => {
        cy.intercept('POST', '/widget/api/submission-data*').as('postSubmissionDatachangePerPage');
        this.elements.applicationsTable.footer.perpage_dropdown().select(number)
        cy.wait('@postSubmissionDatachangePerPage')
    }

    changeCurrentPage = (number) => {
        this.elements.applicationsTable.footer.input().clear().type(number)
    }
    checkTableColumns = (res, col_index, col_text) => {

        const responseBody = res.response.body;
        cy.log(`DATA COUNT: ${responseBody.data.count}`)
        if (responseBody.data.count === 0) {
            this.elements.applicationsTable.emptyTable().should('be.visible').then($el => {
                cy.wrap($el).should('have.text', 'Records not found')
            })
        }
        else {
            this.elements.applicationsTable.rows().find(`.gridview__column:nth-child(${col_index})`).each((row, index) => {
                let row_wrap = cy.wrap(row)
                row_wrap.invoke('text').then(text => {
                    expect(text, `Checking if this row has ${col_text} in column-${col_index} of row-${index}`).to.contain(col_text)
                })
            })

        }


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

    reviewCurrentPage = (intercept) => {
        const requestBody = intercept.request.body;
        const responseBody = intercept.response.body;
        const reqPage = requestBody.query.pagination.page;
        const reqPerPage = requestBody.query.pagination.perPage;
        const resCurrentPage = responseBody.pagination.currentPage;
        const resTotal = responseBody.pagination.total;
        const resTotalPages = responseBody.pagination.totalPages;

        this.elements.applicationsTable.footer.input().invoke('val').then(val => {
            expect(val).to.equal(resCurrentPage.toString())
            expect(val).to.equal(reqPage.toString())
        })

        this.elements.applicationsTable.footer.input().next('span').invoke('text').then(text => {
            expect(text).to.equal(`of ${resTotalPages}`)
        })


        this.elements.applicationsTable.footer.perpage_dropdown().invoke('val').then(text => {
            expect(text).to.equal(reqPerPage.toString())
        })

    }

    checkTotalCardCount = (res) => {
        const resDataCount = res.response.body.data.count;
        var draftsCount = 0;
        var withCustomerCount = 0;
        var readyForReviewCount = 0;
        var reviewedCount = 0;
        let totalCount = 0;

        this.elements.cardlist.card_count('DRAFTS').invoke('text').then(draftsCardCount => {
            draftsCount = parseInt(draftsCardCount);
            cy.log(draftsCount);
        }).then(() => {
            this.elements.cardlist.card_count('WITH CUSTOMER').invoke('text').then(withCustomerCardCount => {
                withCustomerCount = parseInt(withCustomerCardCount);
                cy.log(withCustomerCount);
            }).then(() => {
                this.elements.cardlist.card_count('READY FOR REVIEW').invoke('text').then(readyForReviewCardCount => {
                    readyForReviewCount = parseInt(readyForReviewCardCount);
                    cy.log(readyForReviewCount);
                }).then(() => {
                    this.elements.cardlist.card_count('REVIEWED').invoke('text').then(reviewedCardCount => {
                        reviewedCount = parseInt(reviewedCardCount);
                        cy.log(reviewedCount);
                    }).then(() => {
                        totalCount = draftsCount + withCustomerCount + readyForReviewCount + reviewedCount;
                        expect(totalCount).to.equal(resDataCount);
                    });
                });
            });
        });

    }

    checkTableRowCount(expected_count) {
        this.elements.applicationsTable.rows().should('have.length', expected_count);
    }

};
module.exports = new DashboardPage();