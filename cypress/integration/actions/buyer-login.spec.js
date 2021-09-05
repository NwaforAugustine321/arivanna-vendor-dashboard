/// <reference types="cypress" />

const buyer_login = Cypress.env('buyer_login');
const api_route = Cypress.env('api_route');

describe('Should log in buyer', () => {
    before(() => {
        cy.visit('/account/login');
    });

    it('logs in user', () => {
        cy.get('#user_email').type(buyer_login.email);
        cy.get('#user_password').type(buyer_login.password);
        cy.contains('Remember me').click();
        cy.get('#login-btn-buyer').click();
        cy.contains('30 Days Return', { timeout: 10000 }).should('exist');
    });
});
