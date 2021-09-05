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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

const development = true;

Cypress.Commands.add('getUserAccessLevel', () => {
    cy.intercept('POST', '/user_access_level_get', (req) => {
        if (req.body === 'id_user=0') {
            req.reply(async (res) => {
                await res.send({
                    success: true,
                    data: {
                        id_access_levels: [0, 1, 2, 3, 4, 5],
                    },
                });
            });
        } else if (req.body === 'id_user=1') {
            req.reply(async (res) => {
                await res.send({
                    success: true,
                    data: {
                        id_access_levels: [1, 3, 4, 5],
                    },
                });
            });
        } else if (req.body === 'id_user=1') {
            req.reply(async (res) => {
                await res.send({
                    success: true,
                    data: {
                        id_access_levels: [2, 3, 4, 5],
                    },
                });
            });
        }
    }).as('loadPage');
});

Cypress.Commands.add('headerNavigationLinkText', (text) => {
    cy.get('header[id="headerSticky"]', { timeout: 10000 }).within(() => {
        cy.contains(text).click({ force: true });
    });
});

Cypress.Commands.add('headerNavigationLinkIcon', (icon) => {
    cy.get('header[id="headerSticky"]', { timeout: 10000 }).within(() => {
        cy.get(icon).click({ force: true });
    });
});

Cypress.Commands.add('footerNavigationLink', (text, routeText) => {
    cy.get('footer[class="ps-footer"]').within(() => {
        cy.contains(text).click({ force: true });
    });
});

Cypress.Commands.add('breadcrumbLink', (text) => {
    cy.get('.ps-breadcrumb', { timeout: 10000 }).within(() => {
        cy.contains(text).click();
    });
});

Cypress.Commands.add('brandLink', (text) => {
    cy.get('.ps-product__meta', { timeout: 10000 }).within(() => {
        cy.get('a').click({ force: true });
    });
});

Cypress.Commands.add('soldByLink', (text) => {
    cy.get('.ps-product__desc', { timeout: 10000 }).within(() => {
        cy.get('a').click({ force: true });
    });
});

Cypress.Commands.add('productShoppingLink', (text) => {
    cy.get('.ps-product__shopping', { timeout: 10000 }).within(() => {
        cy.contains(text).click();
    });
});

Cypress.Commands.add('linksIn', (elem, index) => {
    cy.get(elem).then(($li) => {
        cy.wrap($li[index]).click();
    });
});

Cypress.Commands.add('logIn', (user) => {
    let email, password;

    switch (user) {
        case 'buyer':
            email = 'kyle@mail.com';
            password = 'cybog';
            break;
        case 'seller':
            email = 'ali@mail.com';
            password = 'boxer';
            break;
        case 'dev':
            email = 'sensei@mail.com';
            password = 'code';
            break;
        default:
            email = 'kyle@mail.com';
            password = 'cybog';
            break;
    }
    cy.get('#user_email').type(email);
    cy.get('#user_password').type(password);

    if (development) {
        cy.intercept('POST', 'http://localhost:3000/api/user_login').as(
            'logging-in'
        );
    } else {
        cy.intercept(
            'POST',
            'https://4l0nq44u0k.execute-api.us-east-2.amazonaws.com/staging/api/user_login'
        ).as('logging-in');
    }

    cy.get("button[type='submit']").click({ force: true });

    cy.wait('@logging-in');
});
