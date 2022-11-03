class Shop {
    getProductTitles() {
        return cy.get('h4.card-title > a');
    }

    getCartBtns() {
        return cy.get('button.btn.btn-info');
    }

    getCheckoutBtn() {
        return cy.get(
            '#navbarResponsive > .navbar-nav > .nav-item > .nav-link'
        );
    }
}

export default Shop;
