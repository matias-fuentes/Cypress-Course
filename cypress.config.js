const { defineConfig } = require('cypress');
const cucumber = require('cypress-cucumber-preprocessor').default;

module.exports = defineConfig({
    projectId: '2nxce4',
    viewportWidth: 1366,
    viewportHeight: 768,
    env: {
        baseUrl: 'https://rahulshettyacademy.com',
    },
    e2e: {
        setupNodeEvents(on, config) {
            on('file:preprocessor', cucumber());
        },
        specPattern: 'cypress/integration/*.js',
    },
});
