describe('Footer navigation links', () => {
    before(() => {
        cy.visit('/');
    });

    it('Terms, Conditions & Policies', () => {
        cy.footerNavigationLink('Terms, Conditions & Policies');
        cy.url().should('include', '/terms');
    }); 
    
   it('Returns & Refunds', () => {
        cy.footerNavigationLink('Returns & Refunds');
        cy.url().should('include', '/returns-and-refunds');
    }); 
    
    it('FAQs', () => {
        cy.footerNavigationLink('FAQs');
        cy.url().should('include', '/faqs');
    });

    it('About Us', () => {
        cy.footerNavigationLink('About Us');
        cy.url().should('include', '/page/about-us');
    });

    it('Contact', () => {
        cy.get('footer[class="ps-footer"]').within(() => {
            cy.get('li').contains('Contact').click();
        });
        cy.url().should('include', '/page/contact-us');
    });

    it('Checkout', () => {
        cy.footerNavigationLink('Checkout');
        cy.url().should('include', '/account/checkout');
    }); 

    it('Shop', () => {
        cy.footerNavigationLink('Shop');
        cy.url().should('include', '/shop');
    });
});
