/// <reference types="cypress" />

import Shop from './pageObjects/shop';

Cypress.Commands.add('setToken', () => {
    cy.request('POST', `${Cypress.env('baseUrl')}/api/ecom/auth/login/`, {
        userEmail: 'MatiasDamianFuentes@outlook.es',
        userPassword: 'Pdj37x499l7uupll_',
    }).then(response => {
        expect(response.status).to.be.equal(200);
        const token: string = response.body.token;
        Cypress.env('token', token);
    });
});

const shop = new Shop();
Cypress.Commands.add('addToCart', productName => {
    shop.getProductTitles().each((productTitleEl: JQuery<HTMLElement>, index: number) => {
        let productTitle: string = productTitleEl.text();
        if (productTitle.indexOf(productName) !== -1) {
            shop.getCartBtns().eq(index).click();
        }
    });
});
