/// <reference types="cypress" />

import './commands';
import FixturesType from '../integration/ecommerce.spec';

const sqlServer = require('cypress-sql-server');

declare global {
    namespace Cypress {
        interface Chainable {
            setToken(): Chainable<Element>;
            addToCart(productName: string): Chainable<Element>;
            sqlServer(query: string): Promise<Array<[number, string, string, string]>>;
        }
    }
    var mockedData: FixturesType;
}

sqlServer.loadDBCommands();
