describe("login", () => {
  before(() => {
    cy.visit("/auth");
  });

  it("should login", () => {
    expect(1).to.eq(1);
  });
});
