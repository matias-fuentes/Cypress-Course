/// <reference types="cypress" />

import { Given, When, And, Then } from 'cypress-cucumber-preprocessor/steps';

import Shop from '../../../support/pageObjects/shop';
import HomePage from '../../../support/pageObjects/homepage';

const homePage = new HomePage();

// First scenario.

Given('we open the eCommerce page', () => {
    cy.visit(Cypress.env('baseUrl') + '/angularpractice/');
});

When('we go to the Shop section and add products to the cart', () => {
    homePage.getShopBtn().click();

    /* 4) "Create a function which, in the Shops section, based on the name of the product that
    we sent as an argument, it adds that specified product to the cart": */
    globalThis.mockedData.productNames.forEach(productName => {
        cy.addToCart(productName);
    });

    const shopPage = new Shop();
    shopPage.getCheckoutBtn().click();
});

And("validate that the total price it's correct", () => {
    let totalSum: number = 0;
    cy.get('tr > td.col-sm-1:nth-child(4) > strong').each(productTotalEl => {
        let productTotal: string | number = productTotalEl.text();
        productTotal = +productTotal.substring(3, productTotal.length);
        totalSum += productTotal;
    });
    cy.get('td.text-right > h3 > strong').then(totalEl => {
        let total: string | number = totalEl.text();
        total = +total.substring(3, total.length);
        expect(total).to.be.equal(totalSum);
    });
});

Then("we select a country, accept the Terms & Conditions and check if the success message it's visible or not", () => {
    cy.contains('Checkout').click();
    cy.get('#country').type('India');
    cy.get('.suggestions > ul > li > a', { timeout: 8000 }).click();
    cy.get('#checkbox2').click({ force: true });
    cy.get('input[type="submit"]').click();
    cy.get('.alert').should('be.visible');
});

// Second scenario.

let name: string;

When('we fill the form details', dataTable => {
    const formData = dataTable.rawTable[1];
    name = formData[0];
    const gender = formData[1];

    homePage.getNameInput().type(name);
    homePage.getGenderInput().select(gender);
});

Then('we validate the form behaviour', () => {
    homePage.getTwoWayDataBindingInput().should('have.value', name);
    homePage.getNameInput().should('have.attr', 'minlength', '2');
    homePage.getEntrepreneurRadioBtn().should('be.disabled');
});
