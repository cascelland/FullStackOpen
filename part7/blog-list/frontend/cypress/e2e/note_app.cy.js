describe('Note app', function () {
    beforeEach(function () {
        cy.login({ username: 'testUser', password: 'testPassword' })
    })

    /*   it('front page can be opened', function() {
    cy.contains('Notes')
    cy.contains('Browser can execute only JavaScript')
  }) */

    it('log in form can be opened', function () {
        cy.contains('log in').click()
    })

    it('login fails with wrong password', function () {
        cy.contains('log in').click()
        cy.get('#username').type('testUser')
        cy.get('#password').type('wrong')
        cy.get('#login-button').click()

        cy.get('.error')
            .should('contain', 'wrong credentials')
            .and('have.css', 'color', 'rgb(255, 0, 0)')
            .and('have.css', 'border-style', 'solid')
    })

    it('user can login', function () {
        cy.contains('log in').click()
        cy.get('#username').type('testUser')
        cy.get('#password').type('testPassword')
        cy.get('#login-button').click()

        cy.contains('testName logged in')
    })
})

describe('when logged in', function () {
    beforeEach(function () {
        cy.visit('http://localhost:5173')
        cy.contains('log in').click()
        cy.get('#username').type('testUser')
        cy.get('#password').type('testPassword')
        cy.get('#login-button').click()
    })

    it('a new note can be added', function () {
        cy.contains('new note').click()
        cy.get('input').type('A new note by cypress ciao amio')
        cy.contains('save').click()
        cy.contains('A new note by cypress ciao amio')
    })

    describe('and a note exists', function () {
        beforeEach(function () {
            cy.get('#togglable').click()
            cy.get('input').type('another note cypress')
            cy.contains('save').click()
        })

        it('it can be made not important', function () {
            cy.contains('another note cypress')
                .contains('make not important')
                .click()

            cy.contains('another note cypress').contains('make important')
        })
    })
})
