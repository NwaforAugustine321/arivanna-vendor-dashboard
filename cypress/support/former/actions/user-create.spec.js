describe('Should register user', () => {
    const development = true;

    const user = {
        firstName: 'Kobe',
        lastName: 'Bryant',
        email: 'kobe@mail.com',
        phone: 676998,
        password: 'bryant',
    };

    const vendor = {
        companyName: 'Gioron consulting',
        address: 'Aussie',
        phone: 676999,
        desc: 'Blockchain technology',
        email: 'gioron@mail.com',
    };

    it('As buyer', () => {
        cy.visit('/account/register', { timeout: 20000 });
        cy.get('#user_first_name').type(user.firstName);
        cy.get('#user_last_name').type(user.lastName);
        cy.get('#user_phone_number').type(user.phone);
        cy.get('#user_email').type(user.email);
        cy.get('#user_password').type(user.password);

        if (development) {
            cy.intercept('POST', 'http://localhost:3000/api/user_create').as(
                'registering'
            );
        } else {
            cy.intercept(
                'POST',
                'https://4l0nq44u0k.execute-api.us-east-2.amazonaws.com/staging/api/user_create'
            ).as('registering');
        }

        cy.get('button[type="submit').click({ timeout: 10000 });

        cy.wait('@registering').then((intercept) => {
            if (intercept.response.body.status) {
                cy.log(intercept.response.body.data);
            } else {
                expect(intercept.response.body).to.deep.equal({
                    success: false,
                    api: 'User create',
                    data: 'Email already exist',
                });
            }
        });
    });

    it('As vendor', () => {
        cy.visit('/account/register', { timeout: 20000 });
        cy.get('#checkbox').click();
        cy.get('#company_name').type(vendor.companyName);
        cy.get('#company_address').type(vendor.address);
        cy.get('#company_description').type(vendor.desc);
        cy.get('#user_phone_number').type(vendor.phone);
        cy.get('#user_email').type(vendor.email);
        cy.get('#user_password').type(user.password);

        if (development) {
            cy.intercept(
                'POST',
                'http://localhost:3000/api/vendor_create_now'
            ).as('registering');
        } else {
            cy.intercept(
                'POST',
                'https://4l0nq44u0k.execute-api.us-east-2.amazonaws.com/staging/api/user_create'
            ).as('registering');
        }

        cy.get('button[type="submit').click({ timeout: 10000 });

        cy.wait('@registering').then((intercept) => {
            if (intercept.response.body.status) {
                cy.log(intercept.response.body.data);
            } else {
                expect(intercept.response.body).to.deep.equal({
                    success: false,
                    api: 'Vendor create now',
                    data: 'Email already exist',
                });
            }
        });
    });
});
