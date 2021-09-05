/// <reference types="cypress" />

const buyer_create = Cypress.env('buyer_create');
const api_route = Cypress.env('api_route');

describe('Should create buyer account', () => {
    before(() => {
        cy.visit('/account/register');
    });

    it('creates a buyer account', () => {
        cy.get('#user_first_name').type(buyer_create.user_first_name);
        cy.get('#user_last_name').type(buyer_create.user_last_name);
        cy.get('#user_phone_number').type(buyer_create.user_phone_number);
        cy.get('#user_email').type(buyer_create.user_email);
        cy.get('#country-select').type(buyer_create.country).type('{Enter}');
        cy.get('#city-select').type(buyer_create.city).type('{Enter}');
        Cypress.on('uncaught:exception', (err, runnable) => {
            if (err.message.includes('ResizeObserver loop limit exceeded')) {
                return false;
            }
        });
        cy.get('#user_password').type(buyer_create.medium_password);
        cy.contains('Medium').should('exist');
        cy.get('#user_password').clear();
        cy.get('#user_password').type(buyer_create.strong_password);
        cy.contains('Strong').should('exist');
        cy.get('#user_password').clear();
        cy.get('#user_password').type(buyer_create.weak_password);
        cy.contains('Weak').should('exist');
        cy.contains('I accept the terms and conditions').should('exist');
        cy.get('input[name="terms_and_condition_accepted"]').check();
        cy.wait(2000)
        cy.get('#create-account-btn').click();
        cy.contains('Email already exist',{ timeout: 10000 }).should('exist')
    });
});
