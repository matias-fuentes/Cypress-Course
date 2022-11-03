/// <reference types="cypress" />

describe('Rahul Shetty Academy courses webpage backend testing and validation', () => {
    beforeEach(() => {
        cy.visit(`${Cypress.env('baseUrl')}/angularAppdemo/`);
    });

    const getBookUrl: string = '/Library/GetBook.php?AuthorName';
    it('"Only 1 book available" message appears when mocking data', () => {
        cy.intercept(
            {
                method: 'GET',
                url: `${Cypress.env('baseUrl') + getBookUrl}=shetty`,
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

    it('Intercepting and changing AuthorName id on request leads to a 404 status code', () => {
        cy.intercept('GET', `${Cypress.env('baseUrl') + getBookUrl}=shetty`, req => {
            req.url = `${Cypress.env('baseUrl') + getBookUrl}=malhotra`;
            req.continue(res => {
                expect(res.statusCode).to.be.equal(404);
            });
        }).as('changeAuthorNameIdReq');

        cy.get('button.btn.btn-primary').click();
        cy.wait('@changeAuthorNameIdReq');
    });

    it('Pure API testing', () => {
        interface PayloadType {
            name: string;
            isbn: string;
            aisle: string;
            author: string;
        }

        // Every time we run this test, 'isbn' and 'aisle' should be both uniques.
        const payload: PayloadType = {
            name: 'JavaScript tutorial book 2022',
            isbn: Math.random().toString(),
            aisle: Math.random().toString(),
            author: 'Rahul Shetty',
        };

        const addBookUrl: string = 'http://216.10.245.166/Library/Addbook.php';
        cy.request('POST', addBookUrl, payload).then(res => {
            expect(res.body).to.have.property('Msg', 'successfully added');
        });
    });
});
