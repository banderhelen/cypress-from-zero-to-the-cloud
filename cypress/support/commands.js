// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', { prevSubject: 'optional'}, (subject, options) => {
    cy.get("input[name='firstName']").type("John");
    cy.get("#lastName").type("Doe");
    cy.get("#email").type("banderhelen@gmail.com");
    cy.get("#email-checkbox").check();
    cy.get("textarea[name='open-text-area']").type("This is a test message".repeat(30), {delay: 0});
    cy.contains("button","Send").click();
 })
