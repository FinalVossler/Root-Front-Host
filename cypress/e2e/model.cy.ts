import { IFieldReadDto, IModelReadDto } from "roottypes";
import {
  createCreateFieldCommand,
  createCreateModelCommand,
} from "../fixtures/createCommands";

describe("Model", () => {
  const modelField1CreateCommand = createCreateFieldCommand("ModelField1");
  const modelField2CreateCommand = createCreateFieldCommand("ModelField2");

  let modelField1: IFieldReadDto | undefined;
  let modelField2: IFieldReadDto | undefined;
  let modelToUpdate: IModelReadDto | undefined;
  let model1ToDelete: IModelReadDto | undefined;
  let model2ToDelete: IModelReadDto | undefined;
  let modelToFindInSearch: IModelReadDto | undefined;
  let modelToNotFindInSearch: IModelReadDto | undefined;

  beforeEach(() => {
    cy.login(true);
    cy.visit("/auth");

    cy.get("modelsPage").should("not.exist");
    cy.getByDataCy("sideMenuModelOption").should("exist").and("be.visible");
    cy.getByDataCy("sideMenuModelOption").click();
    cy.getByDataCy("modelsPage").should("exist").and("be.visible");
  });

  before(() => {
    cy.sendCreateFieldRequest(modelField1CreateCommand, (res) => {
      modelField1 = (res as { body: { data: IFieldReadDto } }).body.data;
    }).then(() => {
      cy.sendCreateFieldRequest(modelField2CreateCommand, (res) => {
        modelField2 = (res as { body: { data: IFieldReadDto } }).body.data;
      }).then(() => {
        createModels();
      });
    });

    const createModels = async () => {
      cy.sendCreateModelRequest(
        createCreateModelCommand("Model to update", [
          (modelField1 as IFieldReadDto)?._id.toString(),
          (modelField2 as IFieldReadDto)?._id.toString(),
        ]),
        (res) => {
          modelToUpdate = (res as { body: { data: IModelReadDto } }).body.data;
        }
      );
      cy.sendCreateModelRequest(
        createCreateModelCommand("Model1 to delete", [
          (modelField1 as IFieldReadDto)?._id.toString(),
          (modelField2 as IFieldReadDto)?._id.toString(),
        ]),
        (res) => {
          model1ToDelete = (res as { body: { data: IModelReadDto } }).body.data;
        }
      );
      cy.sendCreateModelRequest(
        createCreateModelCommand("Model2 to delete", [
          (modelField1 as IFieldReadDto)?._id.toString(),
          (modelField2 as IFieldReadDto)?._id.toString(),
        ]),
        (res) => {
          model2ToDelete = (res as { body: { data: IModelReadDto } }).body.data;
        }
      );

      cy.sendCreateModelRequest(
        createCreateModelCommand("Search result", [
          (modelField1 as IFieldReadDto)?._id.toString(),
          (modelField2 as IFieldReadDto)?._id.toString(),
        ]),
        (res) => {
          modelToFindInSearch = (res as { body: { data: IModelReadDto } }).body
            .data;
        }
      );
      cy.sendCreateModelRequest(
        createCreateModelCommand("Ignored", [
          (modelField1 as IFieldReadDto)?._id.toString(),
          (modelField2 as IFieldReadDto)?._id.toString(),
        ]),
        (res) => {
          modelToNotFindInSearch = (res as { body: { data: IModelReadDto } })
            .body.data;
        }
      );
    };
  });

  it("should create a model", () => {
    const createdModelName: string = "Model created from Cypress";
    const fieldConditionValue: string = "Value of field 1";

    cy.getByDataCy("addElementButton").should("be.visible");
    cy.getByDataCy("addElementButton").click();
    cy.getByDataCy("modelForm").should("exist").and("be.visible");

    cy.getByDataCy("modelNameInput").type(createdModelName);

    // Adding fields
    cy.getByDataCy("modelFieldsContainer").should("not.exist");
    cy.getByDataCy("triggerModelFieldsShowing").click();
    cy.getByDataCy("modelFieldsContainer").should("exist");
    cy.getByDataCy("modelFieldsSearchFieldInput").type(
      modelField1?.name.at(0)?.text || ""
    );
    // Search and Select the first field
    cy.getByDataCy(
      "sortableModelFieldForField" + modelField1?._id.toString()
    ).should("not.exist");
    cy.getByDataCy("searchResult" + modelField1?._id.toString())
      .should("be.visible")
      .click();
    cy.getByDataCy("sortableModelFieldForField" + modelField1?._id.toString())
      .scrollIntoView()
      .should("exist")
      .and("be.visible");

    // Search and select the second field
    cy.getByDataCy("modelFieldsSearchFieldInput")
      .clear()
      .type(modelField2?.name.at(0)?.text || "");
    cy.getByDataCy("searchResult" + modelField2?._id.toString())
      .should("be.visible")
      .click();
    cy.getByDataCy("sortableModelFieldForField" + modelField2?._id.toString())
      .scrollIntoView()
      .should("exist")
      .and("be.visible");

    // Conditions for field 2
    cy.getByDataCy(
      "modelFieldConditionsForField" + modelField2?._id.toString()
    ).should("not.exist");
    cy.getByDataCy(
      "modelFieldExtendConditionsForField" + modelField2?._id.toString()
    ).click();
    cy.getByDataCy(
      "modelFieldConditionsForField" + modelField2?._id.toString()
    ).should("exist");
    cy.getByDataCy("condition0ForField" + modelField2?._id.toString()).should(
      "not.exist"
    );
    cy.getByDataCy(
      "addConditionForModelField" + modelField2?._id.toString()
    ).click();
    cy.getByDataCy("condition0ForField" + modelField2?._id.toString())
      .scrollIntoView()
      .should("exist")
      .and("be.visible");
    cy.selectInSelector(
      "conditionFieldSelectorForCondition0AndModelField" +
        modelField2?._id.toString(),
      0
    );
    cy.getByDataCy(
      "conditionValueForCondition0AndModelField" + modelField2?._id.toString()
    )
      .type(fieldConditionValue)
      .wait(2000);

    // Model states:
    cy.getByDataCy("modelStatesContainer").should("not.exist");
    cy.getByDataCy("modelTriggerOpenStates").click();
    cy.getByDataCy("modelStatesContainer").should("exist").and("be.visible");
    cy.getByDataCy("addModelStateButton").click();
    const modelStateName: string = "State 1";
    cy.getByDataCy("modelStateNameForState0").type(modelStateName).wait(2000);
    cy.getByDataCy("modelStateIsExclusiveCheckboxForState0").check();

    // Submit
    cy.getByDataCy("submitModelButton").click();

    cy.getByDataCy("modelForm").should("not.exist");
    cy.getByDataCy("modelsTable").should("contain", createdModelName);

    cy.getByDataCy("sideMenu").should("contain", createdModelName);

    cy.reload();
    cy.getByDataCy("elementEdit").first().click();
    cy.getByDataCy("modelForm").should("be.visible");

    // Make sure that all the conditions are still the same after reloading the page
    cy.contains(fieldConditionValue).should("not.exist");
    cy.getByDataCy("triggerModelFieldsShowing").click();
    cy.getByDataCy(
      "modelFieldExtendConditionsForField" + modelField2?._id.toString()
    ).click();
    cy.contains(fieldConditionValue).should("not.exist");
    cy.getByDataCy("condition0ForField" + modelField2?._id.toString())
      .should("exist")
      .and("be.visible");
    cy.getByDataCy(
      "conditionValueForCondition0AndModelField" + modelField2?._id.toString()
    ).should("have.value", fieldConditionValue);

    // Make sure that all states are still the same after reloading the page
    cy.getByDataCy("modelTriggerOpenStates").click();
    cy.getByDataCy("modelStatesContainer").should("exist").and("be.visible");
    cy.getByDataCy("modelStateNameForState0").and("have.value", modelStateName);
    cy.getByDataCy("modelStateIsExclusiveCheckboxForState0").and("be.checked");
  });

  it("should update a model and make sure the language is taken into consideration", () => {
    const newModelName: string = "New Model Name";
    const modelNameInFrench: string = "Nom du modèle";

    cy.getByDataCy("modelsPage").should(
      "contain",
      (modelToUpdate as IModelReadDto).name.at(0)?.text
    );
    cy.get("#editButtonFor" + modelToUpdate?._id.toString()).click();
    cy.getByDataCy("modelForm").should("exist").and("be.visible");
    cy.getByDataCy("modelNameInput").clear().type(newModelName);
    cy.getByDataCy("submitModelButton").click();
    cy.getByDataCy("modelsPage").should("contain", newModelName);

    cy.get("#editButtonFor" + modelToUpdate?._id.toString()).click();
    cy.selectInSelector("modelLanguageSelect", 1);
    cy.getByDataCy("modelNameInput").clear().type(modelNameInFrench);
    cy.getByDataCy("submitModelButton").click();
    cy.getByDataCy("modelsPage").should("contain", newModelName);
    cy.getByDataCy("modelsPage").should("not.contain", modelNameInFrench);
    cy.selectInSelector("mainLanguageSelector", 1);

    cy.getByDataCy("modelsPage").should("not.contain", newModelName);
    cy.getByDataCy("modelsPage").should("contain", modelNameInFrench);
  });

  it("should delete models", () => {
    cy.get("#deleteButton").should("not.exist");

    cy.getByDataCy("modelsPage").should(
      "contain",
      model1ToDelete?.name.at(0)?.text
    );
    cy.getByDataCy("modelsPage").should(
      "contain",
      model2ToDelete?.name.at(0)?.text
    );

    cy.getByDataCy(
      "tableCheckButtonFor" + model1ToDelete?._id.toString()
    ).click();
    cy.getByDataCy(
      "tableCheckButtonFor" + model2ToDelete?._id.toString()
    ).click();

    cy.get("#deleteButton").should("exist").and("be.visible");
    cy.get("#deleteButton").click();

    cy.getByDataCy("confirmationModalConfirmButton").click();

    cy.getByDataCy("modelsPage").should(
      "not.contain",
      model1ToDelete?.name.at(0)?.text
    );
    cy.getByDataCy("modelsPage").should(
      "not.contain",
      model2ToDelete?.name.at(0)?.text
    );
  });

  it("should search for model", () => {
    cy.getByDataCy("elementsSearchInput").should("be.visible");
    cy.getByDataCy("elementsSearchInput").type(
      modelToFindInSearch?.name.at(0)?.text || ""
    );
    cy.getByDataCy("modelsPage").should(
      "contain",
      modelToFindInSearch?.name.at(0)?.text
    );
    cy.getByDataCy("modelsPage").should(
      "not.contain",
      modelToNotFindInSearch?.name.at(0)?.text
    );
  });
});
