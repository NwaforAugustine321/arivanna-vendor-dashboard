describe('Route Products navigation links', () => {
    before(() => {
        cy.visit('/');
    });

    it('Go to route', () => {
        cy.contains('Products').click({ force: true });
    });

    it('Home', () => {
        cy.breadcrumbLink('Home');
        cy.go('back');
    });

    it('Shop', () => {
        cy.breadcrumbLink('Shop');
        cy.location('pathname').should('eq', '/shop');
        cy.go('back');
        // cy.location('pathname').should('eq', '/product/all');
    });

    // it('Brand:', () => {
    //     cy.get('.ps-product__meta').find('a').click();
    //     cy.go('back');
    // });

    // it('Sold By:', () => {
    //     cy.get('.ps-product__desc').find('a').click({ force: true });
    // });
});
