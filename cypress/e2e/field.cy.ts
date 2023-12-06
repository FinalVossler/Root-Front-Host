describe.skip("login", () => {
  before(() => {
    cy.login(true);

    cy.visit("/");
  });

  it("should create field", () => {
    expect(1).to.eq(1);
  });
});
