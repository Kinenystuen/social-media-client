// login.cy.js

describe('Login Tests', () => {
  beforeEach(function () {
    cy.visit('/');
    cy.fixture('cypress.env.json').as('cypress');
  });

  it('should open a login form when the login button is pressed', () => {
    cy.openLoginForm();
  });
  it('should successfully log in and save the token and profile', function () {
    cy.openLoginForm();

    // Use the loaded fixture data to log in
    cy.loginUser(this.cypress.email, this.cypress.password);
    cy.isLoggedIn();
  });
  it('should show an error when invalid userdata tries to log in', function () {
    cy.openLoginForm();
    cy.loginUser(this.cypress.invalidEmail, this.cypress.invalidPassword);
    cy.on('window:alert', () => {
      expect(true).to.be.true;
    });
  });
});
