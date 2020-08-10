describe("Register page tests", ()=>{
    it("can't register if no image upload",() => {
        cy.visit('https://localhost:3000/Register')
        cy.get('#email').type('admin@admin.bg')
        cy.get('#password').type('123456')
        cy.get('#rePassword').type('123456')
        cy.get('#button').should('not.exist') 
    })
    it("warning text for not matching password should disapear if passwords match", ()=>{
        cy.visit('https://localhost:3000/Register')
        cy.get('#password').type('123456')
        cy.get('#rePassword').type('123456')
        cy.get('#email').type('admin@admin.bg')
        cy.get("[data-test-id='warningText']").should('not.exist') 
    })
})