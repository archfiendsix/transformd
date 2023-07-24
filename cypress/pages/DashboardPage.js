class DashboardPage {
    locators =  {

    }
    elements = {
        textWithCustomer: () => cy.get(".gridview .gridview__rows .gridview__row:nth-child(1) .gridview__column:nth-child(7)"),
        textWithoutSet: () => cy.get(".gridview .gridview__rows .gridview__row:nth-child(1) .gridview__column:nth-child(1)"),
        filters: {
            link: ()=> cy.get('.sidebar li.sidebar-item'),
            all: ()=> cy.get('.sidebar li.sidebar-item').contains('ALL'),
            drafts: ()=> cy.get('.sidebar li.sidebar-item').contains('DRAFTS'),
            with_customer: ()=> cy.get('.sidebar li.sidebar-item').contains('WITH CUSTOMER'),
            ready_for_review: ()=> cy.get('.sidebar li.sidebar-item').contains('READY FOR REVIEW'),
            reviewed: ()=> cy.get('.sidebar li.sidebar-item').contains('REVIEWED'),
        },
        applicationTable: {
            input: ()=> cy.get('.gridview .gridview__row-filter'),
            search_applicationId: ()=> cy.get('.gridview .gridview__row-filter input[placeholder="APPLICATION ID"]')
        },
        cardlist: {
            card_count: (card_label)=> cy.get('.card__list .card__label').contains(card_label).next('.card__count')
        }
    }
    checkTableAddedApplication = () => {
        cy.checkLoading()
        this.elements.textWithCustomer().should("have.text", "With Customer");
        this.elements.textWithoutSet().should("not.have.text", "Not Set");
    }
    applyFilter = (name)=> {
        cy.intercept('POST', '/widget/api/submission-data*').as('postSubmissionData');
        this.elements.filters.link().contains(name).click()
        cy.wait('@postSubmissionData')
    }
    applicationSearch=(input, query)=> {
        cy.intercept('POST', '/widget/api/submission-data*').as('postSubmissionData2');
        this.elements.applicationTable.input().find(`input[placeholder="${input}"]`).type(query)
        cy.wait('@postSubmissionData2')
    }
};
module.exports = new DashboardPage();