describe('Should log in user', () => {
    beforeEach(() => {
        cy.visit('/account/login', { timeout: 20000 });
    });
    const email = 'kyle@mail.com';
    // const phone = 23990;
    const password = 'clone';

    it('with email', () => {
        cy.logIn();

        cy.location('pathname').should('eq', '/');
    });

    // it('with phone number', () => {
    //     cy.get('input[name="user_login"]').type(phone);

    //     cy.get('input[name="user_password"]').type(password);

    //     cy.get('button[type="submit"]').click({ timeout: 10000 });

    //     cy.intercept(
    //         'POST',
    //         'https://4l0nq44u0k.execute-api.us-east-2.amazonaws.com/staging/api/user_login'
    //     ).as('loggingIn');

    //     cy.wait('@loggingIn');

    //     cy.location('pathname').should('eq', '/');
    // });
});
