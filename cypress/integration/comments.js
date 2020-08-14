describe("PostComments page tests", ()=>{
    it("click up and down vote",() => {
        cy.visit('https://localhost:3000/Login')
        cy.get('#email').type('admin@admin.bg')
        cy.get('#password').type('123456')
        cy.get('#button').click()
        cy.get('[data-test-id="category-2"]').click()
        cy.get('[data-test-id="post-1"]').click()
        cy.get('[data-test-id="upVote"]').click()
        cy.get('[data-test-id="upVote"]').click()
        var votes = ''
         cy.get('#votesCount').should(v => {
            votes = v.text()
            console.log('upvotes',votes)
        })
        cy.get('[data-test-id="downVote"]').click()
        cy.get('[data-test-id="downVote"]').click()
         cy.get('#votesCount').should(v => {
            expect(votes).not.to.eq(v.text())    
        })
    })
    it("show comment input box",() => {
        cy.visit('https://localhost:3000/Login')
        cy.get('#email').type('admin@admin.bg')
        cy.get('#password').type('123456')
        cy.get('#button').click()
        cy.get('[data-test-id="category-2"]').click()
        cy.get('[data-test-id="post-1"]').click()
        cy.get('[data-test-id="commentBtn"]').click()
        expect(cy.get('[data-test-id="tinyMceInput"]'))
    })
})
