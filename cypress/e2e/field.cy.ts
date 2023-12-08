import { FieldCreateCommand } from "../../src/hooks/apiHooks/useCreateField";
import { FieldType, IField } from "../../src/store/slices/fieldSlice";

describe("field", () => {
  const fieldToUpdateCreateCommand: FieldCreateCommand = {
    fieldEvents: [],
    name: "FieldToUpdate",
    language: "en",
    canChooseFromExistingFiles: false,
    tableOptions: {
      columns: [],
      name: "",
      rows: [],
      yearTable: false,
    },
    type: FieldType.Text,
    options: [],
  };
  let fieldToUpdate: IField | undefined;

  beforeEach(() => {
    cy.login(true);
    cy.visit("/auth");

    cy.get("fieldsPage").should("not.exist");
    cy.getByDataCy("sideMenuFieldOption").should("exist").and("be.visible");
    cy.getByDataCy("sideMenuFieldOption").click();
    cy.getByDataCy("fieldsPage").should("exist").and("be.visible");
  });

  before(() => {
    cy.get("@adminToken")
      .then((adminToken) => {
        cy.request({
          method: "POST",
          body: fieldToUpdateCreateCommand,
          url: Cypress.env("backendUrl") + "/fields/",
          headers: {
            Authorization: "Bearer " + adminToken,
          },
        });
      })
      .then((res) => {
        fieldToUpdate = //@ts-ignore
          (res as { body: { data: IField } }).body.data;
      });
  });

  it("should create a field", () => {
    const createdFieldName: string = "Field created from Cypress";

    cy.getByDataCy("addElementButton").should("be.visible");
    cy.getByDataCy("addElementButton").click();
    cy.getByDataCy("fieldForm").should("exist").and("be.visible");

    cy.getByDataCy("fieldNameInput").type(createdFieldName);

    cy.selectInSelector("fieldTypeInputSelect", 0);

    cy.getByDataCy("submitFieldButton").click();

    cy.getByDataCy("fieldForm").should("not.exist");
    cy.getByDataCy("fieldsTable").should("contain", createdFieldName);
  });

  it("should update a field and make sure the language is taken into consideration", () => {
    const newFieldName: string = "New Field Name";
    const fieldNameInFrench: string = "Nom du champ";

    cy.getByDataCy("fieldsPage").should(
      "contain",
      fieldToUpdateCreateCommand.name
    );
    cy.get("#editButtonFor" + fieldToUpdate?._id.toString()).click();
    cy.getByDataCy("fieldForm").should("exist").and("be.visible");
    cy.getByDataCy("fieldNameInput").clear().type(newFieldName);
    cy.getByDataCy("submitFieldButton").click();
    cy.getByDataCy("fieldsPage").should("contain", newFieldName);

    cy.get("#editButtonFor" + fieldToUpdate?._id.toString()).click();
    cy.selectInSelector("fieldLanguageSelect", 1);
    cy.getByDataCy("fieldNameInput").clear().type(fieldNameInFrench);
    cy.getByDataCy("submitFieldButton").click();
    cy.getByDataCy("fieldsPage").should("contain", newFieldName);
    cy.getByDataCy("fieldsPage").should("not.contain", fieldNameInFrench);
    cy.selectInSelector("mainLanguageSelector", 1);

    cy.getByDataCy("fieldsPage").should("not.contain", newFieldName);
    cy.getByDataCy("fieldsPage").should("contain", fieldNameInFrench);
  });
});
