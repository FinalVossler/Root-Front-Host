import {
  IFieldReadDto,
  IModelReadDto,
  IRoleCreateCommand,
  IRoleReadDto,
  IUserCreateCommand,
  IUserReadDto,
  StaticPermissionEnum,
  SuperRoleEnum,
} from "roottypes";
import {
  createCreateFieldCommand,
  createCreateModelCommand,
} from "../fixtures/createCommands";

describe("Roles", () => {
  const modelField1CreateCommand = createCreateFieldCommand("ModelField1");
  const modelField2CreateCommand = createCreateFieldCommand("ModelField2");

  let modelField1: IFieldReadDto | undefined;
  let modelField2: IFieldReadDto | undefined;

  let model: IModelReadDto | undefined;

  let roleToUpdate: IRoleReadDto | undefined;
  let role1ToDelete: IRoleReadDto | undefined;
  let role2ToDelete: IRoleReadDto | undefined;
  let roleToFindInSearch: IRoleReadDto | undefined;
  let roleToNotFindInSearch: IRoleReadDto | undefined;
  let otherRoleForAssignemnt: IRoleReadDto | undefined;
  let user: IUserReadDto | undefined;

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

    const createModels = () => {
      cy.sendCreateModelRequest(
        createCreateModelCommand("Model used for entities test", [
          (modelField1 as IFieldReadDto)?._id.toString(),
          (modelField2 as IFieldReadDto)?._id.toString(),
        ]),
        (res) => {
          model = (res as { body: { data: IModelReadDto } }).body.data;
        }
      ).then(() => {
        createRoles();
      });
    };

    const createRoles = () => {
      const roleToUpdateCreateCommand: IRoleCreateCommand = {
        entityPermissions: [
          {
            entityEventNotifications: [],
            entityFieldPermissions: [],
            entityUserAssignmentPermissionsByRole: {
              canAssignToUserFromSameRole: true,
              otherRolesIds: [],
            },
            language: "en",
            modelId: (model as IModelReadDto)?._id.toString(),
            permissions: [
              StaticPermissionEnum.Read,
              StaticPermissionEnum.Update,
            ],
          },
        ],
        language: "en",
        name: "Role to update",
        permissions: [],
      };

      cy.sendCreateRoleRequest(roleToUpdateCreateCommand, (res) => {
        roleToUpdate = (res as { body: { data: IRoleReadDto } }).body.data;
      }).then(() => {
        cy.sendCreateRoleRequest(
          { ...roleToUpdateCreateCommand, name: "Other Role for assignment" },
          (res) => {
            otherRoleForAssignemnt = (res as { body: { data: IRoleReadDto } })
              .body.data;
          }
        ).then(() => {
          cy.sendCreateRoleRequest(
            { ...roleToUpdateCreateCommand, name: "Role1ToDelete" },
            (res) => {
              role1ToDelete = (res as { body: { data: IRoleReadDto } }).body
                .data;
            }
          ).then(() => {
            cy.sendCreateRoleRequest(
              { ...roleToUpdateCreateCommand, name: "Role2ToDelete" },
              (res) => {
                role2ToDelete = (res as { body: { data: IRoleReadDto } }).body
                  .data;
              }
            ).then(() => {
              cy.sendCreateRoleRequest(
                { ...roleToUpdateCreateCommand, name: "Find me in search" },
                (res) => {
                  roleToFindInSearch = (res as { body: { data: IRoleReadDto } })
                    .body.data;
                }
              ).then(() => {
                cy.sendCreateRoleRequest(
                  { ...roleToUpdateCreateCommand, name: "DontShow" },
                  (res) => {
                    roleToNotFindInSearch = (
                      res as { body: { data: IRoleReadDto } }
                    ).body.data;
                  }
                ).then(() => {
                  createUsers();
                });
              });
            });
          });
        });
      });
    };

    const createUsers = () => {
      const userCreateCommand: IUserCreateCommand = {
        email: "userForRoleTests@testing.com",
        firstName: "userForRoleTestsFirstName",
        lastName: "userForRoleTestsLastName",
        password: "rootroot",
        superRole: SuperRoleEnum.Normal,
        roleId: roleToUpdate?._id,
      };
      cy.sendCreateUserRequest(userCreateCommand, (res) => {
        user = (res as { body: { data: IUserReadDto } }).body.data;
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
      "entityEventNotificationEventDescriptionForModel" + model?._id.toString()
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
      .scrollIntoView()
      .and("be.visible");
    cy.getByDataCy("roleForm")
      .contains(otherRoleForAssignemnt?.name.at(0)?.text || "")
      .should("exist")
      .and("be.visible");

    // Submit
    cy.getByDataCy("submitRoleButton").click();

    cy.getByDataCy("roleForm").should("not.exist");

    cy.getByDataCy("rolesTable").should("contain", roleToCreateName);

    // Refresh the page and make sure everything looks good
    cy.reload();
    cy.getByDataCy("roleForm").should("not.exist");
    cy.getByDataCy("elementEdit").first().click();
    cy.getByDataCy("roleForm").should("exist").and("be.visible");

    // Checking the value of the name
    cy.getByDataCy("roleNameInput").should("have.value", roleToCreateName);

    // Checking the model macro permissions
    cy.getByDataCy(
      "entityPermissionCreateForModel" + model?._id.toString()
    ).should("be.checked");
    cy.getByDataCy(
      "entityPermissionReadForModel" + model?._id.toString()
    ).should("be.checked");
    cy.getByDataCy(
      "entityPermissionUpdateForModel" + model?._id.toString()
    ).should("not.be.checked");
    cy.getByDataCy(
      "entityPermissionDeleteForModel" + model?._id.toString()
    ).should("not.be.checked");

    // Checking field permissions:
    cy.getByDataCy(
      "entityPermissionExtendFieldsSectionForModel" + model?._id.toString()
    ).click();

    cy.getByDataCy(
      "entityFieldReadPermissionForModel" +
        model?._id.toString() +
        "AndField" +
        modelField1?._id.toString()
    ).should("be.checked");

    cy.getByDataCy(
      "entityFieldUpdatePermissionForModel" +
        model?._id.toString() +
        "AndField" +
        modelField1?._id.toString()
    ).should("not.be.checked");

    // Checking event notifications:
    cy.getByDataCy(
      "entityPermissionExtendEventNotificationsSectionForModel" +
        model?._id.toString()
    ).click();
    cy.getByDataCy(
      "entityEvenNotificationEventTitleInputForModel" + model?._id.toString()
    ).should("have.value", eventTitle);
    cy.getByDataCy(
      "entityEventNotificationEventDescriptionForModel" + model?._id.toString()
    ).should("have.value", eventDescription);

    // Checking the assignement permissions:
    cy.getByDataCy(
      "entityPermissionExtendUserAssignmentPermissionsSectionForModel" +
        model?._id.toString()
    ).click();

    cy.getByDataCy(
      "selectedRole" +
        otherRoleForAssignemnt?._id.toString() +
        "ForEntityUserAssignmentForModel" +
        model?._id.toString()
    )
      .should("exist")
      .scrollIntoView()
      .and("be.visible");
    cy.getByDataCy("roleForm")
      .contains(otherRoleForAssignemnt?.name.at(0)?.text || "")
      .should("exist")
      .and("be.visible");
  });

  it("should update a role", () => {
    const newRoleName = "new Role name";
    const eventTitle = "Event title";
    const eventDescription = "Event description";

    cy.getByDataCy("roleForm").should("not.exist");
    cy.get("#editButtonFor" + roleToUpdate?._id.toString()).click();
    cy.getByDataCy("roleForm").should("exist").and("be.visible");

    cy.getByDataCy("roleNameInput").should(
      "have.value",
      roleToUpdate?.name.at(0)?.text
    );

    cy.getByDataCy("roleNameInput").clear().type(newRoleName);

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
    ).check();

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
      "entityEventNotificationEventDescriptionForModel" + model?._id.toString()
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
      .scrollIntoView()
      .and("be.visible");
    cy.getByDataCy("roleForm")
      .contains(otherRoleForAssignemnt?.name.at(0)?.text || "")
      .should("exist")
      .and("be.visible");

    // Submit
    cy.getByDataCy("submitRoleButton").click();

    cy.getByDataCy("roleForm").should("not.exist");

    cy.getByDataCy("rolesTable").should("contain", newRoleName);

    // Refresh the page and make sure everything looks good
    cy.reload();
    cy.getByDataCy("roleForm").should("not.exist");
    cy.get("#editButtonFor" + roleToUpdate?._id.toString()).click();
    cy.getByDataCy("roleForm").should("exist").and("be.visible");

    // Checking the value of the name
    cy.getByDataCy("roleNameInput").should("have.value", newRoleName);

    // Checking the model macro permissions
    cy.getByDataCy(
      "entityPermissionCreateForModel" + model?._id.toString()
    ).should("not.be.checked");
    cy.getByDataCy(
      "entityPermissionReadForModel" + model?._id.toString()
    ).should("be.checked");
    cy.getByDataCy(
      "entityPermissionUpdateForModel" + model?._id.toString()
    ).should("not.be.checked");
    cy.getByDataCy(
      "entityPermissionDeleteForModel" + model?._id.toString()
    ).should("be.checked");

    // Checking field permissions:
    cy.getByDataCy(
      "entityPermissionExtendFieldsSectionForModel" + model?._id.toString()
    ).click();

    cy.getByDataCy(
      "entityFieldReadPermissionForModel" +
        model?._id.toString() +
        "AndField" +
        modelField1?._id.toString()
    ).should("be.checked");

    cy.getByDataCy(
      "entityFieldUpdatePermissionForModel" +
        model?._id.toString() +
        "AndField" +
        modelField1?._id.toString()
    ).should("not.be.checked");

    // Checking event notifications:
    cy.getByDataCy(
      "entityPermissionExtendEventNotificationsSectionForModel" +
        model?._id.toString()
    ).click();
    cy.getByDataCy(
      "entityEvenNotificationEventTitleInputForModel" + model?._id.toString()
    ).should("have.value", eventTitle);
    cy.getByDataCy(
      "entityEventNotificationEventDescriptionForModel" + model?._id.toString()
    ).should("have.value", eventDescription);

    // Checking the assignement permissions:
    cy.getByDataCy(
      "entityPermissionExtendUserAssignmentPermissionsSectionForModel" +
        model?._id.toString()
    ).click();

    cy.getByDataCy(
      "selectedRole" +
        otherRoleForAssignemnt?._id.toString() +
        "ForEntityUserAssignmentForModel" +
        model?._id.toString()
    )
      .should("exist")
      .scrollIntoView()
      .and("be.visible");
    cy.getByDataCy("roleForm")
      .contains(otherRoleForAssignemnt?.name.at(0)?.text || "")
      .should("exist")
      .and("be.visible");
  });

  it("should delete roles", () => {
    cy.get("#deleteButton").should("not.exist");

    cy.getByDataCy("rolesPage").should(
      "contain",
      role1ToDelete?.name.at(0)?.text
    );
    cy.getByDataCy("rolesPage").should(
      "contain",
      role2ToDelete?.name.at(0)?.text
    );

    cy.getByDataCy(
      "tableCheckButtonFor" + role1ToDelete?._id.toString()
    ).click();
    cy.getByDataCy(
      "tableCheckButtonFor" + role2ToDelete?._id.toString()
    ).click();

    cy.get("#deleteButton").should("exist");
    cy.get("#deleteButton").click();

    cy.getByDataCy("confirmationModalConfirmButton").click();

    cy.getByDataCy("rolesPage").should(
      "not.contain",
      role1ToDelete?.name.at(0)?.text
    );
    cy.getByDataCy("rolesPage").should(
      "not.contain",
      role2ToDelete?.name.at(0)?.text
    );
  });

  it("should search for a role", () => {
    cy.getByDataCy("elementsSearchInput").should("be.visible");

    cy.getByDataCy("elementsSearchInput").type(
      roleToFindInSearch?.name.at(0)?.text || ""
    );
    cy.getByDataCy("rolesPage").should(
      "contain",
      roleToFindInSearch?.name.at(0)?.text
    );
    cy.getByDataCy("rolesPage").should(
      "not.contain",
      roleToNotFindInSearch?.name.at(0)?.text
    );
  });
});
