describe('Route Track your order navigation links', () => {
    before(() => {
        cy.visit('/account/order-tracking');
    });
    it('Home', () => {
        cy.breadcrumbLink('Home');
        cy.go('back');
    });

    it('Track your order', () => {
        cy.get('main').within(() => {
            cy.get('button').click();
        });
    });
});
