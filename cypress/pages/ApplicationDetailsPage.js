import 'cypress-iframe';
class ApplicationDetailsPage {
    loc = {
        applicationIdLabel: '.application_id',
        applicantsMeta: '.applicants__meta',
        sideBarName: '.applicant-sidebar__name',
        applicantSnapshot_badge: '.applicant__snapshot .badge'

    }
    elements = {

    }

    verifyDetails=(formData, referenceNumber)=> {
        cy.get(this.loc.applicationIdLabel).invoke('text').then(text=> {
            expect(text).to.equal(referenceNumber)
        })
        cy.get(this.loc.sideBarName)
        .invoke('text').then(text=> {
            expect(text).to.includes(`${formData['ApplicantFirstName']} ${formData['ApplicantMiddleName']} ${formData['ApplicantLastName']}`)
        })
        cy.get('.applicant-sidebar__details .details__label').contains('DRIVERS LICENSE NUMBER').next().invoke('text').then(text=> {
            expect(text).to.equal(formData['ApplicantDriversLicenceNumber'])
        })
       
        
    }

    checkSnapshotBadge = (badge, badgeClass)=> {
        cy.get(this.loc.applicantSnapshot_badge).find('.badge-label').contains(badge).parent().should('have.class',badgeClass)

    }

    checkBankReport=()=> {
                cy.get('.applicant-sidebar__details .details__label').contains('BANK REPORTS').next('.flex').find('button').should('be.visible')

    }

    checkSummaryReport=()=> {
        cy.get('.applicant-sidebar__details .details__link').contains('SUMMARY REPORT').should('be.visible')
    }

    checkOtherReports=()=> {
        cy.get('.applicant-sidebar__details .details__label').contains('OTHER REPORTS').next('.flex').find('button').should('be.visible')
    }



};
module.exports = new ApplicationDetailsPage();