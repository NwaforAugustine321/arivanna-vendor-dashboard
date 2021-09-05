describe('Route About Us', () => {
    before(() => {
        cy.visit('/');
    });

    it('Go to route', () => {
        cy.contains('ABOUT US').click({ force: true });
    });

    it('LEADERS', () => {
        cy.contains('Meet Our Leaders').should('exist');
    });
});
