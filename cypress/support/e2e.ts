import "./commands";

before(() => {
  cy.login();

  cy.get("@adminToken").then((adminToken) => {
    cy.request({
      method: "POST",
      url: Cypress.env("backendUrl") + "/testsPreparation/clean",
      headers: {
        Authorization: "Bearer " + adminToken,
      },
    });
  });
});
