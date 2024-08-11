/// <reference types="cypress" />

describe("Database Tests", () => {
    
    it.only("Select assertions", () => {

      cy.task('queryDb', 'SELECT * FROM AlexTest.cpu_utilization').then((rows) => {
        expect(rows.length).to.be.greaterThan(0); // Example assertion
        expect(rows[0].id).to.eq(1);
      });

    });

    it("Insert assertions", () => {


    });

    it("Delete assertions", () => {


    });

  });