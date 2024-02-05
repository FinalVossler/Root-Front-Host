describe.skip("MarketMaven", () => {
  before(() => {
    cy.prepareMarktMaven();
  });

  beforeEach(() => {
    cy.login(true);
    cy.visit("/auth");
  });

  it("should simply prepare Marketmaven", () => {
    cy.get("fieldsPage").should("not.exist");
  });
});
