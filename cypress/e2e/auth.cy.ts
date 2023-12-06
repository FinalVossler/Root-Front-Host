import { logoutInLocalStorage } from "../../src/store/slices/userSlice";

describe("login", () => {
  beforeEach(() => {
    logoutInLocalStorage();
    cy.visit("/auth");
  });

  it("should login", () => {
    cy.getByDataCy("sideMenu").should("not.exist");

    cy.getByDataCy("loginButton").click();
    cy.getByDataCy("loginForm").should("exist").should("be.visible");

    cy.getByDataCy("loginFormEmailInputError").should("be.empty");
    cy.getByDataCy("loginFormPasswordInputError").should("be.empty");

    cy.getByDataCy("loginFormEmailInput").type("invalidEmail@gmail");
    cy.getByDataCy("loginFormPasswordInput").type("fff");

    cy.getByDataCy("loginFormSubmitButton").click();

    cy.getByDataCy("loginFormEmailInputError").should("not.be.empty");
    cy.getByDataCy("loginFormPasswordInputError").should("not.be.empty");

    cy.getByDataCy("loginFormEmailInput")
      .clear()
      .type(Cypress.env("adminEmail"));
    cy.getByDataCy("loginFormPasswordInput")
      .clear()
      .type(Cypress.env("adminPassword"));

    cy.getByDataCy("loginFormSubmitButton").click();

    cy.getByDataCy("sideMenu").should("be.visible");
  });

  it("should register", () => {
    cy.getByDataCy("registrationForm").should("be.visible");

    cy.getByDataCy("registrationFormFirstNameInputError").should("be.empty");
    cy.getByDataCy("registrationFormLastNameInputError").should("be.empty");
    cy.getByDataCy("registrationFormEmailInputError").should("be.empty");
    cy.getByDataCy("registrationFormPasswordInputError").should("be.empty");
    cy.getByDataCy("registrationFormConfirmPasswordInputError").should(
      "be.empty"
    );

    cy.getByDataCy("registrationFormSubmitButton").click();

    cy.getByDataCy("registrationFormFirstNameInputError").should(
      "not.be.empty"
    );
    cy.getByDataCy("registrationFormLastNameInputError").should("not.be.empty");
    cy.getByDataCy("registrationFormEmailInputError").should("not.be.empty");
    cy.getByDataCy("registrationFormPasswordInputError").should("not.be.empty");
    cy.getByDataCy("registrationFormConfirmPasswordInputError").should(
      "not.be.empty"
    );

    cy.getByDataCy("registrationFormFirstNameInput").type("Mizu");
    cy.getByDataCy("registrationFormLastNameInput").type("Taki");
    cy.getByDataCy("registrationFormEmailInput").type("mizuTaki@miki.com");
    cy.getByDataCy("registrationFormPasswordInput").type(
      "goodAndStronPassword"
    );
    cy.getByDataCy("registrationFormConfirmPasswordInput").type(
      "differentPasswordConfirmation"
    );

    cy.getByDataCy("registrationFormFirstNameInputError").should("be.empty");
    cy.getByDataCy("registrationFormLastNameInputError").should("be.empty");
    cy.getByDataCy("registrationFormEmailInputError").should("be.empty");
    cy.getByDataCy("registrationFormPasswordInputError").should("be.empty");
    cy.getByDataCy("registrationFormConfirmPasswordInputError").should(
      "not.be.empty"
    );

    cy.getByDataCy("registrationFormConfirmPasswordInput")
      .clear()
      .type("goodAndStronPassword");

    cy.getByDataCy("registrationFormSubmitButton").click();

    cy.getByDataCy("sideMenu").should("be.visible");
  });
});
