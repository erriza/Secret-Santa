describe('Families', function() {
  beforeEach(function() {
    cy.visit('http://localhost:5173')
  })
  it('front page can be opened', function() {
    cy.contains('Secret Santa')
  })
  it('contains families', function() {
    cy.contains('Family members:')
  })

  it('new family can be added', function() {
    cy.get('#familyName').type('The Ricos')
    cy.get('#memberName').type('Erick Rico')
    cy.get('#addFamily-button').click()

    cy.contains('Erick Rico')
  })
})