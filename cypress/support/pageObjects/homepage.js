/* The 'pageObjects' folder it's very useful to centralize all of our selectors within classes.
With this, if any change is made up on the HTML of the page, then we can modify all of our
selectors accordingly in just one place. */

class HomePage {
    getNameInput() {
        return cy.get('input[name="name"]:nth-child(2)');
    }

    getGenderInput() {
        return cy.get('select');
    }

    getTwoWayDataBindingInput() {
        return cy.get('input[name="name"]:nth-child(1)');
    }

    getEntrepreneurRadioBtn() {
        return cy.get('#inlineRadio3');
    }

    getShopBtn() {
        return cy.get('a[href="/angularpractice/shop"]');
    }
}

export default HomePage;
