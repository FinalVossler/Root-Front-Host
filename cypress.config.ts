import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000", // Used so that cypress understands automatically that it needs to go to this url when cy.visit is called
    defaultCommandTimeout: 20000,
  },
  env: {
    baseUrl: "http://localhost:3000",
    backendUrl: "http://localhost:5000",
    adminEmail: "hk.kh.pro@gmail.com",
    adminPassword: "rootroot",
  },
  viewportHeight: 850,
  viewportWidth: 1600,
});
