const { defineConfig } = require('cypress');
const cucumber: (options: object) => any = require('cypress-cucumber-preprocessor').default;
const browserify = require('@cypress/browserify-preprocessor');
const sqlServer = require('cypress-sql-server');
require('dotenv').config();

const options: object = {
    ...browserify.defaultOptions,
    typescript: require.resolve('typescript'),
};

module.exports = defineConfig({
    projectId: '2nxce4',
    viewportWidth: 1067,
    viewportHeight: 600,
    env: {
        baseUrl: 'https://rahulshettyacademy.com',
    },
    e2e: {
        setupNodeEvents(on: Cypress.PluginEvents, config: any) {
            const tasks: Cypress.Tasks = sqlServer.loadDBPlugin(config.db);
            on('task', tasks);
            on('file:preprocessor', cucumber(options));
        },
        specPattern: 'cypress/integration/**/*.{spec.ts,feature}',
        supportFile: 'cypress/support/index.ts',
    },
    hosts: {
        'auth.corp.com': '127.0.0.1',
    },
    db: {
        userName: process.env.USER,
        password: process.env.PASSWORD,
        server: process.env.SERVER,
        options: {
            database: process.env.DATABASE,
            encrypt: true,
            rowCollectionOnRequestCompletion: true,
        },
    },
});
