/// <reference types="cypress" />

describe('Shop route', () => {
    before(() => {
        cy.visit('/');
    });

    it('Go to shop', () => {
        cy.headerNavigationLinkText('SHOP');
        cy.url().should('include', '/shop');
    });

    it('Categories',()=>{
        cy.contains("CATEGORIES").should('exist')
    })   


});
