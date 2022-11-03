/// <reference types="cypress" />

import FixturesType from '../../ecommerce.spec';

before(() => {
    cy.fixture('example').then((mockedData: FixturesType) => {
        globalThis.mockedData = mockedData;
    });
});
