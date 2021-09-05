describe('Header navigation links', () => {
    before(() => {
        cy.visit('/');
    });

    it('HOME', () => {
        cy.headerNavigationLinkText('HOME');
        cy.url().should('include', '/');
    });

    it('SHOP', () => {
        cy.headerNavigationLinkText('SHOP');
        cy.url().should('include', '/shop');
    });

    it('ABOUT US', () => {
        cy.headerNavigationLinkText('ABOUT US');
        cy.url().should('include', '/page/about-us');
    });

    it('CONTACT US', () => {
        cy.headerNavigationLinkText('CONTACT US');
        cy.url().should('include', '/page/contact-us');
    });

    it('STORES', () => {
        cy.headerNavigationLinkText('STORES');
        cy.url().should('include', '/stores');
    });

    it('Sell on Arivanna', () => {
        cy.headerNavigationLinkText('Sell on Arivanna');
        cy.url().should('include', '/vendor/become-a-vendor');
    });

    it('Track your order', () => {
        cy.headerNavigationLinkText('Track your order');
        cy.url().should('include', '/account/order-tracking');
    });

    it('Language check', () => {
        cy.contains('English').should('exist');
    });

    it('Wishlist', () => {
        cy.get('header[id="headerSticky"]').within(() => {
            cy.get('a[href*="/account/wishlist"]').click();
        });
        cy.url().should('include', '/account/wishlist');
    });

    it('Cart', () => {
        cy.get('header[id="headerSticky"]').within(() => {
            cy.get('i[class="icon-cart"]').click();
        });
    });

    it('Login', () => {
        cy.headerNavigationLinkText('Login');
        cy.url().should('include', '/account/login');
    });

    it('Register', () => {
        cy.headerNavigationLinkText('Register');
        cy.url().should('include', '/account/register');
    });
});
