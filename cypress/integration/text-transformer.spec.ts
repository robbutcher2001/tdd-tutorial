describe("Text Transformer", () => {
  it("should load with an initially empty input box", () => {
    cy.visit("http://localhost:3000");

    cy.get('[data-testid="transformer-input"]').should("have.value", "");
  });

  it("should load with disabled action buttons", () => {
    cy.visit("http://localhost:3000");

    cy.get('[data-testid="lowercase-action"]').should("be.disabled");
    cy.get('[data-testid="uppercase-action"]').should("be.disabled");
    cy.get('[data-testid="camelcase-action"]').should("be.disabled");
    cy.get('[data-testid="capitalisecase-action"]').should("be.disabled");
  });

  it("should load with an initially empty list before any button is clicked", () => {
    cy.visit("http://localhost:3000");

    cy.get('[data-testid="output-cards"]').children().should("have.length", 0);
  });

  it("should let you type text into an input field", () => {
    cy.visit("http://localhost:3000");

    cy.get('[data-testid="transformer-input"]').clear().type("hello");

    cy.get('[data-testid="transformer-input"]').should("have.value", "hello");
  });

  it("should only enable action buttons once there is one or more characters typed into the input field", () => {
    cy.visit("http://localhost:3000");

    cy.get('[data-testid="transformer-input"]').clear().type("a");

    cy.get('[data-testid="lowercase-action"]').should("be.enabled");
    cy.get('[data-testid="uppercase-action"]').should("be.enabled");
    cy.get('[data-testid="camelcase-action"]').should("be.enabled");
    cy.get('[data-testid="capitalisecase-action"]').should("be.enabled");
  });

  it("should have four action buttons available 'Lowercase', 'Uppercase', 'Camel case' and 'Capitalise case'", () => {
    cy.visit("http://localhost:3000");

    cy.get('[data-testid="lowercase-action"]').contains("Lowercase");
    cy.get('[data-testid="uppercase-action"]').contains("Uppercase");
    cy.get('[data-testid="camelcase-action"]').contains("Camel case");
    cy.get('[data-testid="capitalisecase-action"]').contains("Capitalise case");
  });

  it("should show the transformation text result in an 'output card' once a button is clicked", () => {
    cy.visit("http://localhost:3000");

    cy.get('[data-testid="transformer-input"]').clear().type("hello");
    cy.get('[data-testid="uppercase-action"]').click();

    cy.get('[data-testid="output-cards"]').children().should("have.length", 1);
    cy.get(
      '[data-testid="output-cards"] > li:nth-child(1) > section:nth-of-type(2) > p'
    ).contains("HELLO");
  });

  it("should contain an output card with the contents of 'original text', 'transformed text' and the 'action taken' by the user", () => {
    cy.visit("http://localhost:3000");

    cy.get('[data-testid="transformer-input"]').clear().type("hello");
    cy.get('[data-testid="uppercase-action"]').click();

    cy.get('[data-testid="output-cards"]').children().should("have.length", 1);
    cy.get('[data-testid="output-cards"] > li:nth-child(1) > h1').contains(
      "Uppercase Transform"
    );
    cy.get(
      '[data-testid="output-cards"] > li:nth-child(1) > section:nth-of-type(1) > h2'
    ).contains("Original");
    cy.get(
      '[data-testid="output-cards"] > li:nth-child(1) > section:nth-of-type(1) > p'
    ).contains("hello");
    cy.get(
      '[data-testid="output-cards"] > li:nth-child(1) > section:nth-of-type(2) > h2'
    ).contains("Transformed");
    cy.get(
      '[data-testid="output-cards"] > li:nth-child(1) > section:nth-of-type(2) > p'
    ).contains("HELLO");
  });

  it("should contain a list of two cards once two action buttons have been clicked", () => {
    cy.visit("http://localhost:3000");

    cy.get('[data-testid="transformer-input"]').clear().type("hello");
    cy.get('[data-testid="uppercase-action"]').click();
    cy.get('[data-testid="capitalisecase-action"]').click();

    cy.get('[data-testid="output-cards"]').children().should("have.length", 2);
  });

  it("should contain a list of three cards once three action buttons have been clicked, with the most recent translation at the top", () => {
    cy.visit("http://localhost:3000");

    cy.get('[data-testid="transformer-input"]').clear().type("hello world");
    cy.get('[data-testid="uppercase-action"]').click();
    cy.get('[data-testid="capitalisecase-action"]').click();
    cy.get('[data-testid="camelcase-action"]').click();

    cy.get('[data-testid="output-cards"]').children().should("have.length", 3);
    cy.get(
      '[data-testid="output-cards"] > li:nth-child(1) > section:nth-of-type(2) > p'
    ).contains("helloWorld");
  });

  it("should not maintain state between page (app) refreshes", () => {
    cy.visit("http://localhost:3000");

    cy.get('[data-testid="transformer-input"]').clear().type("hello");
    cy.get('[data-testid="uppercase-action"]').click();

    cy.get('[data-testid="output-cards"]').children().should("have.length", 1);

    cy.reload();

    cy.get('[data-testid="output-cards"]').children().should("have.length", 0);
  });
});

export {};
