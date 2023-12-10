import { EntityCreateCommand } from "../../src/hooks/apiHooks/useCreateEntity";
import { IEntity } from "../../src/store/slices/entitySlice";
import { IField } from "../../src/store/slices/fieldSlice";
import { IModel } from "../../src/store/slices/modelSlice";
import {
  createCreateFieldCommand,
  createCreateModelCommand,
} from "../fixtures/createCommands";

describe("entity", () => {
  const modelField1CreateCommand = createCreateFieldCommand("ModelField1");
  const modelField2CreateCommand = createCreateFieldCommand("ModelField2");

  let modelField1: IField | undefined;
  let modelField2: IField | undefined;
  let model: IModel | undefined;
  let entityToUpdate: IEntity | undefined;

  beforeEach(() => {
    cy.login(true);
    cy.visit("/auth");

    cy.get("entitiesPage").should("not.exist");
    cy.getByDataCy("sideMenuModelOption").should("exist").and("be.visible");
    cy.getByDataCy("sideMenuModelOption").click();
    cy.getByDataCy("sideMenuEntityOptionForModel" + model?._id.toString())
      .should("exist")
      .and("be.visible")
      .click();
    cy.getByDataCy("entitiesPage").should("exist").and("be.visible");
  });

  before(() => {
    cy.sendCreateFieldRequest(modelField1CreateCommand, (res) => {
      modelField1 = (res as { body: { data: IField } }).body.data;
    }).then(() => {
      cy.sendCreateFieldRequest(modelField2CreateCommand, (res) => {
        modelField2 = (res as { body: { data: IField } }).body.data;
      }).then(() => {
        createModels();
      });
    });

    const createModels = () => {
      cy.sendCreateModelRequest(
        createCreateModelCommand(
          "Model used for entities test",
          [
            (modelField1 as IField)?._id.toString(),
            (modelField2 as IField)?._id.toString(),
          ],
          [modelField2?._id.toString() || ""]
        ),
        (res) => {
          model = (res as { body: { data: IModel } }).body.data;
        }
      ).then(() => {
        createEntities();
      });
    };

    const createEntities = () => {
      const createEntityCommand: EntityCreateCommand = {
        assignedUsersIds: [],
        entityFieldValues: [
          {
            fieldId: modelField1?._id.toString() || "",
            files: [],
            tableValues: [],
            value: "field 1 value",
            yearTableValues: [],
          },
          {
            fieldId: modelField2?._id.toString() || "",
            files: [],
            tableValues: [],
            value: "field 2 value",
            yearTableValues: [],
          },
        ],
        language: "en",
        modelId: model?._id.toString() || "",
      };

      cy.get("@adminToken")
        .then((adminToken) => {
          cy.request({
            url: Cypress.env("backendUrl") + "/entities/",
            headers: {
              Authorization: "Bearer " + adminToken,
            },
            method: "POST",
            body: createEntityCommand,
          });
        })
        .then((res) => {
          //@ts-ignore
          entityToUpdate = (res as { body: { data: IEntity } }).body.data;
        });
    };
  });

  it("should create an entity", () => {
    const valueOfField1: string = "Value of field 1";
    const valueOfField2: string = "Value of field 2";
    cy.getByDataCy("entityEditorForm").should("not.exist");
    cy.getByDataCy("addElementButton").click();
    cy.getByDataCy("entityEditorForm").should("exist").and("be.visible");

    cy.getByDataCy(
      "entityFieldInputForField" + modelField1?._id.toString()
    ).type(valueOfField1);

    cy.getByDataCy(
      "entityFieldInputErrorForField" + modelField2?._id.toString()
    ).should("be.empty");
    cy.getByDataCy("entityFormSubmitButton").click();
    cy.getByDataCy(
      "entityFieldInputErrorForField" + modelField2?._id.toString()
    ).should("not.be.empty");

    cy.getByDataCy(
      "entityFieldInputForField" + modelField2?._id.toString()
    ).type(valueOfField2);

    cy.getByDataCy("entityFormSubmitButton").click();
    cy.getByDataCy(
      "entityFieldInputErrorForField" + modelField2?._id.toString()
    ).should("be.empty");

    cy.getByDataCy("elementsTableViewButton").click();

    cy.getByDataCy("entityEditorForm").should("not.exist");
    cy.getByDataCy("entitiesTable").should("contain.text", valueOfField1);
    cy.getByDataCy("entitiesTable").should("contain.text", valueOfField2);
  });
});
