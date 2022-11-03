/// <reference types="cypress" />

context('Waiting', () => {
    let users: [number, string, string, string][];
    beforeEach(() => {
        cy.visit('https://example.cypress.io/commands/waiting');
        cy.sqlServer('SELECT * FROM Users').then(usersResponse => (users = usersResponse));
    });

    it('Cypress DB testing with Cypress SQL Server', () => {
        cy.get('.wait-input1').type(users[0][1]);
        cy.wait(1000);
        cy.get('.wait-input2').type(users[1][1]);
        cy.wait(1000);
        cy.get('.wait-input3').type('Wait 1000ms after typing');
        cy.wait(1000);
    });
});
