/// <reference types="cypress" />

import HomePage from '../support/pageObjects/homepage';
import Shop from '../support/pageObjects/shop';

interface FixturesType {
    name: string;
    gender: string;
    productNames: string[];
}

describe('eCommerce tests', () => {
    /* All setup related configuration should be written inside Cypress hooks, including loading
    the fixtures folder. */
    before(() => {
        cy.fixture('example').then((mockedData: FixturesType) => {
            globalThis.mockedData = mockedData;
        });
    });

    it('eCommerce tests', () => {
        // We create a new instance of the HomePage class to access all of its functions.
        const homePage = new HomePage();

        // We type on the 'name' and 'gender' fields by driving the data from the fixtures folder.
        cy.visit(Cypress.env('baseUrl') + '/angularpractice/');
        homePage.getNameInput().type(globalThis.mockedData.name);
        homePage.getGenderInput().select(globalThis.mockedData.gender);

        /* 1) Check if whatever we type in the 'name' input it's correctly two-way binded on the 'Two-way Data
        Binding Example' input.*/
        homePage
            .getTwoWayDataBindingInput()
            .should('have.value', globalThis.mockedData.name);

        // 2) Check if the 'name' field has a 'minlength' attribute with a value of '2'.
        homePage.getNameInput().should('have.attr', 'minlength', '2');

        // 3) Check if the 'Entrepreneur' checkbox is disabled or not.
        homePage.getEntrepreneurRadioBtn().should('be.disabled');

        /* 4) Create a function which, in the Shops section, based on the name of the product that
        we sent as an argument, it adds that specified product to the cart. */
        homePage.getShopBtn().click();
        globalThis.mockedData.productNames.forEach(productName => {
            cy.addToCart(productName);
        });

        /* 5) Simulate the entire purchase procedure and check if the sum of the products in the cart
        it's the same as the total number. */
        const shopPage = new Shop();
        shopPage.getCheckoutBtn().click();

        // We check the sum...
        let totalSum: number = 0;
        cy.get('tr > td.col-sm-1:nth-child(4) > strong').each(
            productTotalEl => {
                let productTotal: string | number = productTotalEl.text();
                productTotal = +productTotal.substring(3, productTotal.length);
                totalSum += productTotal;
            }
        );
        cy.get('td.text-right > h3 > strong').then(totalEl => {
            let total: string | number = totalEl.text();
            total = +total.substring(3, total.length);
            expect(total).to.be.equal(totalSum);
        });

        // ...and finally we simulate the entire purchase process.
        cy.contains('Checkout').click();
        cy.get('#country').type('India');
        cy.get('.suggestions > ul > li > a', { timeout: 8000 }).click();
        cy.get('#checkbox2').click({ force: true });
        cy.get('input[type="submit"]').click();
        cy.get('.alert').should('be.visible');
    });
});

export default FixturesType;
