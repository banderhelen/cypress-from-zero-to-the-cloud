describe("TAT Customer Service Center", () => {
  beforeEach(() => {
    cy.visit("./src/index.html");
  });
  it("checks the application title", () => {
    cy.title().should("be.equal", "TAT Customer Service Center");
  });
  it("fillsin the required fields and submits the form", () => {
    cy.get("input[name='firstName']").type("John");
    cy.get("#lastName").type("Doe");
    cy.get("#email").type("banderhelen@gmail.com");
    cy.get("#email-checkbox").check();
    cy.get("textarea[name='open-text-area']").type("This is a test message".repeat(30), {delay: 0});
    cy.contains("button","Send").click();
    cy.get(".success").should("be.visible");
  });
  it("displays an error message when submitting the form with an email with invalid formatting", () => {
    cy.get("input[name='firstName']").type("John");
    cy.get("#lastName").type("Doe");
    cy.get("#email").type("banderhelen&gmail.com");
    cy.get("#email-checkbox").check();
    cy.get("textarea[name='open-text-area']").type("This is a test message".repeat(30), {delay: 0});
    cy.contains("button","Send").click();
    cy.get(".error").should("be.visible");
  });
  it("validates that the phone input filed only accepts numbers", () => {
    cy.get("#phone")
      .type("abcde")
      .should("have.value", "");
  });
  it("fills and clears the first name, last name, email, and phone fields", () => {
    cy.get("input[name='firstName']").type("John").should("have.value", "John").clear().should("have.value", "");
    cy.get("#lastName").type("Doe").should("have.value", "Doe").clear().should("have.value", "");
    cy.get("#email").type("banderhelen@gmail.com").should("have.value","banderhelen@gmail.com").clear().should("have.value", "");
  });
  it("displays an error message when submitting the form without filling the required fields", () => {
    cy.get("input[name='firstName']").type("John");
    cy.get("#email").type("banderhelen@gmail.com");
    cy.get("#phone-checkbox").check();
    cy.contains("button","Send").click();
    cy.get(".error").should("be.visible");
  });
  it("successfully submits the form using a custom command", () => {
    cy.fillMandatoryFieldsAndSubmit();
    cy.get(".success").should("be.visible");
  });
  it("selects a product (YouTube) by its content", () => {
    cy.get('#product').select('YouTube').should('have.value', 'youtube');
  });
  it("selects a product (Mentorship) by its value", () => {
    cy.get('#product').select('mentorship').should('have.value', 'mentorship');
  });
  it("selects a product (Blog) by its index", () => {
    cy.get('#product').select(1).should('have.value', 'blog');
  });
  it('checks the type of service "Feedback"', () => {
    cy.get('#support-type > :nth-child(4) > input').check().should('be.checked');
  });
  it('checks each type of service"', () => {
    cy.get('#support-type')
    .find('input[type="radio"]')
    .each(typeOfService => {
      cy.wrap(typeOfService)
      .check()
      .should('be.checked');
    })
  });
  it('checks both checkboxes, then unchecks the last one', () => {
    cy.get('input[type="checkbox"]')
    .check()
    .should('be.checked')
    .last()
    .uncheck()
    .should('not.be.checked');
  });
  it('displays an error message when the phone becomes required but is not filled in before the form submission', () => {
    cy.get('#phone-checkbox').check()
    cy.contains("button","Send").click();
    cy.get(".error").should("be.visible");
  });
  it('selects a file from the fixtures folder', () => {
    cy.get('input[type="file"]')
    .selectFile('cypress/fixtures/example.json')
    .should(input => {
      expect(input[0].files[0].name).to.eq('example.json');
    });
  });
  it('selects a file simulating a drag-and-drop action', () => {
    cy.get('input[type="file"]')
    .selectFile('cypress/fixtures/example.json',{action: 'drag-drop'})
    .should(input => {
      expect(input[0].files[0].name).to.eq('example.json');
    });
  });
  it('selects a file using a fixture to which an alias was given', () => {
    cy.fixture('example.json').as('example')
    cy.get('input[type="file"]')
    .selectFile('@example')
    .should(input => {
      expect(input[0].files[0].name).to.eq('example.json');
    });
  });
  it('verifies that the privacy policy page opens in another tab without the need for a click', () => {
    cy.get('a')
    .contains('Privacy Policy')
    .should('have.attr', 'href', 'privacy.html')
    .and('have.attr', 'target', '_blank');
  });
  it('access the privacy policy page by removing the target, then clicking on the link', () => {
    cy.contains('a','Privacy Policy')
    .invoke('removeAttr', 'target')
    .click()
    cy.contains('h1','TAT CSC - Privacy Policy').should('be.visible');
    });
    
});
