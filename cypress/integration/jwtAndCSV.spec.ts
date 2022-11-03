/// <reference types="cypress" />

import neatCsv = require('neat-csv');

describe('Inject a JWT cookie to the browser and handles CSV and downloaded files', () => {
    it('Inject a JWT cookie to the browser and handles CSV and downloaded files', () => {
        // Inject the JWT cookie.
        cy.setToken().then(() => {
            cy.visit(`${Cypress.env('baseUrl')}/client`, {
                onBeforeLoad: window => {
                    window.localStorage.setItem('token', Cypress.env('token'));
                },
            });
        });

        // Add a product to the cart and store its name.
        cy.get('.card-body').eq(0).contains('Add To Cart').click();
        let productName: string;
        cy.get('.card-body')
            .eq(0)
            .find('h5 > b')
            .then(productNameEl => {
                productName = productNameEl.text();
            });

        // Simulates the entire purchase procedure, and downloads the order details CSV file.
        cy.get('button[routerlink="/dashboard/cart"]').click();
        cy.contains('Checkout').click();
        cy.get('.form-group > .input').type('Argentina');
        cy.get('span.ng-star-inserted').contains('Argentina').click();
        cy.get('.btnn').click();
        cy.wait(2000);
        cy.get('.btn-primary').click();

        // Extract the content from the CSV file and convert it to a JavaScript object.
        cy.readFile<string>(
            Cypress.config('fileServerFolder') + '/cypress/downloads/order-invoice_MatiasDamianFuentes.csv'
        )
            .then(csvText => neatCsv(csvText))
            .then(csvJSONText => {
                let csvProductName: string = csvJSONText[0]['Product Name'];
                expect(productName).to.be.equal(csvProductName);
            });
    });
});
