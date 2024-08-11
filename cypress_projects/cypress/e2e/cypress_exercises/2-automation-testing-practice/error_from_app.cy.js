/// <reference types="cypress" />



describe('Fixing Error Generating from Application', () => {


    Cypress.on('uncaught:exception', (err, runnable) => {
        // Returning false here prevents Cypress from failing the test
        return false;
    })

    it('Uncaught Exceptions in the Console', () => {

        cy.visit('https://demo.automationtesting.in/Frames.html')

        cy.get('iframe#singleframe').then(($iframe) => {
            let iframe_body_input = $iframe.contents().find('body').find('input')
            cy.wrap(iframe_body_input).clear().type('Doggy loves Sophie').then(() => {
                cy.wrap(iframe_body_input).should('contain', 'Doggy loves Sophie')  // Supposted to work, but the website constantly reloads
            })
            
        })
    })

})