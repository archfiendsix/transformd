// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('clickEl', (locator, contains = null) => {
    contains ? cy.get(locator).contains(contains).click() : cy.get(locator).click();
});

Cypress.Commands.add('selectOption', (locator, option) => {
    cy.get(locator).select(option);
});

Cypress.Commands.add('shouldNotExist', (locator) => {
    cy.get(locator).should('not.exist');
})

Cypress.Commands.add('shouldBeVisible', { prevSubject: ['optional', 'element'] }, (element, container) => {
    // cy.get(locator).should('be.visible');
    if (container) {
        cy.get(container).should('be.visible')
    }
    else {
        element.should('be.visible')
    }
})

Cypress.Commands.add('findChildElement', (parentLocator, childLocator) => {
    cy.get(parentLocator).find(childLocator)
})

Cypress.Commands.add('shouldBeVisibleContains', (element, text) => {
    cy.get(element).should('be.visible').contains(text)
})

Cypress.Commands.add('login', (email, password) => {
    cy.session([email, password], () => {
        cy.visit("/login");
        cy.loginEnterCreds(email, password)
        cy.intercept('POST', '/site/login').as('postLoginlogin');
        cy.get('button[name="login-button"]').click();
        cy.wait('@postLoginlogin');
    },
        {
            cacheAcrossSpecs: true
        },
    );
});

Cypress.Commands.add('loginEnterCreds', (email, password) => {
    cy.get("#login-form-email").type(email);
    cy.get("#login-form-password").type(password);
});


Cypress.Commands.add('forgotpasswordwith_creds', (email) => {
    cy.get("#passwordresetrequestform-email").type(email);
    cy.get('.pull-left > .btn').click();
});

Cypress.Commands.add('dropdownSelect', (placeholder, dropdown_item) => {
    cy.get('.ant-select-selection__placeholder').last().contains(placeholder).click({ force: true });
    cy.get('.ant-select-dropdown').not('have.class', '.ant-select-dropdown-hidden').last()
        .then($el => {
            cy.wrap($el).find('li.ant-select-dropdown-menu-item').contains(dropdown_item).click({ force: true });
        }
        );
});



Cypress.Commands.add('checkLoading', () => {
    cy.get('.ant-spin-dot.ant-spin-dot-spin').should('not.exist');
});

Cypress.Commands.add('convertTime', (timestamp) => {
    const date = new Date(timestamp * 1000); // JavaScript Date objects use milliseconds, so multiply by 1000 to convert seconds to milliseconds

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed, so add 1 to get the correct month
    const year = date.getFullYear().toString();

    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate // Output: 23/12/2023
});


Cypress.Commands.add('clickUntilHasClass', { prevSubject: 'element' }, (element, targetClass, maxAttempts = 10) => {
    let attempts = 0;

    const clickAndCheckClass = () => {
        attempts++;

        if (attempts > maxAttempts) {
            throw new Error(`Element did not get the class '${targetClass}' after ${maxAttempts} attempts.`);
        }


        cy.wrap(element).click().then(($el) => {
            const hasTargetClass = $el.hasClass(targetClass);

            if (!hasTargetClass) {
                // If the element doesn't have the target class, recursively call the function.
                clickAndCheckClass();
            }
        });
    };

    // Start the recursion.
    clickAndCheckClass();
});


Cypress.Commands.add('visitMobileMode', (url) => {
    cy.viewport(500, 768)
    cy.visit(url, {
        onBeforeLoad: win => {
            Object.defineProperty(win.navigator, 'userAgent', {
                value: 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Mobile Safari/537.36',
            });
        },

    })
});

Cypress.Commands.add('iframeDirect', { prevSubject: 'element' }, $iframe=> {
    return new Cypress.Promise(resolve=> {
      resolve($iframe.contents().find('body'));
    });
  });

  Cypress.Commands.add('iframeOnload', { prevSubject: 'element' }, $iframe=> {
    return new Cypress.Promise(resolve=> {
        $iframe.on('load', () => {
            resolve($iframe.contents().find('body'));
        });
    });
  });


