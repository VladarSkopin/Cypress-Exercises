/// <reference types="cypress" />

describe('My first Cypress test !!!', () => {

    beforeEach(() => {
        cy.visit('https://crossbrowsertesting.github.io/selenium_example_page.html')
    })

    it('visiting the page', () => {
        cy.get('title').should('contain', 'Selenium Test Example Page')
        cy.get('#intro').should('exist').and('contain', 'Selenium Tests')
    })

    it('checking list elements', () => {
        cy.get('p').eq(1).should('contain', 'Unordered List').and('be.visible')
        cy.get('ul.list li').should('have.length', 4)
        // ===
        // cy.get('ul[class="list"] li').should('have.length', 4)
        cy.get('ul.list li').first().should('contain', 'One').and('be.visible')
        // ===
        //cy.get('ul.list li').first().invoke('text').should('contain', 'One')
        cy.get('ul.list li').last().should('contain', 'Four').and('be.visible')

        cy.wait(500)
    })

    it('checking button elements and links', () => {
        cy.get('p').eq(2).should('contain', 'Links and buttons')
        cy.get('#button-message').should('be.not.visible')
        cy.get('#btn').click()
        cy.get('#button-message').should('be.visible').and('have.text', ' I am the message!! ')
        cy.get('a').should('exist').click()
        cy.get('h2').should('have.text', 'Selenium Example Page 2').and('be.visible')
        cy.get('p').should('contain', 'I am content on page 2!').and('be.visible')
        cy.wait(1000)
        cy.go(-1)
    })

    it('checking input elements', () => {
        cy.get('p').eq(3).should('contain', 'Form Elements').and('be.visible')
        cy.get('input').should('exist').and('have.length', 5).and('be.visible')
        cy.get('input[type="text"]').should('have.attr', 'placeholder', 'Input Text Here').click().type('Garrett')

        cy.get('input[type="checkbox"]').should('not.be.checked').check().should('be.checked').and('be.visible')

        cy.get('select').select(0).should('contain', 'Option 1').wait(100).then(() => {
            cy.get('select').select(1).wait(100)
        }).then(() => {
            cy.get('select').select(2).wait(100)
        }).then(() => {
            cy.get('select').select(3)
        })
        
        cy.get('input#radiobtn1').click()
        cy.get('input[type="radio"]').eq(1).click()

        cy.get('textarea').then(($element) => {
            const width = $element.width();
            const height = $element.height();

            console.log(`TextArea width = ${width}`)  // 157
            console.log(`TextArea height = ${height}`)  // 40

            cy.wrap(width).should('be.gt', 150).and('be.lt', 300)
            cy.wrap(height).should('be.gt', 30).and('be.lt', 60)
        })
        cy.get('textarea').type('Yongzheng Nikita Markiz')

        cy.get('#submitbtn').should('have.value', 'Submit').and('be.visible').click()

        cy.wait(2000)

        cy.get('h2').eq(1).should('have.text', 'Exiting before submit').and('be.visible')
        cy.get('p').eq(4).should('contain', 'Form Results').and('be.visible')

        cy.get('div').eq(6).find('span').eq(0).should('be.visible').and('have.text', 'text')
        cy.get('div').eq(6).find('span').eq(1).should('be.visible').and('have.text', 'Garrett')

        cy.get('div').eq(7).find('span').eq(0).should('be.visible').and('have.text', 'checkbox')
        cy.get('div').eq(7).find('span').eq(1).should('be.visible').and('have.text', 'on')

        cy.get('div').eq(8).find('span').eq(0).should('be.visible').and('have.text', 'select')
        cy.get('div').eq(8).find('span').eq(1).should('be.visible').and('have.text', 'option4')

        cy.get('div').eq(9).find('span').eq(0).should('be.visible').and('have.text', 'radio')
        cy.get('div').eq(9).find('span').eq(1).should('be.visible').and('have.text', 'radio2')

        cy.get('div').eq(10).find('span').eq(0).should('be.visible').and('have.text', 'textarea')
        cy.get('div').eq(10).find('span').eq(1).should('be.visible').and('have.text', 'Yongzheng Nikita Markiz')

    })


    it('checking the footer', () => {
        cy.get('h4').should('be.visible').and('have.text', 'Search in Google')
        cy.get('button').eq(2).should('be.visible').and('have.text', 'Exit').click();

        cy.screenshot('exercises/popups/screenshot_1', { overwrite: true })
    })

})