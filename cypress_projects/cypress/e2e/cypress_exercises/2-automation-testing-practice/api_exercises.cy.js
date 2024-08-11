/// <reference types="cypress" />


describe('API tests', () => {

    let urlProductsList;
    let urlBrandsList;
    

    before(() => {
        cy.fixture('urls.json').then((resultFixture) => {
            urlProductsList = resultFixture['urlProductsList']
            urlBrandsList = resultFixture['urlBrandsList']
        })
    })
  

    it('Products API Tests', () => {

        cy.request('GET', urlProductsList).then((response) => {
            cy.log(response.body)
            expect(response.status).to.be.oneOf([200, 201])
            expect(response.statusText).to.be.oneOf(['OK', 'Ok', 'ok'])
            const responseBodyString = JSON.parse(response.body);
            expect(responseBodyString.products.length).to.be.gte(0)
            expect(responseBodyString.responseCode).to.be.oneOf([200, 201])
        })

        cy.request('GET', urlBrandsList).then((response) => {
            cy.log(response.body)
            expect(response.status).to.be.oneOf([200, 201])
            expect(response.statusText).to.be.oneOf(['OK', 'Ok', 'ok'])
            const responseBodyString = JSON.parse(response.body);
            expect(responseBodyString.brands.length).to.be.gte(0)
            expect(responseBodyString.responseCode).to.be.oneOf([200, 201])
        })

    })



    it('Accounts API Tests', () => {

    })

    

})