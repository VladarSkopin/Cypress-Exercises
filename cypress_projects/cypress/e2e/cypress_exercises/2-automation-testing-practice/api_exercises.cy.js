/// <reference types="cypress" />

import { containsKey } from "../../../support/utils";


describe('API tests', () => {

    let urlProductsList;
    let urlBrandsList;
    let healthCheck;
    let usersRegister;
    let usersLogin;
    

    before(() => {
        cy.fixture('urls.json').then((resultFixture) => {
            urlProductsList = resultFixture['urlProductsList']
            urlBrandsList = resultFixture['urlBrandsList']
            healthCheck = resultFixture['healthCheck']
            usersRegister = resultFixture['usersRegister']
            usersLogin = resultFixture['usersLogin']
        })
    })
  

    it('Products API Tests', () => {

        cy.request('GET', urlProductsList).then((response) => {
            cy.log(response.body)
            expect(response.status).to.be.oneOf([200, 201])
            expect(response.statusText).to.be.eq('OK')
            const responseBodyString = JSON.parse(response.body);
            expect(responseBodyString.products.length).to.be.gte(0)
            expect(responseBodyString.responseCode).to.be.oneOf([200, 201])
        })

        cy.request('POST', urlProductsList).then((response) => {
            cy.log(response.body)
            expect(response.status).to.be.oneOf([200, 201])
            const responseBodyString = JSON.parse(response.body);
            expect(responseBodyString.responseCode).to.be.oneOf([400, 404, 405])  // POST method is not supported
        })

        cy.request('GET', urlBrandsList).then((response) => {
            cy.log(response.body)
            expect(response.status).to.be.oneOf([200, 201])
            expect(response.statusText).to.be.eq('OK')
            const responseBodyString = JSON.parse(response.body);
            expect(responseBodyString.brands.length).to.be.gte(0)
            expect(responseBodyString.responseCode).to.be.oneOf([200, 201])
        })

        cy.request('PUT', urlProductsList).then((response) => {
            cy.log(response.body)
            expect(response.status).to.be.oneOf([200, 201])
            const responseBodyString = JSON.parse(response.body);
            expect(responseBodyString.responseCode).to.be.oneOf([400, 404, 405])  // PUT method is not supported
        })


    })



    it('User Profiles API Tests', () => {

        cy.request('GET', healthCheck).then((response) => {
            cy.log(response.body)
            expect(response.status).to.be.oneOf([200, 201])
            expect(response.statusText).to.be.eq('OK')
            expect(response.body.success).to.be.true
            expect(response.body.message).to.eq('Notes API is Running')
        })

        // Create random User data

        let random_suffix = Cypress._.random(100, 999)

        const formData = {
            name: 'Garrett_' + random_suffix,
            email: `garret${random_suffix}@gmail.com`,
            password: 'qwerty1234'
        }

        // To create (register) a new User
        cy.request({
            method: 'POST', 
            url: usersRegister,
            form: true,
            body: formData
        }).then((response) => {
            cy.log(response.body)
            expect(response.status).to.be.oneOf([200, 201])
            expect(response.statusText).to.be.oneOf(['Created', 'OK'])
            expect(response.body.success).to.be.true
            expect(response.body.message).to.eq('User account created successfully')
            expect(response.body.data.id).to.exist
            expect(response.body.data.name).to.eq(formData.name)
            expect(response.body.data.email).to.eq(formData.email)
        })


        // To login as a new User
        cy.request({
            method: 'POST', 
            url: usersLogin,
            form: true,
            body: { email: formData.email, password: formData.password }
        }).then((response) => {
            cy.log(response.body)
            expect(response.status).to.be.oneOf([200, 201])
            expect(response.statusText).to.be.oneOf(['Created', 'OK'])
            expect(response.body.success).to.be.true
            expect(response.body.message).to.eq('Login successful')
            expect(response.body.data.id).to.exist
            expect(response.body.data.name).to.eq(formData.name)
            expect(response.body.data.email).to.eq(formData.email)
            expect(response.body.data.token).to.exist
            expect(response.body.data.token).to.have.lengthOf(64)  // Token should have a certain length (64 characters long)
        })

        // Negative case - wrong email
        cy.request({
            method: 'POST', 
            url: usersLogin,
            failOnStatusCode: false,
            form: true,
            body: { email: formData.email + "_WRONG", password: formData.password }
        }).then((response) => {
            cy.log(response.body)
            expect(response.status).to.be.eq(400)
            expect(response.body.success).to.be.false
            expect(response.body.message).to.eq('A valid email address is required')
            expect(Object.keys(response.body)).not.to.include('data')  // to be sure that User data was NOT received
            expect(containsKey(response.body, 'token')).to.be.false  // to be sure that token was NOT received
        })


        // Negative case - wrong password
        cy.request({
            method: 'POST', 
            url: usersLogin,
            failOnStatusCode: false,
            form: true,
            body: { email: formData.email, password: formData.password + "_WRONG" }
        }).then((response) => {
            cy.log(response.body)
            expect(response.status).to.be.eq(401)
            expect(response.body.success).to.be.false
            expect(response.body.message).to.eq('Incorrect email address or password')
            expect(Object.keys(response.body)).not.to.include('data')  // to be sure that User data was NOT received
            expect(containsKey(response.body, 'token')).to.be.false  // to be sure that token was NOT received
        })

    })

    

})