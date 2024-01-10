import { RoleCreateCommand } from "../../src/hooks/apiHooks/useCreateRole";
import { UserCreateCommand } from "../../src/hooks/apiHooks/useCreateUser";
import { IField } from "../../src/store/slices/fieldSlice";
import { IModel } from "../../src/store/slices/modelSlice";
import { IRole, StaticPermission } from "../../src/store/slices/roleSlice";
import { IUser, SuperRole } from "../../src/store/slices/userSlice";
import {
  createCreateFieldCommand,
  createCreateModelCommand,
} from "../fixtures/createCommands";

describe("Roles", () => {
  const modelField1CreateCommand = createCreateFieldCommand("ModelField1");
  const modelField2CreateCommand = createCreateFieldCommand("ModelField2");

  let modelField1: IField | undefined;
  let modelField2: IField | undefined;

  let model: IModel | undefined;

  let roleToUpdate: IRole | undefined;
  let otherRoleForAssignemnt: IRole | undefined;
  let user: IUser | undefined;

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
        createCreateModelCommand("Model used for entities test", [
          (modelField1 as IField)?._id.toString(),
          (modelField2 as IField)?._id.toString(),
        ]),
        (res) => {
          model = (res as { body: { data: IModel } }).body.data;
        }
      ).then(() => {
        createRoles();
      });
    };

    const createRoles = () => {
      const roleCreateCommand: RoleCreateCommand = {
        entityPermissions: [
          {
            entityEventNotifications: [],
            entityFieldPermissions: [],
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
        name: "Role to update",
        permissions: [],
      };

      cy.sendCreateRoleRequest(roleCreateCommand, (res) => {
        roleToUpdate = (res as { body: { data: IRole } }).body.data;
      }).then(() => {
        cy.sendCreateRoleRequest(
          { ...roleCreateCommand, name: "Other Role for assignment" },
          (res) => {
            otherRoleForAssignemnt = (res as { body: { data: IRole } }).body
              .data;
          }
        ).then(() => {
          createUsers();
        });
      });
    };

    const createUsers = () => {
      const userCreateCommand: UserCreateCommand = {
        email: "userForRoleTests@testing.com",
        firstName: "userForRoleTestsFirstName",
        lastName: "userForRoleTestsLastName",
        password: "rootroot",
        superRole: SuperRole.Normal,
        roleId: roleToUpdate?._id,
      };
      cy.sendCreateUserRequest(userCreateCommand, (res) => {
        user = (res as { body: { data: IUser } }).body.data;
      });
    };
  });

  beforeEach(() => {
    cy.login(true);
    cy.visit("/roles");

    cy.get("rolesPage").should("not.exist");
    cy.getByDataCy("sideMenuRoleOption").should("exist").and("be.visible");
    cy.getByDataCy("sideMenuRoleOption").click();
    cy.getByDataCy("rolesPage").should("exist").and("be.visible");
  });

  it("should create a role", () => {
    const roleToCreateName = "Cypress Role to create name";
    const eventTitle = "Event title";
    const eventDescription = "Event description";

    cy.getByDataCy("roleForm").should("not.exist");
    cy.getByDataCy("addElementButton").click();
    cy.getByDataCy("roleForm").should("exist").and("be.visible");

    cy.getByDataCy("roleNameInputError").should("be.empty");
    cy.getByDataCy("submitRoleButton").click();

    cy.getByDataCy("roleNameInputError").should("not.be.empty");
    cy.getByDataCy("roleNameInput").clear().type(roleToCreateName);

    cy.getByDataCy(
      "entityPermissionFormSectionForModel" + model?._id.toString()
    ).should("not.exist");

    cy.getByDataCy("roleSearchModelInput").type(
      model?.name.at(0)?.text.toString() || ""
    );

    cy.getByDataCy("searchResult" + model?._id.toString()).click();

    cy.getByDataCy(
      "entityPermissionFormSectionForModel" + model?._id.toString()
    )
      .should("exist")
      .scrollIntoView()
      .and("be.visible");

    // Update global model permissions
    cy.getByDataCy(
      "entityPermissionUpdateForModel" + model?._id.toString()
    ).uncheck();
    cy.getByDataCy(
      "entityPermissionDeleteForModel" + model?._id.toString()
    ).uncheck();

    // Update field permissions:
    cy.getByDataCy(
      "entityFieldPermissionForModel" +
        model?._id.toString() +
        "AndField" +
        modelField1?._id.toString()
    ).should("not.exist");

    cy.getByDataCy(
      "entityFieldPermissionForModel" +
        model?._id.toString() +
        "AndField" +
        modelField2?._id.toString()
    ).should("not.exist");

    cy.getByDataCy(
      "entityPermissionExtendFieldsSectionForModel" + model?._id.toString()
    ).click();

    cy.getByDataCy(
      "entityFieldPermissionForModel" +
        model?._id.toString() +
        "AndField" +
        modelField1?._id.toString()
    )
      .should("exist")
      .scrollIntoView()
      .and("be.visible");

    cy.getByDataCy(
      "entityFieldPermissionForModel" +
        model?._id.toString() +
        "AndField" +
        modelField2?._id.toString()
    )
      .should("exist")
      .scrollIntoView()
      .and("be.visible");

    cy.getByDataCy(
      "entityFieldUpdatePermissionForModel" +
        model?._id.toString() +
        "AndField" +
        modelField1?._id.toString()
    ).uncheck();

    // Update events notification
    cy.getByDataCy(
      "entityEventsNotificationForModel" + model?._id.toString()
    ).should("not.exist");
    cy.getByDataCy(
      "entityPermissionExtendEventNotificationsSectionForModel" +
        model?._id.toString()
    ).click();
    cy.getByDataCy("entityEventsNotificationForModel" + model?._id.toString())
      .should("exist")
      .and("be.visible");

    cy.getByDataCy(
      "entityEventNoitificationAddEventButtonForModel" + model?._id.toString()
    ).click();
    cy.getByDataCy(
      "entityEvenNotificationEventTitleInputForModel" + model?._id.toString()
    ).type(eventTitle);
    cy.getByDataCy(
      "entityEventNotificiationEventDescriptionForModel" + model?._id.toString()
    ).type(eventDescription);

    // Update user assignment permissions
    cy.getByDataCy(
      "roleEntityUserAssignmentPermissionsForModel" + model?._id.toString()
    ).should("not.exist");
    cy.getByDataCy(
      "entityPermissionExtendUserAssignmentPermissionsSectionForModel" +
        model?._id.toString()
    ).click();
    cy.getByDataCy(
      "roleEntityUserAssignmentPermissionsForModel" + model?._id.toString()
    )
      .should("exist")
      .and("be.visible");

    cy.getByDataCy(
      "roleEntityUserAssignmentPermissionsCanAssignToUserFromSameRoleCheckboxForModel" +
        model?._id.toString()
    ).uncheck();
    cy.getByDataCy(
      "searchResult" + otherRoleForAssignemnt?._id.toString()
    ).should("not.exist");

    cy.getByDataCy(
      "selectedRole" +
        otherRoleForAssignemnt?._id.toString() +
        "ForEntityUserAssignmentForModel" +
        model?._id.toString()
    ).should("not.exist");

    cy.getByDataCy(otherRoleForAssignemnt?.name.at(0)?.text || "").should(
      "not.exist"
    );
    cy.getByDataCy(
      "roleEntityUserAssignmentPermissionsSearchRoleInputForModel" +
        model?._id.toString()
    )
      .clear()
      .type(otherRoleForAssignemnt?.name.at(0)?.text || "");
    cy.getByDataCy("searchResult" + otherRoleForAssignemnt?._id.toString())
      .should("exist")
      .and("be.visible")
      .click();
    cy.getByDataCy(
      "selectedRole" +
        otherRoleForAssignemnt?._id.toString() +
        "ForEntityUserAssignmentForModel" +
        model?._id.toString()
    )
      .should("exist")
      .and("be.visible");
    cy.getByDataCy("roleForm")
      .contains(otherRoleForAssignemnt?.name.at(0)?.text || "")
      .should("exist")
      .and("be.visible");

    // Submit
    cy.getByDataCy("submitRoleButton").click();

    cy.getByDataCy("roleForm").should("not.exist");

    cy.getByDataCy("rolesTable").should("contain", roleToCreateName);
  });
});
