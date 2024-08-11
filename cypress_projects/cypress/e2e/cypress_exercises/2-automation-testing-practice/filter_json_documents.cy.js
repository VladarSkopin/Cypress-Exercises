/// <reference types="cypress" />

describe('Parse JSON response', () => {
  
    it('invoke response, mock it and parse', () => {

        cy.visit('https://catfact.ninja/#/Breeds/getBreeds')

        cy.get('button[class="btn try-out__btn"]').click()

        cy.intercept('GET', 'https://catfact.ninja/breeds', {
            statusCode: 200,
            fixture: 'documents.json'
          }).as('getDealInfo');

        cy.get('button[class="btn execute opblock-control__btn"]').click()


        let activeDocuments = []

        cy.wait('@getDealInfo').then((interception) => {
          //expect(interception.response.body.documents).length.to.equal(4);
          console.log('RESPONSE BODY:')
          console.log(interception.response.body)

          activeDocuments = interception.response.body.documents.filter(doc =>
            doc.data.status === "EDITING" &&
            doc.data.year === 2023 &&
            doc.data.period === 3
          ).map(doc => doc.id);

        }).then(() => {
          console.log('ONLY ACTIVE DOCUMENTS:')
          console.log(activeDocuments)
          console.log(activeDocuments.length)  // 1
          console.log(activeDocuments[0])  // 654123
          console.log(activeDocuments[1])  // undefined
        })


    })
})