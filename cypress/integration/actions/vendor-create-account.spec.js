/// <reference types="cypress" />

const vendor_create = Cypress.env('vendor_create');
const api_route = Cypress.env('api_route');

describe('Should create buyer account', () => {
    before(() => {
        cy.visit('/account/register');
    });

    it('creates a vendor account', () => {
        cy.contains('Register as a seller').should('exist').click()

        cy.get('#company_name').type(vendor_create.company_name);
        cy.get('#company_address').type(vendor_create.company_address);
        cy.get('#company_description').type(vendor_create.company_description);
        cy.get('#user_first_name').type(vendor_create.user_first_name);
        cy.get('#user_last_name').type(vendor_create.user_last_name);
        cy.get('#user_phone_number').type(vendor_create.user_phone_number);
        cy.get('#user_email').type(vendor_create.user_email);
        cy.get('#country-select').type(vendor_create.country).type('{Enter}');
        cy.get('#city-select').type(vendor_create.city).type('{Enter}');
        Cypress.on('uncaught:exception', (err, runnable) => {
            if (err.message.includes('ResizeObserver loop limit exceeded')) {
                return false;
            }
        });
        cy.get('#user_password').type(vendor_create.medium_password);
        cy.contains('Medium').should('exist');
        cy.get('#user_password').clear();
        cy.get('#user_password').type(vendor_create.strong_password);
        cy.contains('Strong').should('exist');
        cy.get('#user_password').clear();
        cy.get('#user_password').type(vendor_create.weak_password);
        cy.contains('Weak').should('exist');
        cy.contains('I accept the terms and conditions').should('exist');
        cy.get('input[name="terms_and_condition_accepted"]').check();
        cy.wait(2000)
        cy.get('#create-account-btn').click();
        cy.contains('Email already exist',{ timeout: 10000 }).should('exist')
    });
});
