/// <reference types="cypress" />

describe('Route Home Page', () => {
    before(() => {
        cy.visit('/');
    });

    it('New Arrivals', () => {
        cy.contains('Hot New Arrivals').should('exist');
    });
    
    // it('Deals', () => {
    //     cy.contains('Deals of the day');
    // });
});
