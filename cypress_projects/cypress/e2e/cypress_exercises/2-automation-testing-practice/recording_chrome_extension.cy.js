/// <reference types="cypress" />

describe("FirstRecording", () => {
    it("tests FirstRecording", () => {
      cy.viewport(1022, 919);
      cy.visit("https://dictionary.cambridge.org/");
      cy.get("#searchword").click();
      cy.get("#searchword").click();
      cy.get("#searchword").click();
      cy.get("#searchword").click();
      cy.get("div.hcb span:nth-of-type(1)").click();
      cy.get("#searchword").type("jocose");
      cy.get("body > div.pr button.bo > i").click();
      cy.location("href").should("eq", "https://dictionary.cambridge.org/dictionary/english/jocose");
    });
  });