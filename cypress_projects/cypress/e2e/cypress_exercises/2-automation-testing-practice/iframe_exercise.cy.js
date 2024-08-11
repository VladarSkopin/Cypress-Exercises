/// <reference types="cypress" />



describe('Working fith iFrames', () => {


    it('iFrames test', () => {
        cy.visit('https://the-internet.herokuapp.com/tinymce')

        cy.get('iframe#mce_0_ifr').then(($iframe) => {
            let iframe_body = $iframe.contents().find('body')

            cy.wrap(iframe_body)
                .clear()
                .type('Coffee with mineral water :(')
        })

    })

})


