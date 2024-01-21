import {
  IFieldCreateCommand,
  IModelCreateCommand,
  IPostCreateCommand,
  IRoleCreateCommand,
  IUserCreateCommand,
  IUserLoginCommand,
  IUserReadDto,
} from "roottypes";
import { setUserAndTokenInformationInLocalStorage } from "../../src/store/slices/userSlice";

Cypress.Commands.add(
  "sendCreateUserRequest",
  (command: IUserCreateCommand, callback) => {
    cy.get("@adminToken").then((adminToken) => {
      cy.request({
        url: Cypress.env("backendUrl") + "/users/",
        method: "POST",
        body: command,

        headers: {
          Authorization: "Bearer " + adminToken,
        },
      }).then(callback);
    });
  }
);

Cypress.Commands.add(
  "sendCreateRoleRequest",
  (command: IRoleCreateCommand, callback) => {
    cy.get("@adminToken").then((adminToken) => {
      cy.request({
        url: Cypress.env("backendUrl") + "/roles/",
        method: "POST",
        body: command,

        headers: {
          Authorization: "Bearer " + adminToken,
        },
      }).then(callback);
    });
  }
);

Cypress.Commands.add("sendCreateFileRequest", (url: string, callback) => {
  cy.get("@adminToken").then((adminToken) => {
    cy.request({
      url: Cypress.env("backendUrl") + "/testsPreparation/createFile",
      method: "POST",
      body: { url },
      headers: {
        Authorization: "Bearer " + adminToken,
      },
    }).then(callback);
  });
});

Cypress.Commands.add(
  "sendCreatePostRequest",
  (command: IPostCreateCommand, callback) => {
    cy.get("@adminToken").then((adminToken) => {
      cy.request({
        method: "POST",
        body: command,
        url: Cypress.env("backendUrl") + "/posts/",
        headers: {
          Authorization: "Bearer " + adminToken,
        },
      }).then(callback);
    });
  }
);

Cypress.Commands.add(
  "sendCreateFieldRequest",
  (command: IFieldCreateCommand, callback) => {
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
  (command: IModelCreateCommand, callback) => {
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
    cy.wait(1000);
  }
);

Cypress.Commands.add("getByDataCy", (selector) => {
  return cy.get("[data-cy='" + selector + "']");
});

Cypress.Commands.add(
  "login",
  (
    updateLocalStorage?: boolean,
    credentials?: { email: string; password: string }
  ) => {
    const command: IUserLoginCommand = {
      email: credentials?.email || Cypress.env("adminEmail"),
      password: credentials?.password || Cypress.env("adminPassword"),
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
        data: { expiresIn: string; token: string; user: IUserReadDto };
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
  }
);

Cypress.Commands.add("prepareMarktMaven", () => {
  cy.get("@adminToken").then((adminToken) => {
    cy.request({
      method: "POST",
      url: Cypress.env("backendUrl") + "/testsPreparation/prepareMarketMaven",
      headers: {
        Authorization: "Bearer " + adminToken,
      },
    }).then((res) => {});
  });
});

declare global {
  namespace Cypress {
    interface Chainable {
      getByDataCy(selector: string): Chainable;
      login(
        updateLocalStorage?: boolean,
        credentials?: { email: string; password: string }
      ): Chainable;
      prepareMarktMaven(): Chainable;
      selectInSelector(
        selectorClassName: string,
        elementIndex: number
      ): Chainable;
      sendCreatePostRequest(
        command: IPostCreateCommand,
        callback: (res: any) => void
      );
      sendCreateFieldRequest(
        command: IFieldCreateCommand,
        callback: (res: any) => void
      );
      sendCreateModelRequest(
        command: IModelCreateCommand,
        callback: (res: any) => void
      );
      sendCreateFileRequest(
        url: string,
        callback: (res: any) => void
      ): Chainable;
      sendCreateRoleRequest(
        command: IRoleCreateCommand,
        callback: (res: any) => void
      );
      sendCreateUserRequest(
        command: IUserCreateCommand,
        callback: (res: any) => void
      );
    }
  }
}
