/// <reference types="cypress" />

describe('Rahul Shetty Academy courses webpage backend testing', () => {
    it('Backend testing', () => {
        cy.visit('https://rahulshettyacademy.com/angularAppdemo/');

        cy.intercept(
            {
                method: 'GET',
                url: 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty',
            },
            {
                body: [
                    {
                        book_name: 'null',
                        isbn: 'SPY40',
                        aisle: '2529857',
                    },
                ],
            }
        ).as('bookList');

        cy.get('button.btn.btn-primary').click();
        cy.wait('@bookList').should(bookList => {
            cy.get('tbody > tr').should('have.length', bookList.response.body.length);
            if (bookList.response.body.length === 1) {
                cy.get('app-library-dashboard > p').should('have.text', 'Oops only 1 Book available');
            }
        });
    });
});
