describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'testUser',
      password: 'testPassword'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('login').click()
    cy.contains('login to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()

      cy.get('input:first').type('testUser')
      cy.get('input:last').type('testPassword')
      cy.get('#login-button').click()
      cy.contains('testUser logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()

      cy.get('input:first').type('testUser')
      cy.get('input:last').type('testPassword')
      cy.get('#login-button').click()
      cy.should('not.contain','testUser logged in')
    })
  })
})

