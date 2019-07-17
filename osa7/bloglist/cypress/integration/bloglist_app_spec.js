describe('Bloglist ', function () {
    describe('Visiting when not logged in', function () {
        beforeEach(function () {
            cy.request('POST', 'http://localhost:3003/api/testing/reset')
            const user = {
                name: 'Pete the Wizard',
                username: 'Ptterz',
                password: 'monkeym3'
            }
            cy.request('POST', 'http://localhost:3003/api/users/', user)
            cy.visit('http://localhost:3000')
        })

        it('front page can be opened', function () {
            cy.contains('Log in to application')
        })

        it('Logging in works', function () {
            cy.get('[data-cy=usernameLogin]').type('Ptterz')
            cy.get('[data-cy=passwordLogin]').type('monkeym3')
            cy.get('[data-cy=loginButton]').click()
            cy.contains('Welcome to blogs')
        })
    })

    describe('When logged in', function () {
        beforeEach(function () {
            cy.visit('http://localhost:3000')
            cy.get('[data-cy=usernameLogin]').type('Ptterz')
            cy.get('[data-cy=passwordLogin]').type('monkeym3')
            cy.get('[data-cy=loginButton]').click()
        })

        it('logged in user is shown', function () {
            cy.contains('Pete the Wizard logged in')
        })

        it('logout works', function () {
            cy.get('[data-cy=logoutButton]').click()
            cy.contains('Log in to application')
        })

        it('BlogForm visible when wanted to', function () {
            cy.get('[data-cy=newBlogButton]').click()
            cy.get('[data-cy=newBlogButton]').should('not.visible')
        })

        it('BlogForm disappears when wanted to', function () {
            cy.get('[data-cy=newBlogButton]').click()
            cy.contains('Cancel').click()
            cy.contains('new blog')
        })

        it('Adding a new blog successfully', function () {
            cy.get('[data-cy=newBlogButton]').click()
            cy.get('[data-cy=titleInputField]').type('Test title')
            cy.get('[data-cy=authorInputField]').type('Test author')
            cy.get('[data-cy=urlInputField]').type('Test url')
            cy.get('[data-cy=createNewBlogButton]').click()
            cy.wait(6000)
            cy.contains('Test title')
            cy.contains('Test author')
        })

        it('Removing a blog successfully', function () {
            cy.contains('Test title').click()
            cy.get('[data-cy=blogRemovalButton]').click()
            cy.wait(6000)
            cy.contains('Test title').should('not.exist')
        })
    })
})