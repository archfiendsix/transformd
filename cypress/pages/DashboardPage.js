class DashboardPage {
    loc = {
        textWithCustomer: '.gridview .gridview__rows .gridview__row:nth-child(1) .gridview__column:nth-child(7)',
        textWithoutSet: '.gridview .gridview__rows .gridview__row:nth-child(1) .gridview__column:nth-child(1)',
        filters: {
            link: '.sidebar li.sidebar-item',
            all: '.sidebar li.sidebar-item:contains("ALL")',
            drafts: '.sidebar li.sidebar-item:contains("DRAFTS")',
            with_customer: '.sidebar li.sidebar-item:contains("WITH CUSTOMER")',
            ready_for_review: '.sidebar li.sidebar-item:contains("READY FOR REVIEW")',
            reviewed: '.sidebar li.sidebar-item:contains("REVIEWED")',
        },
        applicationsTable: {
            input: '.gridview .gridview__row-filter',
            header_columns: (label) => `.gridview .gridview__row-header .gridview__column-header:contains(${label})`,
            filter_columns: '.gridview .gridview__row-filter .gridview__column-filter',
            column_label: (header_label) => `.gridview__row-header .gridview__column .gridview__column-container:contains(${header_label})`,
            search_applicationId: '.gridview .gridview__row-filter input[placeholder="APPLICATION ID"]',
            calendarButton: (label) => `.gridview__row-header button:contains(${label})`,
            rows: '.gridview .gridview__rows .gridview__row',
            columns: '.gridview .gridview__rows .gridview__row .gridview__column',
            emptyTable: '.gridview__rows .gridview__row-empty',
            footer: {
                input: '.gridview__footer .gridview__footer--left input',
                page_left: '.gridview__footer .gridview__footer--left .gridview__footer-pagination-buttons button:eq(0)',
                page_right: '.gridview__footer .gridview__footer--left .gridview__footer-pagination-buttons button:eq(1)',
                perpage_dropdown: '.gridview__footer .gridview__footer--right select'
            },
            picker: {
                start_date_button: '.rdrDateDisplayWrapper .rdrDateInput input[placeholder="Early"]',
                end_date_button: '.rdrDateDisplayWrapper .rdrDateInput input[placeholder="Continuous"]',
                month: '.rdrDateRangePickerWrapper .rdrMonthAndYearPickers .rdrMonthPicker select',
                year: '.rdrDateRangePickerWrapper .rdrMonthAndYearPickers .rdrYearPicker select',
                days_start: `.rdrDateRangePickerWrapper .rdrMonths .rdrMonth:nth-child(1) .rdrDays button:not(.rdrDayPassive)`,
                days_end: '.rdrDateRangePickerWrapper .rdrMonths .rdrMonth:nth-child(1) .rdrDays button:not(.rdrDayPassive)'
            }
        },
        cardlist: {
            card_count: (card_label) => `.card__list .card__label:contains(${card_label}) + .card__count`
        }
    };

    checkTableAddedApplication = () => {
        cy.checkLoading();
        cy.get(this.loc.textWithCustomer).should("have.text", "With Customer");
        cy.get(this.loc.textWithoutSet).should("not.have.text", "Not Set");
    }

    applyFilter = (name) => {
        cy.intercept('POST', '/widget/api/submission-data*').as('postSubmissionDataApplyFilter');
        cy.clickEl(this.loc.filters.link, name)
        cy.wait('@postSubmissionDataApplyFilter');
    }

    applicationSearch = (input, query) => {
        if (input === 'INFORMATION STATUS') {
            cy.get(this.loc.applicationsTable.input).find('select').select(query);
        } else {
            cy.get(this.loc.applicationsTable.input).find(`input[placeholder="${input}"]`).type(query);
        }
    }

    changeDate = (dates) => {
        cy.clickEl(this.loc.applicationsTable.calendarButton('Open'))

        cy.clickEl(this.loc.applicationsTable.picker.start_date_button)
        cy.selectOption(this.loc.applicationsTable.picker.month, dates.start_date.month)
        cy.selectOption(this.loc.applicationsTable.picker.year, dates.start_date.year)
        cy.clickEl(this.loc.applicationsTable.picker.days_start, dates.start_date.day);

        cy.clickEl(this.loc.applicationsTable.picker.end_date_button)
        cy.selectOption(this.loc.applicationsTable.picker.month, dates.end_date.month)
        cy.get(this.loc.applicationsTable.picker.year).select(dates.end_date.year);
        cy.intercept('POST', '/widget/api/submission-data*').as('postSubmissionDatachangeDate');
        cy.clickEl(this.loc.applicationsTable.picker.days_start, dates.end_date.day);
        cy.clickEl(this.loc.applicationsTable.calendarButton('Close'))
        cy.wait('@postSubmissionDatachangeDate').then((postSubmissionDatachangeDate) => {
            this.checkTableFetchResponseBody(postSubmissionDatachangeDate);
        });
    }

    sortColumn = (header_label, order) => {
        if (order === 'asc') {
            cy.get(this.loc.applicationsTable.header_columns(header_label)).parent().find('i.up').clickUntilHasClass('active');
        } else if (order === 'desc') {
            cy.get(this.loc.applicationsTable.header_columns(header_label)).parent().find('i.down').clickUntilHasClass('active');
        }
    }

    previousPaginationClick = () => {
        cy.clickEl(this.loc.applicationsTable.footer.page_left)
    }

    nextPaginationClick = () => {
        cy.clickEl(this.loc.applicationsTable.footer.page_right)
    }

    checkTableFetchResponseBody = (res) => {
        const responseBody = res.response.body;
        const keys = responseBody.keys;

        if (responseBody.data.count === 0) {
            cy.get(this.loc.applicationsTable.emptyTable).should('be.visible').should('have.text', 'Records not found');
        } else {
            cy.get('.gridview .gridview__rows .gridview__row').each(($row, index) => {
                cy.wrap($row).find('.gridview__column').eq(0).invoke('text').then((textAppId) => {
                    const appid_key = keys['ApplicationId'];
                    const app_id_val = responseBody.data.rows[index].document.values[appid_key];
                    if (app_id_val) {
                        cy.wrap(textAppId).should('eq', app_id_val);
                    } else {
                        cy.log('not found');
                    }
                });

                cy.wrap($row).find('.gridview__column').eq(1).invoke('text').then((textApplicantNames) => {
                    const applicantnames_key = keys['ApplicantNames'];
                    const applicantnames_val = responseBody.data.rows[index].document.values[applicantnames_key];
                    if (applicantnames_val) {
                        cy.wrap(textApplicantNames).should('eq', applicantnames_val);
                    } else {
                        cy.log('not found');
                    }
                });

                cy.wrap($row).find('.gridview__column').eq(6).invoke('text').then((textStatus) => {
                    const status_key = keys['Status'];
                    const status_val = responseBody.data.rows[index].document.values[status_key];
                    if (status_val) {
                        cy.log(status_val);
                        cy.wrap(textStatus).should('eq', status_val);
                    } else {
                        cy.log('not found');
                    }
                });
            });
        }
    };



    changePerPage = (number) => {
        cy.intercept('POST', '/widget/api/submission-data*').as('postSubmissionDatachangePerPage');
        cy.get(this.loc.applicationsTable.footer.perpage_dropdown).select(number);
        cy.wait('@postSubmissionDatachangePerPage');
    }

    changeCurrentPage = (number) => {
        cy.get(this.loc.applicationsTable.footer.input).clear().type(number);
    }

    checkTableColumns = (res, col_index, col_text) => {

        const responseBody = res.response.body;
        cy.log(`DATA COUNT: ${responseBody.data.count}`)
        if (responseBody.data.count === 0) {
            cy.get(this.loc.applicationsTable.emptyTable).should('be.visible').then($el => {
                cy.wrap($el).should('have.text', 'Records not found')
            })
        }
        else {
            cy.get(this.loc.applicationsTable.rows).find(`.gridview__column:nth-child(${col_index})`).each((row, index) => {
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

        cy.get(this.loc.applicationsTable.footer.input).invoke('val').then(val => {
            expect(val).to.equal(resCurrentPage.toString())
            expect(val).to.equal(reqPage.toString())
        })

        cy.get(this.loc.applicationsTable.footer.input).next('span').invoke('text').then(text => {
            expect(text).to.equal(`of ${resTotalPages}`)
        })


        cy.get(this.loc.applicationsTable.footer.perpage_dropdown).invoke('val').then(text => {
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

        cy.get(this.loc.cardlist.card_count('DRAFTS')).invoke('text').then(draftsCardCount => {
            draftsCount = parseInt(draftsCardCount);
            cy.log(draftsCount);
        }).then(() => {
            cy.get(this.loc.cardlist.card_count('WITH CUSTOMER')).invoke('text').then(withCustomerCardCount => {
                withCustomerCount = parseInt(withCustomerCardCount);
                cy.log(withCustomerCount);
            }).then(() => {
                cy.get(this.loc.cardlist.card_count('READY FOR REVIEW')).invoke('text').then(readyForReviewCardCount => {
                    readyForReviewCount = parseInt(readyForReviewCardCount);
                    cy.log(readyForReviewCount);
                }).then(() => {
                    cy.get(this.loc.cardlist.card_count('REVIEWED')).invoke('text').then(reviewedCardCount => {
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
        cy.get(this.loc.applicationsTable.rows).should('have.length', expected_count);
    }
}

module.exports = new DashboardPage();