/// <reference types="cypress" />

describe('My first block of tests', () => {
    it('Learning Cypress', () => {
        cy.visit(Cypress.env('baseUrl') + '/seleniumPractise/#/');

        /* Gets the search bar, types 'ca', checks if there are only four products being displayed
        and adds to the cart one unit of cashews. */
        cy.get('.search-keyword').type('ca');
        cy.wait(2000);
        cy.get('.product:visible').as('product');
        cy.get('@product').should('have.length', 4);
        cy.get('@product').each($product => {
            const productName = $product.find('h4.product-name').text();
            if (productName === 'Cashews - 1 Kg') {
                $product.find('button').trigger('click');
            }
        });

        // Gets the brand title, and logs its text.

        /* Remember that since the text() method it's part from the jQuery terminology and not from Cypress,
        it's not gonna be resolved automatically through the parent child chaining. So you'll have
        to resolve it manually with then(). */
        cy.get('.brand').then(brand => {
            cy.log(brand.text());
        });
    });

    it('Checkout process', () => {
        cy.get('.cart-icon > img').click();
        cy.get('.cart-preview > .action-block > button').click();
        cy.contains('Place Order').click();
    });
});
