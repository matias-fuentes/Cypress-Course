before(() => {
    cy.fixture('example').then(mockedData => {
        globalThis.mockedData = mockedData;
    });
});
