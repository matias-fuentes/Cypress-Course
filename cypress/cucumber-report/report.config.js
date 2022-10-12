const report = require('multiple-cucumber-html-reporter');

report.generate({
    jsonDir: 'cypress/cucumber-report',
    reportPath: 'cypress/cucumber-report/html',
    metadata: {
        browser: {
            name: 'msedge',
            version: '106',
        },
        device: 'Local test machine',
        platform: {
            name: 'windows',
            version: '11 Pro',
        },
    },
    customData: {
        title: 'Run info',
        data: [
            { label: 'Project', value: 'eCommerce webpage' },
            { label: 'Release', value: '1.0.0' },
            { label: 'Execution Start Time', value: new Date() },
            { label: 'Execution End Time', value: new Date() },
        ],
    },
});
