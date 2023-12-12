import IFile from "../../src/globalTypes/IFile";
import { EntityCreateCommand } from "../../src/hooks/apiHooks/useCreateEntity";
import { RoleCreateCommand } from "../../src/hooks/apiHooks/useCreateRole";
import { IEntity } from "../../src/store/slices/entitySlice";
import { FieldType, IField } from "../../src/store/slices/fieldSlice";
import { IModel } from "../../src/store/slices/modelSlice";
import {
  EntityEventNotificationTrigger,
  IRole,
  StaticPermission,
} from "../../src/store/slices/roleSlice";
import { IUser, SuperRole } from "../../src/store/slices/userSlice";
import { UserCreateCommand } from "../../src/hooks/apiHooks/useCreateUser";
import {
  createCreateFieldCommand,
  createCreateModelCommand,
} from "../fixtures/createCommands";

describe("entity", () => {
  const modelField1CreateCommand = createCreateFieldCommand("ModelField1");
  const modelField2CreateCommand = createCreateFieldCommand("ModelField2");
  const modelField3OfTypeFileCreateCommand = createCreateFieldCommand(
    "ModelField3OfTypeFile"
  );
  modelField3OfTypeFileCreateCommand.type = FieldType.File;
  modelField3OfTypeFileCreateCommand.canChooseFromExistingFiles = true;
  const modelField4CreateCommand = createCreateFieldCommand("ModelField4");
  const userWithLimitedAccessEmail: string =
    "testingUserWithLimitedAccess@testing.com";
  const userWithLimitedAccessPassword = "rootroot";

  let modelField1: IField | undefined;
  let modelField2: IField | undefined;
  let modelField3OfTypeFile: IField | undefined;
  let modelField4: IField | undefined;
  let model: IModel | undefined;
  let entityToUpdate: IEntity | undefined;
  let entityToUpdate2: IEntity | undefined;
  let entityToAssign: IEntity | undefined;
  let file1: IFile | undefined;
  let role: IRole | undefined;
  let userWithLimitedAccess: IUser | undefined;

  before(() => {
    cy.sendCreateFieldRequest(modelField1CreateCommand, (res) => {
      modelField1 = (res as { body: { data: IField } }).body.data;
    }).then(() => {
      cy.sendCreateFieldRequest(modelField2CreateCommand, (res) => {
        modelField2 = (res as { body: { data: IField } }).body.data;
      }).then(() => {
        cy.sendCreateFieldRequest(modelField3OfTypeFileCreateCommand, (res) => {
          modelField3OfTypeFile = (res as { body: { data: IField } }).body.data;
        }).then(() => {
          cy.sendCreateFieldRequest(modelField4CreateCommand, (res) => {
            modelField4 = (res as { body: { data: IField } }).body.data;
          }).then(() => {
            cy.sendCreateFileRequest(
              "https://i.pinimg.com/736x/fa/8a/a4/fa8aa43569687f96b8afd6a1e7539e20.jpg",
              (res) => {
                file1 = (res as { body: { data: IFile } }).body.data;
              }
            ).then(() => {
              createModels();
            });
          });
        });
      });
    });

    const createRoles = () => {
      const roleCreateCommand: RoleCreateCommand = {
        entityPermissions: [
          {
            entityEventNotifications: [
              {
                language: "en",
                text: "An entity was assigned",
                title: "Assignment notification",
                trigger: EntityEventNotificationTrigger.OnAssigned,
              },
            ],
            entityFieldPermissions: [
              {
                fieldId: modelField1?._id.toString() || "",
                permissions: [StaticPermission.Read],
              },
              {
                fieldId: modelField2?._id.toString() || "",
                permissions: [],
              },
              {
                fieldId: modelField3OfTypeFile?._id.toString() || "",
                permissions: [StaticPermission.Read],
              },
              {
                fieldId: modelField4?._id.toString() || "",
                permissions: [StaticPermission.Read, StaticPermission.Update],
              },
            ],
            entityUserAssignmentPermissionsByRole: {
              canAssignToUserFromSameRole: true,
              otherRolesIds: [],
            },
            language: "en",
            modelId: (model as IModel)?._id.toString(),
            permissions: [StaticPermission.Read, StaticPermission.Update],
          },
        ],
        language: "en",
        name: "Role used to test entities permissions",
        permissions: [],
      };

      cy.sendCreateRoleRequest(roleCreateCommand, (res) => {
        role = (res as { body: { data: IRole } }).body.data;
      }).then(() => {
        createUsers();
      });
    };

    const createUsers = () => {
      const userCreateCommand: UserCreateCommand = {
        email: "testingUserWithLimitedAccess@testing.com",
        firstName: "userForEntityTestFirstName",
        lastName: "userForEntityTestLastName",
        password: userWithLimitedAccessPassword,
        superRole: SuperRole.Normal,
        roleId: role?._id,
      };
      cy.sendCreateUserRequest(userCreateCommand, (res) => {
        userWithLimitedAccess = (res as { body: { data: IUser } }).body.data;
      });
    };

    const createModels = () => {
      cy.sendCreateModelRequest(
        createCreateModelCommand(
          "Model used for entities test",
          [
            (modelField1 as IField)?._id.toString(),
            (modelField2 as IField)?._id.toString(),
            (modelField3OfTypeFile as IField)._id.toString(),
            (modelField4 as IField)?._id.toString(),
          ],
          [modelField2?._id.toString() || ""]
        ),
        (res) => {
          model = (res as { body: { data: IModel } }).body.data;
        }
      ).then(() => {
        createRoles();
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
          {
            fieldId: modelField3OfTypeFile?._id.toString() || "",
            files: [],
            tableValues: [],
            value: "",
            yearTableValues: [],
          },
          {
            fieldId: modelField4?._id.toString() || "",
            files: [],
            tableValues: [],
            value: "field 4 value",
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
          entityToUpdate2 = (res as { body: { data: IEntity } }).body.data;
        });

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
          entityToAssign = (res as { body: { data: IEntity } }).body.data;
        });
    };
  });

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

  it("should update an entity", () => {
    const updatedValueForField1 = "Updated value for field1";
    const updatedValueForField1InFrench =
      "Nouvelle Valeur du champ 1 en Français";
    const updatedValueForField2 = "Updated value for field2";
    const updatedValueForField2InFrench =
      "Nouvelle Valeur du champ 2 en Français";

    cy.getByDataCy("elementsTableViewButton").click();

    cy.get("#editButtonFor" + entityToUpdate?._id.toString())
      .scrollIntoView()
      .click();

    cy.getByDataCy("entityEditorForm").should("be.visible");

    cy.getByDataCy(
      "entityFieldInputForField" + modelField1?._id.toString()
    ).should(
      "have.value",
      entityToUpdate?.entityFieldValues.at(0)?.value.at(0)?.text
    );
    cy.getByDataCy(
      "entityFieldInputForField" + modelField2?._id.toString()
    ).should(
      "have.value",
      entityToUpdate?.entityFieldValues.at(1)?.value.at(0)?.text
    );

    // Change value of the two text fields
    cy.getByDataCy("entityFieldInputForField" + modelField1?._id.toString())
      .clear()
      .type(updatedValueForField1);
    cy.getByDataCy("entityFieldInputForField" + modelField2?._id.toString())
      .clear()
      .type(updatedValueForField2);

    // Change value of file field
    cy.getByDataCy("existingFilesContainer").should("not.exist");
    cy.get("#selectFromExistingFilesForEntityButton").scrollIntoView().click();
    cy.getByDataCy("existingFilesContainer")
      .should("exist")
      .scrollIntoView()
      .and("be.visible");
    cy.getByDataCy(
      "selectedExistingFileForFile" + file1?._id?.toString()
    ).should("not.exist");
    cy.getByDataCy("existingFileForFile" + file1?._id?.toString()).click();
    cy.getByDataCy("selectedExistingFileForFile" + file1?._id?.toString())
      .should("exist")
      .scrollIntoView()
      .and("be.visible");

    cy.getByDataCy("entityFormSubmitButton").click();

    cy.reload();
    cy.getByDataCy("elementsTableViewButton").click();

    // Make sure the fields now have their updated field values
    cy.get("#editButtonFor" + entityToUpdate?._id.toString())
      .scrollIntoView()
      .click();
    cy.getByDataCy("entityEditorForm").should("be.visible");

    cy.getByDataCy(
      "entityFieldInputForField" + modelField1?._id.toString()
    ).should("have.value", updatedValueForField1);
    cy.getByDataCy(
      "entityFieldInputForField" + modelField2?._id.toString()
    ).should("have.value", updatedValueForField2);
    cy.getByDataCy("existingFilesContainer")
      .should("exist")
      .scrollIntoView()
      .and("be.visible");
    cy.getByDataCy("selectedExistingFileForFile" + file1?._id?.toString())
      .should("exist")
      .scrollIntoView()
      .and("be.visible");

    // Now change the field values for a different language
    cy.selectInSelector("entityFormLanguageSelector", 1);

    cy.getByDataCy("entityFieldInputForField" + modelField1?._id.toString())
      .clear()
      .type(updatedValueForField1InFrench);
    cy.getByDataCy("entityFieldInputForField" + modelField2?._id.toString())
      .clear()
      .type(updatedValueForField2InFrench);

    cy.getByDataCy("entityFormSubmitButton").click();

    // Now check that the language dependent values have been taken into consideration
    cy.reload();
    cy.getByDataCy("elementsTableViewButton").click();

    cy.get("#editButtonFor" + entityToUpdate?._id.toString())
      .scrollIntoView()
      .click();
    cy.selectInSelector("entityFormLanguageSelector", 0);

    cy.getByDataCy(
      "entityFieldInputForField" + modelField1?._id.toString()
    ).should("have.value", updatedValueForField1);
    cy.getByDataCy(
      "entityFieldInputForField" + modelField2?._id.toString()
    ).should("have.value", updatedValueForField2);
    cy.selectInSelector("entityFormLanguageSelector", 1);

    cy.getByDataCy(
      "entityFieldInputForField" + modelField1?._id.toString()
    ).should("have.value", updatedValueForField1InFrench);
    cy.getByDataCy(
      "entityFieldInputForField" + modelField2?._id.toString()
    ).should("have.value", updatedValueForField2InFrench);
    cy.getByDataCy("selectedExistingFileForFile" + file1?._id?.toString())
      .should("exist")
      .scrollIntoView()
      .and("be.visible");
  });

  it("should make sure that entities permissions in the form are working properly: Read only + No read + Read And Update + File Read Only", () => {
    const updatedValueForField4: string = "Updated value for field 4";

    cy.login(true, {
      email: userWithLimitedAccess?.email || "",
      password: userWithLimitedAccessPassword,
    });

    cy.reload();
    cy.getByDataCy("elementsTableViewButton").click();

    cy.get("#editButtonFor" + entityToUpdate2?._id.toString())
      .scrollIntoView()
      .click();

    cy.getByDataCy("entityEditorForm").should("be.visible");

    // Test that a read only field is visible, that it has the right value and that we can't edit it
    cy.getByDataCy("entityFieldInputForField" + modelField1?._id.toString())
      .should("exist")
      .and(
        "have.value",
        entityToUpdate2?.entityFieldValues
          .find((el) => el.field._id.toString() === modelField1?._id.toString())
          ?.value.at(0)?.text
      );
    cy.getByDataCy(
      "entityFieldInputForField" + modelField1?._id.toString()
    ).should("be.disabled");
    cy.getByDataCy("entityFieldInputForField" + modelField1?._id.toString())
      .should("exist")
      .and(
        "have.value",
        entityToUpdate2?.entityFieldValues
          .find((el) => el.field._id.toString() === modelField1?._id.toString())
          ?.value.at(0)?.text
      );

    // Test that an inaccessible field isn't showing
    cy.getByDataCy(
      "entityFieldInputForField" + modelField2?._id.toString()
    ).should("not.exist");

    // Check that we can't change the value of file field to which we only have read access
    cy.getByDataCy("existingFilesContainer").should("not.exist");
    cy.get("#selectFromExistingFilesForEntityButton").scrollIntoView().click();
    cy.getByDataCy("existingFilesContainer")
      .should("exist")
      .scrollIntoView()
      .and("be.visible");
    cy.getByDataCy(
      "selectedExistingFileForFile" + file1?._id?.toString()
    ).should("not.exist");
    cy.getByDataCy("existingFileForFile" + file1?._id?.toString()).click();
    // A selected existing file shouldn't exist even after clicking a file
    cy.getByDataCy(
      "selectedExistingFileForFile" + file1?._id?.toString()
    ).should("not.exist");

    // Test that we have the ability to edit fields to which we have edit access
    cy.getByDataCy("entityFieldInputForField" + modelField4?._id.toString())
      .should("exist")
      .and(
        "have.value",
        entityToUpdate2?.entityFieldValues
          .find((el) => el.field._id.toString() === modelField4?._id.toString())
          ?.value.at(0)?.text
      );

    cy.getByDataCy("entityFieldInputForField" + modelField4?._id.toString())
      .clear()
      .type(updatedValueForField4);

    // Submit the form and reload, then test that everything is alright
    cy.getByDataCy("entityFormSubmitButton").click();

    cy.reload();
    cy.getByDataCy("elementsTableViewButton").click();

    cy.get("#editButtonFor" + entityToUpdate2?._id.toString())
      .scrollIntoView()
      .click();
    cy.getByDataCy("entityFieldInputForField" + modelField4?._id.toString())
      .should("exist")
      .and("have.value", updatedValueForField4);
  });

  it("should assign an entity and receive a notification", () => {
    cy.getByDataCy("elementsTableViewButton").click();

    cy.get("#editButtonFor" + entityToAssign?._id.toString())
      .scrollIntoView()
      .click();

    cy.getByDataCy("entityEditorForm").should("be.visible");

    cy.getByDataCy("searchUserToAssignForRole" + role?._id.toString())
      .clear()
      .type(userWithLimitedAccessEmail);
    cy.getByDataCy(
      "searchResult" + userWithLimitedAccess?._id.toString()
    ).click();

    cy.getByDataCy("entityFormSubmitButton").click();

    cy.login(true, {
      email: userWithLimitedAccessEmail,
      password: userWithLimitedAccessPassword,
    });
    cy.reload();

    // The authenticted user must now be able to see the notification
    cy.getByDataCy("headerNotificationsContainer").should("not.exist");
    cy.getByDataCy("headerNotificationsButton").click();
    cy.getByDataCy("headerNotificationsContainer")
      .should("exist")
      .and("be.visible");
    cy.getByDataCy("headerNotification").should("have.length", 1);
    cy.getByDataCy("headerNotification").eq(0).click();

    cy.getByDataCy("entityEditorForm").should("exist").and("be.visible");
    cy.getByDataCy(
      "entityFieldInputForField" + modelField1?._id.toString()
    ).should(
      "have.value",
      entityToAssign?.entityFieldValues.at(0)?.value.at(0)?.text
    );
  });
});
