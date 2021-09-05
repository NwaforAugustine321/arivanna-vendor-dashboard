/// <reference types="cypress" />

const api_route = Cypress.env('api_route');

describe('Should search for products', () => {
    before(() => {
        cy.visit('/');
    });

    it('Get categories dropdown', () => {
        cy.intercept({
            method: 'GET',
            url: `${api_route}product_categories`,
        }).as('getCategoriesFirst');

        cy.wait('@getCategoriesFirst');

        cy.get('#category-dropdown')
            .children()
            .each(($el, index, $listOfElements) => {
                let categoryName = $el.text();
                cy.get('#category-dropdown').select(categoryName);
            });

        cy.get('#search-bar').type('{Enter}');
        cy.contains('Search result for: ""').should('exist');
    });
});
