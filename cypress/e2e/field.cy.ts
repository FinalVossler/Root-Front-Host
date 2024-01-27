import { IFieldReadDto } from "roottypes";
import { createCreateFieldCommand } from "../fixtures/createCommands";

describe("Field", () => {
  const fieldToUpdateCreateCommand = createCreateFieldCommand("FieldToUpdate");
  const field1ToDeleteCreateCommand =
    createCreateFieldCommand("Field1ToDelete");
  const field2ToDeleteCreateCommand =
    createCreateFieldCommand("Field2ToDelete");
  const fieldToFindInSearchCreateCommand =
    createCreateFieldCommand("SearchedField");
  const fieldToNotFindInSearchCreateCommand =
    createCreateFieldCommand("Ignored");

  let fieldToUpdate: IFieldReadDto | undefined;
  let field1ToDelete: IFieldReadDto | undefined;
  let field2ToDelete: IFieldReadDto | undefined;
  let fieldToFindInSearch: IFieldReadDto | undefined;
  let fieldToNotFindInSearch: IFieldReadDto | undefined;

  beforeEach(() => {
    cy.login(true);
    cy.visit("/auth");

    cy.get("fieldsPage").should("not.exist");
    cy.getByDataCy("sideMenuFieldOption").should("exist").and("be.visible");
    cy.getByDataCy("sideMenuFieldOption").click();
    cy.getByDataCy("fieldsPage").should("exist").and("be.visible");
  });

  before(() => {
    cy.sendCreateFieldRequest(fieldToUpdateCreateCommand, (res) => {
      fieldToUpdate = //@ts-ignore
        (res as { body: { data: IFieldReadDto } }).body.data;
    });
    cy.sendCreateFieldRequest(field1ToDeleteCreateCommand, (res) => {
      field1ToDelete = //@ts-ignore
        (res as { body: { data: IFieldReadDto } }).body.data;
    });
    cy.sendCreateFieldRequest(field2ToDeleteCreateCommand, (res) => {
      field2ToDelete = //@ts-ignore
        (res as { body: { data: IFieldReadDto } }).body.data;
    });

    cy.sendCreateFieldRequest(fieldToFindInSearchCreateCommand, (res) => {
      fieldToFindInSearch = //@ts-ignore
        (res as { body: { data: IFieldReadDto } }).body.data;
    });
    cy.sendCreateFieldRequest(fieldToNotFindInSearchCreateCommand, (res) => {
      fieldToNotFindInSearch = //@ts-ignore
        (res as { body: { data: IFieldReadDto } }).body.data;
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

  it("should delete fields", () => {
    cy.get("#deleteButton").should("not.exist");

    cy.getByDataCy("fieldsPage").should(
      "contain",
      field1ToDelete?.name.at(0)?.text
    );
    cy.getByDataCy("fieldsPage").should(
      "contain",
      field2ToDelete?.name.at(0)?.text
    );

    cy.getByDataCy(
      "tableCheckButtonFor" + field1ToDelete?._id.toString()
    ).click();
    cy.getByDataCy(
      "tableCheckButtonFor" + field2ToDelete?._id.toString()
    ).click();

    cy.get("#deleteButton").should("exist").and("be.visible");
    cy.get("#deleteButton").click();

    cy.getByDataCy("confirmationModalConfirmButton").click();

    cy.getByDataCy("fieldsPage").should(
      "not.contain",
      field1ToDelete?.name.at(0)?.text
    );
    cy.getByDataCy("fieldsPage").should(
      "not.contain",
      field2ToDelete?.name.at(0)?.text
    );
  });

  it("should search for a field", () => {
    cy.getByDataCy("elementsSearchInput").should("be.visible");
    cy.getByDataCy("elementsSearchInput").type(
      fieldToFindInSearch?.name.at(0)?.text || ""
    );
    cy.getByDataCy("fieldsPage").should(
      "contain",
      fieldToFindInSearch?.name.at(0)?.text
    );
    cy.getByDataCy("fieldsPage").should(
      "not.contain",
      fieldToNotFindInSearch?.name.at(0)?.text
    );
  });
});
