import { UserCreateCommand } from "../../src/hooks/apiHooks/useCreateUser";
import { IUser, SuperRole } from "../../src/store/slices/userSlice";

describe("users", () => {
  let userToUpdate: IUser | undefined;

  before(async () => {
    const createUserCommand: UserCreateCommand = {
      email: "userToUpdate@email.com",
      firstName: "userToUpdateFirstName",
      lastName: "userToUpdateLastName",
      password: "rootroot",
      superRole: SuperRole.SuperAdmin,
    };
    await cy.sendCreateUserRequest(createUserCommand, (res) => {
      userToUpdate = (res as { body: { data: IUser } }).body.data;
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
});
