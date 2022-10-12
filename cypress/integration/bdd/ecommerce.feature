Feature: E2E eCommerce testing validation

    @purchaseTest
    Scenario: E2E eCommerce testing validation with simulation of product purchase procedure
        Given we open the eCommerce page
        When we go to the Shop section and add products to the cart
        And validate that the total price it's correct
        Then we select a country, accept the Terms & Conditions and check if the success message it's visible or not

    @formTest
    Scenario: Homepage form validation
        Given we open the eCommerce page
        When we fill the form details

            | name | gender |
            | Bob  | Female |

        Then we validate the form behaviour