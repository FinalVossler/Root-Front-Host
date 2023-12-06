import { UserLoginCommand } from "../../src/hooks/apiHooks/useLogin";
import {
  IUser,
  setUserAndTokenInformationInLocalStorage,
} from "../../src/store/slices/userSlice";

Cypress.Commands.add("login", () => {
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

    setUserAndTokenInformationInLocalStorage({
      user: result.data.user,
      expiresIn: result.data.expiresIn,
      token: result.data.token,
    });

    cy.wrap(token).as("adminToken");
  });
});

declare global {
  namespace Cypress {
    interface Chainable {
      login(): Chainable;
    }
  }
}
