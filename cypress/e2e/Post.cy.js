describe('CRUD tests with mocked requests', () => {
  beforeEach(function () {
    // Load fixtures
    cy.fixture('cypress.env.json')
      .as('cypress')
      .catch(() => {
        // Fallback or mock data if fixture is not found
        this.cypress = {
          email: 'User@stud.noroff.no',
          tags: 'password123',
        };
      });
    cy.fixture('postData.json')
      .as('postData')
      .catch(() => {
        // Fallback or mock data if fixture is not found
        this.postData = {
          title: 'Fallback Title',
          tags: 'fallback',
          media: 'https://fallback.url/image.jpg',
          body: 'Fallback body',
        };
      });
    cy.visit('/');

    // Mock the create post request
    cy.intercept('POST', '**/social/posts', (req) => {
      console.log('Intercepted create post request:', req);
      req.reply({
        statusCode: 201,
        body: { ...this.postData, id: '12345' },
      });
    }).as('createPost');
  });

  it('Should be able to create post (mocked)', function () {
    // Log in and navigate to the post creation page
    cy.openLoginForm();
    cy.loginUser(this.cypress.email, this.cypress.password);
    cy.get('a[href="./?view=post"]').click();

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

    cy.wait(2000); // Wait to simulate any necessary loading
    cy.log('Post succesfully mocket');
  });
});
