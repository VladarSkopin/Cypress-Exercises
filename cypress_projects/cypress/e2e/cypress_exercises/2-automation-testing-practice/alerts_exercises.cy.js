/// <reference types="cypress" />


describe('Handling JS alerts', () => {

    beforeEach(() => {
        cy.visit('https://the-internet.herokuapp.com/javascript_alerts')
    })


    it('Simple Alert Window', () => {
        cy.get('li:nth-child(1) > button').click()
        
        cy.on('window:alert', (alert_text) => {
            //cy.wrap(alert_text).should('contain', 'I am a JS Alert')  DOES NOT WORK !!!
            expect(alert_text).to.contain('I am a JS Alert')  // WORKS OK
        }).then(() => {
            cy.contains('#result', 'You successfully clicked an alert')
        })
    })


    it('Confirm Window - Accept', () => {
        cy.get('li:nth-child(2) > button').click()

        cy.on('window:confirm', (accept_confirm) => {
            expect(accept_confirm).to.contain('I am a JS Confirm')
        }).then(() => {
            cy.contains('#result', 'You clicked: Ok')
        })
    })

    it('Confirm Window - Cancel', () => {
        cy.get('li:nth-child(2) > button').click()

        cy.on('window:confirm', (accept_confirm) => {
            return false;
        }).then(() => {
            cy.contains('#result', 'You clicked: Cancel')
        })
    })


    it('Prompt Window', () => {
        let typed_text = 'Alex is doing some magic'

        cy.window().then((prompt_alert) => {
            // Stub windows Prompt
            cy.stub(prompt_alert, 'prompt').returns(typed_text)
            cy.get('li:nth-child(3) > button').click()
            cy.contains('#result', typed_text)
        })
    })


    
})