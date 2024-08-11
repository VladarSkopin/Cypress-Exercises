/// <reference types="cypress" />
require('@4tw/cypress-drag-drop')  // To install this plugin: npm install --save-dev @4tw/cypress-drag-drop


describe('Simple Drag and Drop example', () => {
    
    it('Drag and Drop Test', () => {
        cy.visit('https://crossbrowsertesting.github.io/drag-and-drop.html')

        cy.get('h1').should('be.visible').and('have.text', 'Drag and Drop example for Selenium Tests')
        cy.get('h4>em').should('be.visible').and('have.text', 'CrossBrowserTesting.com')
        cy.get('#draggable>p').should('have.text', 'Drag me to my target')
        cy.get('#droppable>p').should('have.text', 'Drop here')

        //cy.get('#draggable').drag('#droppable', { force: true })
        cy.get('#draggable').drag('#droppable', { force: true }).then((success) => {
            // Assert that the drag operation was successful
            expect(success).to.be.true
            cy.wrap(success).should('eq', true)  // same 
          })


    })
})