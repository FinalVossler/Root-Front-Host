describe("field", () => {
  before(() => {
    cy.login(true);
    cy.visit("/auth");
  });

  it("should create a field", () => {
    const createdFieldName: string = "Field created from Cypress";

    cy.get("fieldsPage").should("not.exist");
    cy.getByDataCy("sideMenuFieldOption").should("exist").and("be.visible");
    cy.getByDataCy("sideMenuFieldOption").click();
    cy.getByDataCy("fieldsPage").should("exist").and("be.visible");
    cy.getByDataCy("addElementButton").should("be.visible");
    cy.getByDataCy("addElementButton").click();
    cy.getByDataCy("fieldForm").should("exist").and("be.visible");

    cy.getByDataCy("fieldNameInput").type(createdFieldName);
    cy.get(".fieldTypeInputSelect")
      .click()
      .find(".react-select__option")
      .eq(0)
      .click();

    cy.getByDataCy("submitFieldButton").click();

    cy.getByDataCy("fieldForm").should("not.exist");
    cy.getByDataCy("fieldsTable").should("contain", createdFieldName);
  });
});
