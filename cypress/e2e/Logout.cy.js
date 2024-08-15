// Logout.cy.js

describe('Logout tests', () => {
  beforeEach(function () {
    cy.visit('/');
    cy.fixture('cypress.env.json').as('cypress');
  });
  it('should successfully log in then log out and remove token and profile', function () {
    cy.openLoginForm();
    cy.loginUser(this.cypress.email, this.cypress.password);

    // find logout button and log out
    cy.get('button[data-auth=logout]').should('exist').click({ force: true });

    cy.isLoggedOut();
  });
});
