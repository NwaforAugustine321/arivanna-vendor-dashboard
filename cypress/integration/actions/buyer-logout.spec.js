/// <reference types="cypress" />

const buyer_login = Cypress.env('buyer_login');
const api_route = Cypress.env('api_route');

describe('Should log in and logout buyer', () => {
    before(() => {
        cy.visit('/account/login');
    });

    it('logs in user', () => {
        cy.get('#user_email').type(buyer_login.email);
        cy.get('#user_password').type(buyer_login.password);
        cy.contains('Remember me').click();
        cy.intercept('POST', `${api_route}`, (req) => {
            req.reply(buyer_login.response);
        }).as('logging-in');

        cy.get('#login-btn-buyer').click();
    });

    it('logs out user', () => {
        cy.contains('30 Days Return', { timeout: 10000 })
        cy.get('header[id="headerSticky"]', { timeout: 10000 }).within(() => {
            cy.get('.icon-user').click({ force: true });
            cy.contains('Logout').click({ force: true });
        });
    });
});
