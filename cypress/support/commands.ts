import { FieldCreateCommand } from "../../src/hooks/apiHooks/useCreateField";
import { ModelCreateCommand } from "../../src/hooks/apiHooks/useCreateModel";
import { UserLoginCommand } from "../../src/hooks/apiHooks/useLogin";
import {
  IUser,
  setUserAndTokenInformationInLocalStorage,
} from "../../src/store/slices/userSlice";

Cypress.Commands.add("sendCreateFileRequest", (url: string, callback) => {
  cy.get("@adminToken").then((adminToken) => {
    cy.request({
      url: Cypress.env("backendUrl") + "/cypress/createFile",
      method: "POST",
      body: { url },
      headers: {
        Authorization: "Bearer " + adminToken,
      },
    }).then(callback);
  });
});

Cypress.Commands.add(
  "sendCreateFieldRequest",
  (command: FieldCreateCommand, callback) => {
    cy.get("@adminToken").then((adminToken) => {
      cy.request({
        method: "POST",
        body: command,
        url: Cypress.env("backendUrl") + "/fields/",
        headers: {
          Authorization: "Bearer " + adminToken,
        },
      }).then(callback);
    });
  }
);

Cypress.Commands.add(
  "sendCreateModelRequest",
  (command: ModelCreateCommand, callback) => {
    cy.get("@adminToken").then((adminToken) => {
      cy.request({
        method: "POST",
        body: command,
        url: Cypress.env("backendUrl") + "/models/",
        headers: {
          Authorization: "Bearer " + adminToken,
        },
      }).then((res) => {
        callback(res);
      });
    });
  }
);

Cypress.Commands.add(
  "selectInSelector",
  (selectorClassName: string, elementIndex: number) => {
    cy.get("." + selectorClassName)
      .click()
      .find(".react-select__option")
      .eq(elementIndex)
      .click();
  }
);

Cypress.Commands.add("getByDataCy", (selector) => {
  return cy.get("[data-cy='" + selector + "']");
});

Cypress.Commands.add("login", (updateLocalStorage?: boolean) => {
  const command: UserLoginCommand = {
    email: Cypress.env("adminEmail"),
    password: Cypress.env("adminPassword"),
  };

  cy.request({
    url: Cypress.env("backendUrl") + "/users/login",
    method: "POST",
    body: command,
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    const result: {
      success: boolean;
      data: { expiresIn: string; token: string; user: IUser };
    } = res.body;
    const token = result.data.token;

    if (updateLocalStorage) {
      setUserAndTokenInformationInLocalStorage({
        user: result.data.user,
        expiresIn: result.data.expiresIn,
        token: result.data.token,
      });
    }

    cy.wrap(token).as("adminToken");
  });
});

declare global {
  namespace Cypress {
    interface Chainable {
      getByDataCy(selector: string): Chainable;
      login(uploadLocalStorage?: boolean): Chainable;
      selectInSelector(
        selectorClassName: string,
        elementIndex: number
      ): Chainable;
      sendCreateFieldRequest(
        command: FieldCreateCommand,
        callback: (res: any) => void
      );
      sendCreateModelRequest(
        command: ModelCreateCommand,
        callback: (res: any) => void
      );
      sendCreateFileRequest(
        url: string,
        callback: (res: any) => void
      ): Chainable;
    }
  }
}
