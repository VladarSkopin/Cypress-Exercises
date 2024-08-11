/// <reference types="cypress" />

describe("Database Tests", () => {

  let client_suffix = Cypress._.random(100, 900)

  // Client data to be inserted into the DB
  const newClient = {
    client_general_id: 'AU-123',
    created: "STR_TO_DATE('21-12-2022', '%d-%m-%Y')",
    title_short: 'Ships AU',
    title_long: `Australian Shipbuilding and Transportation ${client_suffix}`
  };

  // Financial data to be inserted into the DB
  const newFinancialData = {
    client_id: 'AU-123',
    created: "STR_TO_DATE('21-12-2022', '%d-%m-%Y')",
    financial_type: 'RSBU',
    amount: 72513.73,
    currency: 'USD'
  };

  it("Create a new client along with his financial data", () => {


    // Check that there are no clients with this "client_general_id" before the test:
    cy.task('queryDb', `SELECT count(*) FROM AlexTest.clients WHERE client_general_id = \'${newClient.client_general_id}\'`).then((rows) => {
      cy.log('rows[0][\'count(*)\'] = ' + rows[0]['count(*)'])
      expect(rows[0]['count(*)']).to.eq(0)
    });


    // Create a new Client in DB
    cy.task('queryDb', `
      insert into AlexTest.clients
      (client_general_id, created, title_short, title_long)
      values
      (\'${newClient.client_general_id}\', ${newClient.created}, \'${newClient.title_short}\', \'${newClient.title_long}\');
      `).then((result) => {
        cy.log('result.affectedRows = ' + result.affectedRows)
        expect(result.affectedRows).to.equal(1);
      });
  

    // Create new Financial data in DB for the new Client
    cy.task('queryDb', `
      insert into AlexTest.financial_data
      (created, client_id, financial_type, amount, currency)
      values
      (${newFinancialData.created}, \'${newFinancialData.client_id}\', \'${newFinancialData.financial_type}\', ${newFinancialData.amount}, \'${newFinancialData.currency}\');
      `).then((result) => {
        cy.log('result.affectedRows = ' + result.affectedRows)
        expect(result.affectedRows).to.equal(1);
      });

  });


  it("Select new data about the created client", () => {

    // To ensure that new Client data is correct
    cy.task('queryDb', `SELECT * FROM AlexTest.clients WHERE client_general_id = \'${newClient.client_general_id}\'`).then((rows) => {
      expect(rows.length).to.be.greaterThan(0)
      cy.log('rows[0].client_general_id = ' + rows[0].client_general_id)
      cy.log('rows[0].title_short = ' + rows[0].title_short)
      cy.log('rows[0].title_long = ' + rows[0].title_long)
      expect(rows[0].client_general_id).to.eq(newClient.client_general_id)
      expect(rows[0].title_short).to.eq(newClient.title_short)
      expect(rows[0].title_long).to.eq(newClient.title_long)
    });


    // To ensure that Financial data of the new Client is correct
    cy.task('queryDb', `
      SELECT c.client_general_id, c.title_short, c.created, f.financial_type, f.amount, f.currency
      FROM AlexTest.clients c
      LEFT JOIN AlexTest.financial_data f ON c.client_general_id = f.client_id
      ORDER BY c.id
      `).then((rows) => {
      cy.log('rows[0].client_general_id = ' + rows[0].client_general_id)
      cy.log('rows[0].title_short = ' + rows[0].title_short)
      cy.log('rows[0].created = ' + rows[0].created)
      cy.log('rows[0].financial_type = ' + rows[0].financial_type)
      cy.log('rows[0].amount = ' + rows[0].amount)
      cy.log('rows[0].currency = ' + rows[0].currency)
      expect(rows[0].client_general_id).to.eq(newClient.client_general_id)
      expect(rows[0].title_short).to.eq(newClient.title_short)
      const parts = rows[0].created.split("T")
      const datePart = parts[0]
      expect(datePart).to.eq('2022-12-20')
      expect(rows[0].financial_type).to.eq(newFinancialData.financial_type)
      expect(Math.ceil(rows[0].amount * 100) / 100).to.eq(Math.ceil(newFinancialData.amount * 100) / 100)
      expect(rows[0].currency).to.eq(newFinancialData.currency)
    });

    // Check that there are no duplicate clients with this "client_general_id":
    cy.task('queryDb', `SELECT count(*) FROM AlexTest.clients WHERE client_general_id = \'${newClient.client_general_id}\'`).then((rows) => {
      cy.log('rows[0][\'count(*)\'] = ' + rows[0]['count(*)'])
      expect(rows[0]['count(*)']).to.eq(1)
    });


  });

  it("Delete created clients and their financial data", () => {
    let condition_clients = `client_general_id = \'${newClient.client_general_id}\'`
    let condition_fin_data = `client_id = \'${newClient.client_general_id}\'`

    // To delete all the new clients
    cy.task('queryDb', `DELETE FROM AlexTest.clients WHERE ${condition_clients}`).then((result) => {
      cy.log('result.affectedRows = ' + result.affectedRows)
      expect(result.affectedRows).to.be.gt(0);
    })

    // To delete all the new clients' financial data
    cy.task('queryDb', `DELETE FROM AlexTest.financial_data WHERE ${condition_fin_data}`).then((result) => {
      cy.log('result.affectedRows = ' + result.affectedRows)
      expect(result.affectedRows).to.be.gt(0);
    })

  });

});