describe('CRUD tests with mocked request', () => {
  beforeEach(function () {
    // Load fixtures
    cy.fixture('postData.json').as('postData');
    cy.visit('/');

    // Mock the create post request
    cy.intercept('POST', '**/social/posts', (req) => {
      req.reply({
        statusCode: 201,
        body: { ...this.postData, id: '12345' },
      });
    }).as('createPost');
  });

  it('Should be able to create post (mocked)', function () {
    // Log in and navigate to the post creation page
    cy.openLoginForm();
    cy.loginUser(Cypress.env('email'), Cypress.env('password'));

    // Click on the "New Post" button
    cy.get('a[href="./?view=post"].btn.btn-outline-success')
      .should('be.visible') // Ensure the button is visible
      .click({ force: true }); // Force click in case of overlapping elements

    // Wait for the form to become visible
    cy.get('#postForm', { timeout: 20000 }).should('exist').and('be.visible');

    // Create a post (mocked)
    cy.createPost(
      this.postData.title,
      this.postData.tags,
      this.postData.media,
      this.postData.body,
    );

    // Verify that the post was created
    cy.wait('@createPost', { timeout: 10000 }).then((interception) => {
      expect(interception.response.statusCode).to.eq(201);
    });
  });
});
