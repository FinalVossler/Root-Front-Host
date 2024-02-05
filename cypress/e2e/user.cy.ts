import { IUserCreateCommand, IUserReadDto, SuperRoleEnum } from "roottypes";

describe("User", () => {
  let userToUpdate: IUserReadDto | undefined;
  let user1ToDelete: IUserReadDto | undefined;
  let user2ToDelete: IUserReadDto | undefined;
  let userToFindInSearch: IUserReadDto | undefined;
  let userToNotFindInSearch: IUserReadDto | undefined;

  before(() => {
    const createUserCommand: IUserCreateCommand = {
      email: "userToUpdate@email.com",
      firstName: "userToUpdateFirstName",
      lastName: "userToUpdateLastName",
      password: "rootroot",
      superRole: SuperRoleEnum.SuperAdmin,
    };

    const user1ToDeleteCommand: IUserCreateCommand = {
      email: "user1ToDelete@email.com",
      firstName: "user1ToDeleteFirstName",
      lastName: "user1ToDeleteLastName",
      password: "rootroot",
      superRole: SuperRoleEnum.SuperAdmin,
    };

    const user2ToDeleteCommand: IUserCreateCommand = {
      email: "user2ToDelete@email.com",
      firstName: "user2ToDeleteFirstName",
      lastName: "user2ToDeleteLastName",
      password: "rootroot",
      superRole: SuperRoleEnum.SuperAdmin,
    };

    const userToFindInSearchCommand: IUserCreateCommand = {
      email: "userToFindInSearch@email.com",
      firstName: "myFirstYouKnow",
      lastName: "TheSecondThing",
      password: "rootroot",
      superRole: SuperRoleEnum.SuperAdmin,
    };

    const userToNotFindInSearchCommand: IUserCreateCommand = {
      email: "whereIsTheSearch@email.com",
      firstName: "Ishouldntbefound",
      lastName: "ThereGoesTheNoFound",
      password: "rootroot",
      superRole: SuperRoleEnum.SuperAdmin,
    };

    cy.sendCreateUserRequest(createUserCommand, (res) => {
      userToUpdate = (res as { body: { data: IUserReadDto } }).body.data;
    }).then(() => {
      cy.sendCreateUserRequest(user1ToDeleteCommand, (res) => {
        user1ToDelete = (res as { body: { data: IUserReadDto } }).body.data;
      }).then(() => {
        cy.sendCreateUserRequest(user2ToDeleteCommand, (res) => {
          user2ToDelete = (res as { body: { data: IUserReadDto } }).body.data;
        }).then(() => {
          cy.sendCreateUserRequest(userToFindInSearchCommand, (res) => {
            userToFindInSearch = (res as { body: { data: IUserReadDto } }).body
              .data;
          }).then(() => {
            cy.sendCreateUserRequest(userToNotFindInSearchCommand, (res) => {
              userToNotFindInSearch = (res as { body: { data: IUserReadDto } })
                .body.data;
            });
          });
        });
      });
    });
  });

  beforeEach(() => {
    cy.login(true);
    cy.visit("/");

    cy.getByDataCy("sideMenuUsersOption").click();

    cy.getByDataCy("usersPage").should("be.visible");
  });

  it("should create a user", () => {
    const correctAndConfirmedPassword: string = "cypressPassword";
    const firstName: string = "CypressFirstName";
    const lastName: string = "CypressLastName";

    cy.getByDataCy("addElementButton").click();

    cy.getByDataCy("userForm").should("be.visible");

    cy.getByDataCy("firstNameInputError").should("be.empty");
    cy.getByDataCy("lastNameInputError").should("be.empty");
    cy.getByDataCy("emailInputError").should("be.empty");
    cy.getByDataCy("passwordInputError").should("be.empty");
    cy.getByDataCy("confirmPasswordInputError").should("be.empty");

    cy.getByDataCy("userFormSubmitButton").click();

    cy.getByDataCy("firstNameInputError").should("not.be.empty");
    cy.getByDataCy("lastNameInputError").should("not.be.empty");
    cy.getByDataCy("emailInputError").should("not.be.empty");
    cy.getByDataCy("passwordInputError").should("not.be.empty");

    cy.getByDataCy("firstNameInput").type(firstName);
    cy.getByDataCy("lastNameInput").type(lastName);
    cy.getByDataCy("emailInput").type("cypress@email.com");
    cy.getByDataCy("passwordInput").type(correctAndConfirmedPassword);
    cy.getByDataCy("confirmPasswordInput").type("wrongPassword");

    cy.getByDataCy("userFormSubmitButton").click();

    cy.getByDataCy("firstNameInputError").should("be.empty");
    cy.getByDataCy("lastNameInputError").should("be.empty");
    cy.getByDataCy("emailInputError").should("be.empty");
    cy.getByDataCy("passwordInputError").should("be.empty");
    cy.getByDataCy("confirmPasswordInputError").should("not.be.empty");

    cy.getByDataCy("confirmPasswordInput")
      .clear()
      .type(correctAndConfirmedPassword);

    cy.getByDataCy("userFormSubmitButton").click();
    cy.getByDataCy("userForm").should("not.exist");

    cy.getByDataCy("usersPage").should("contain.text", firstName);
    cy.getByDataCy("usersPage").should("contain.text", lastName);
  });

  it("should update a user", () => {
    const updatedFirstName: string = "UpdatedFirstName";
    const updatedLastName: string = "UpdatedFirstName";
    const updatedEmail: string = "updatedEmail@email.com";

    cy.get("#editButtonFor" + userToUpdate?._id.toString())
      .scrollIntoView()
      .click({ force: true });

    cy.getByDataCy("userForm").should("be.visible");

    cy.getByDataCy("firstNameInput").clear().type(updatedFirstName);
    cy.getByDataCy("lastNameInput").clear().type(updatedLastName);
    cy.getByDataCy("emailInput").clear().type(updatedEmail);

    cy.getByDataCy("userFormSubmitButton").click();

    cy.reload();

    cy.getByDataCy("sideMenuUsersOption").click();
    cy.getByDataCy("usersPage").should("be.visible");

    cy.getByDataCy("usersPage").should("contain.text", updatedFirstName);
    cy.getByDataCy("usersPage").should("contain.text", updatedLastName);
  });

  it("should delete users", () => {
    cy.get("#deleteButton").should("not.exist");

    cy.getByDataCy("usersPage").should("contain", user1ToDelete?.firstName);
    cy.getByDataCy("usersPage").should("contain", user2ToDelete?.firstName);

    cy.getByDataCy("tableCheckButtonFor" + user1ToDelete?._id.toString())
      .scrollIntoView()
      .click();
    cy.getByDataCy("tableCheckButtonFor" + user2ToDelete?._id.toString())
      .scrollIntoView()
      .click();

    cy.get("#deleteButton").should("exist");
    cy.get("#deleteButton").click();

    cy.getByDataCy("confirmationModalConfirmButton").click();

    cy.getByDataCy("usersPage").should("not.contain", user1ToDelete?.firstName);
    cy.getByDataCy("usersPage").should("not.contain", user2ToDelete?.firstName);
  });

  it("should search for user by email, firstname and lastname", () => {
    cy.getByDataCy("elementsSearchInput").should("be.visible");

    // search by email
    cy.getByDataCy("elementsSearchInput").type(
      userToFindInSearch?.email.slice(
        0,
        userToFindInSearch?.email.indexOf("@")
      ) || ""
    );
    cy.getByDataCy("usersPage").should(
      "contain",
      userToFindInSearch?.firstName
    );
    cy.getByDataCy("usersPage").should(
      "not.contain",
      userToNotFindInSearch?.firstName
    );

    // clear and make sure all users are shown
    cy.getByDataCy("elementsSearchInput").scrollIntoView().clear();
    cy.getByDataCy("usersPage").should(
      "contain",
      userToFindInSearch?.firstName
    );
    cy.getByDataCy("usersPage").should(
      "contain",
      userToNotFindInSearch?.firstName
    );

    // search by firstname
    cy.getByDataCy("elementsSearchInput").type(
      userToFindInSearch?.firstName || ""
    );
    cy.getByDataCy("usersPage").should(
      "contain",
      userToFindInSearch?.firstName
    );
    cy.getByDataCy("usersPage").should(
      "not.contain",
      userToNotFindInSearch?.firstName
    );

    // clear and make sure all users are shown
    cy.getByDataCy("elementsSearchInput").clear();
    cy.getByDataCy("usersPage").should(
      "contain",
      userToFindInSearch?.firstName
    );
    cy.getByDataCy("usersPage").should(
      "contain",
      userToNotFindInSearch?.firstName
    );

    // search by lastname
    cy.getByDataCy("elementsSearchInput").type(
      userToFindInSearch?.lastName || ""
    );
    cy.getByDataCy("usersPage").should(
      "contain",
      userToFindInSearch?.firstName
    );
    cy.getByDataCy("usersPage").should(
      "not.contain",
      userToNotFindInSearch?.firstName
    );

    // clear and make sure all users are shown
    cy.getByDataCy("elementsSearchInput").clear();
    cy.getByDataCy("usersPage").should(
      "contain",
      userToFindInSearch?.firstName
    );
    cy.getByDataCy("usersPage").should(
      "contain",
      userToNotFindInSearch?.firstName
    );
  });
});
