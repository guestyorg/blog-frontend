// describe('My First Test', () => {
//     it('Does not do much!', () => {
//       expect(true).to.equal(false)
//     })
//   })



// describe('My First Test', () => {
//     it('finds the content "type"', () => {
//       cy.visit('https://example.cypress.io')
//     cy.pause();
//     cy.contains('type').click()
//     // Should be on a new URL which includes '/commands/actions'
//     cy.url().should('include', '/commands/actions')

//   // Get an input, type into it and verify that the value has been updated
//   cy.get('.action-email')
//   .type('fake@email.com')
//   .should('have.value', 'fake@email.com')


//     })
//   })

describe('The Home Page', () => {
    it('successfully loads', () => {
      cy.visit('http://localhost:3000') // change URL to match your dev URL
    })
  })



// describe('The Home Page', () => {
//   it('successfully loads', () => {
//     cy.visit('/')
//   })
// })





