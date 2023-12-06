describe("login", () => {
  before(() => {
    cy.login();

    cy.visit("/");
  });

  it("should create field", () => {
    expect(1).to.eq(1);
  });
});
