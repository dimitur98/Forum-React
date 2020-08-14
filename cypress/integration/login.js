describe('Login page cypress tests',()=>{
    it('should login and redirecto to home', ()=>{
        cy.visit('https://localhost:3000/Login')
        cy.get('#email').type('admin@admin.bg')
        cy.get('#password').type('123456')
        cy.get('#button').click()
        console.log(cy.url())
        cy.url().should('eq','https://localhost:3000/')
    })
    it('should show email is required tag', ()=>{
        cy.visit('https://localhost:3000/Login')
        cy.get('#password').type('123456')
        cy.get('#button').click()
        cy.get('#span').should('have.text', 'Email is required!')
    })
    it('should show password is required tag', ()=>{
        cy.visit('https://localhost:3000/Login')
        cy.get('#email').type('admin@admin.bg')
        cy.get('#button').click()
        cy.get('#span').should('have.text', 'Password is required!')
    })
    it('should show invalid user', ()=>{
        cy.visit('https://localhost:3000/Login')
        cy.get('#email').type('not registered')
        cy.get('#password').type('user')
        cy.get('#button').click()
        cy.get('#dangerTextBox').should('have.text', 'Invalid email or password!')
    })
    it('should show not confirmed email', ()=>{
        cy.visit('https://localhost:3000/Login')
        cy.get('#email').type('first@abv.bg')
        cy.get('#password').type('123456')
        cy.get('#button').click()
        cy.get('#textBox').should('have.text', 'Please confirm your email!')
    })
})