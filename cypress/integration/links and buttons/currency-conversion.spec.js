/// <reference types="cypress" />

describe('Should convert the currency', () => {
    before(() => {
        cy.visit('/');
    });

    it('Get currency dropdown', () => {
        // cy.contains('AUD').click({ force: true });
        cy.contains('AUD').should('exist').click({ force: true });
    });
});
