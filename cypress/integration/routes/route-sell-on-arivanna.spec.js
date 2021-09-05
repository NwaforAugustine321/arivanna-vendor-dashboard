describe('Route Sell on Arivanna', () => {
    before(() => {
        cy.visit('/');
    });

    it('Go to route', () => {
        cy.contains('Sell on Arivanna').click({ force: true });
    });

    it('Our shoppers', () => {
        cy.contains('Our Shoppers Can’t Wait').should('exist')
    });

    it('Start selling', () => {
       cy.contains('Start Selling').click()
       cy.url().should('include','/account/register')
    });
});
