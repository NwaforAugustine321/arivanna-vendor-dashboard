describe('Route Contact Us', () => {
    before(() => {
        cy.visit('/');
    });

    it('Go to route', () => {
        cy.contains('CONTACT US').click({ force: true });
    });

    it('Contact us', () => {
        cy.contains('Media Relations').should('exist');
    });
});
