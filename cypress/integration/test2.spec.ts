/// <reference types="cypress" />
/// <reference types="cypress-iframe" />

import 'cypress-iframe';

describe('My second block of tests', () => {
    it('Handling all kind of HTML elements', () => {
        cy.visit(Cypress.env('baseUrl') + '/AutomationPractice/');

        // Radio buttons and checkboxes.
        cy.get('[value="radio2"]').check().should('be.checked');

        cy.get('#checkBoxOption1').as('checkbox1');
        cy.get('@checkbox1')
            .check()
            .should('be.checked')
            .and('have.value', 'option1');
        cy.get('@checkbox1').uncheck().should('not.be.checked');
        // 'option2' and 'option3' are part of the 'value' property within the checkbox element.
        cy.get('input[type="checkbox"]').check(['option2', 'option3']);

        // Selects.

        // Static selects.
        cy.get('select').select('option2').should('have.value', 'option2');

        // Dynamic selects.
        cy.get('#autocomplete').type('ind');
        /* Remember that with each(), each element that it's iterating, it's also resolved, so you don't
        have to resolve any Promise with the text() method. */
        cy.get('.ui-menu-item-wrapper').each($selectOption => {
            if ($selectOption.text() === 'India') {
                $selectOption.trigger('click');
            }
        });
        cy.get('#autocomplete').should('have.value', 'India');

        // Switch elements.
        // Cypress does not support any kind of switch elements. However, there are two workarounds for this:

        // 1) Get the href attribute | Switch windows.
        // Also, keep in mind that Cypress does not support cross-origin domain visits.
        cy.get('#opentab').then($switchElement => {
            const url = $switchElement.prop('href');
            cy.visit(url);
            cy.go('back');
        });

        // 2) Remove the target attribute | Switch tabs.
        cy.get('#opentab').invoke('removeAttr', 'target').click();
        cy.url().should('include', 'rahulshettyacademy');
        cy.go('back');

        // Pop-ups.

        /* Keep in mind that Cypress will automatically accept any pop-up that might appear.
        You cannot change it. */
        cy.get('#alertbtn').click();
        cy.get('[value="Confirm"]').click();
        /* However, you can have some validation if you fire the pop-up events (window:alert and
        window:confirm) through the on() method while extracting its text. */
        cy.on('window:alert', alertMessage => {
            expect(alertMessage).to.equal(
                'Hello , share this practice page and share your knowledge'
            );
        });
        cy.on('window:confirm', confirmMessage => {
            expect(confirmMessage).to.equal(
                'Hello , Are you sure you want to confirm?'
            );
        });

        // Elements with a visibility property.
        cy.get('#hide-textbox').click();
        cy.get('#displayed-text').should('not.be.visible');
        cy.get('#show-textbox').click();
        cy.get('#displayed-text').should('be.visible');

        // Tables.

        /* Remember that with the next() function you can select the next sibling element of a selected element.
        This only works if you have previously selected the element with the get() method.
        Also keep in mind that you cannot automatically resolve parent child chaining objects if you combine
        jQuery functions with Cypress functions. It will only work if you use only Cypress functions.
        However, if you want to combine both types of functions, you can resolve them manually with then(). */
        cy.get('tr td:nth-child(2)').each(($course, index) => {
            if ($course.text().indexOf('Python') !== -1) {
                cy.get('tr td:nth-child(3)')
                    .eq(index)
                    .then($coursePrice => {
                        const coursePrice = $coursePrice.text();
                        expect(coursePrice).to.equal('25');
                    });
            }
        });

        // Mouse hover elements.

        /* Cypress does not handle mouse hover elements. Alternatively, you must use the invoke('show') method
        from jQuery.
        However, if what you're trying to achieve it's to click on an element which only appears when you
        hover on its parent, but without needing to hover first, instead what you can do it's to force the click
        on that desired element. You can achieve this by enabling { force: true } on the desired element. */

        // cy.get('.mouse-hover-content').invoke('show');
        cy.contains('Top').click({ force: true });
        cy.url().should('include', 'top');

        // iFrames.
        cy.frameLoaded('#courses-iframe');
        cy.iframe().find("a[href='mentorship']").eq(0).click();
        cy.wait(2000);
        cy.iframe().find('.pricing-title').should('have.length', 2);
    });
});
