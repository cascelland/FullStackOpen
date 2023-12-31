describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'testUser',
      password: 'testPassword'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    const secondUser = {
      username: 'testSecondUser',
      password: 'testSecondPassword'
    }
    cy.request('POST', 'http://localhost:3003/api/users', secondUser)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function () {
    cy.contains('login').click()
    cy.contains('login to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click()

      cy.get('input:first').type('testUser')
      cy.get('input:last').type('testPassword')
      cy.get('#login-button').click()
      cy.contains('testUser logged in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('login').click()

      cy.get('input:first').type('testUser')
      cy.get('input:last').type('wrong')
      cy.get('#login-button').click()
      cy.should('not.contain', 'testUser logged in')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.contains('login').click()
      cy.login({ username: 'testUser', password: 'testPassword' })
    })

    it('A blog can be created', function () {

      cy.createBlog()

      cy.contains('test title test author')

    })

    it('A blog can be liked', function () {
      cy.createBlog()

      cy.contains('show').click()
      cy.get('html').should('contain', 'likes: 0')
      cy.get('#like-button').click()
      cy.get('html').should('contain', 'likes: 1')
    })

    it('A blog can be deleted', function () {
      cy.createBlog()
      cy.contains('show').click()
      cy.contains('delete').click()
      cy.should('not.contain', 'test title test author')
    })

    it('Only the creator can see delete button on their blog', function () {
      cy.createBlog()
      cy.contains('logout').click()
      cy.login({ username: 'testSecondUser', password: 'testSecondPassword' })
      cy.contains('show').click()
      cy.get('html').should('not.contain', 'delete')
    })

    it('blogs are ordered according to likes', function () {

      cy.createBlog('second most likes', 'second most liked author', 'url')
      cy.contains('second most likes second most liked author')
        .contains('show')
        .click()
      cy.get('#like-button').click().click()
      cy.contains('hide').click()

      cy.createBlog('first most likes', 'first most liked author', 'url')
      cy.contains('first most likes first most liked author')
        .contains('show')
        .click()
      cy.get('#like-button').click().click().click()
      cy.contains('hide').click()

      cy.createBlog('third most likes', 'third most liked author', 'url')
      cy.contains('third most likes third most liked author')
        .contains('show')
        .click()
      cy.get('#like-button').click()
      cy.contains('hide').click()

      cy.get('.blog').eq(0).should('contain', 'first most likes first most liked author')
      cy.get('.blog').eq(1).should('contain', 'second most likes second most liked author')
      cy.get('.blog').eq(2).should('contain', 'third most likes third most liked author')

    })
  })

})

