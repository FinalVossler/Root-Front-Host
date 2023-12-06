import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000", // Used so that cypress understands automatically that it needs to go to this url when cy.visit is called
  },
  env: {
    baseUrl: "http://localhost:3000",
    backendUrl: "http://localhost:5000",
    adminEmail: "hk.kh.pro@gmail.com",
    adminPassword: "rootroot",
  },
});
