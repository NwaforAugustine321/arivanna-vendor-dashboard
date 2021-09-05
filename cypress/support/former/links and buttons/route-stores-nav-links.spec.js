describe('Route Stores navigation links', () => {
    before(() => {
        cy.visit('/stores');
    });

    it('Home', () => {
        cy.breadcrumbLink('Home');
        cy.go('back');
    });

    it('Visit Store 1', () => {
        cy.get('.ps-stores-items').within(() => {
            cy.get('a')
                .not('[href*="#"]')
                .then(($lis) => {
                    cy.wrap($lis[0]).click();
                });
        });
        cy.go('back');

        cy.get('.ps-stores-items').within(() => {
            cy.get('a')
                .not('[href*="#"]')
                .then(($lis) => {
                    cy.wrap($lis[1]).click();
                });
        });
        cy.go('back');
    });

    it('Visit Store 2', () => {
        cy.get('.ps-stores-items').within(() => {
            cy.get('a')
                .not('[href*="#"]')
                .then(($lis) => {
                    cy.wrap($lis[2]).click();
                });
        });
        cy.go('back');

        cy.get('.ps-stores-items').within(() => {
            cy.get('a')
                .not('[href*="#"]')
                .then(($lis) => {
                    cy.wrap($lis[3]).click();
                });
        });
        cy.go('back');
    });

    it('Visit Store 3', () => {
        cy.get('.ps-stores-items').within(() => {
            cy.get('a')
                .not('[href*="#"]')
                .then(($lis) => {
                    cy.wrap($lis[4]).click();
                });
        });
        cy.go('back');

        cy.get('.ps-stores-items').within(() => {
            cy.get('a')
                .not('[href*="#"]')
                .then(($lis) => {
                    cy.wrap($lis[5]).click();
                });
        });
    });
});
