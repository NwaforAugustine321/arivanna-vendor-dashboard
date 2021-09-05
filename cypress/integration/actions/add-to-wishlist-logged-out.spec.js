/// <reference types="cypress" />

describe('Should NOT allow user to add to wishlist when logged out', () => {
    before(() => {
        cy.visit('/shop');
    });

    it('get product',()=>{
        cy.contains('iPhone 6s 32GB').click()
        cy.url({timeout:5000}).should('include','/product')
    })
});
