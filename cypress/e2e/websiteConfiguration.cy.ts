describe("WebsiteConfiguration", () => {
  beforeEach(() => {
    cy.login(true);
    cy.visit("/auth");
  });

  it("should be able to open and close the website configuration editor", () => {
    cy.getByDataCy("sideMenuWebsiteConfigurationOption")
      .should("exist")
      .and("be.visible");
    cy.getByDataCy("sideMenuWebsiteConfigurationOption").click();
    cy.getByDataCy("websiteConfigurationForm").scrollIntoView().should("exist");

    cy.getByDataCy("closeWebsiteConfigurationButton").click();
    cy.getByDataCy("websiteConfigurationForm").should("not.exist");
  });
});
