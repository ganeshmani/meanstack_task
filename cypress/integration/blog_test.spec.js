describe('Loading the homepage', function() {
    it('successfully loads', function() {
      cy.visit('https://gentle-tor-26434.herokuapp.com/') // change URL to match your dev URL
    })
  })


describe('adding blog post',function(){
    it('creating a new blog post', function(){
        cy.visit('https://gentle-tor-26434.herokuapp.com/');
        
        cy.get('input')
            .type('Cypress added blog post')

        cy.get('textarea')
            .type('Hey it is a automated testing blog post.please check it out the cypress.io...it\' so cool');
            
        cy.get('div.submit')
            .click()
        
        cy.get('div.item').last().should('contain','Cypress added blog post')    
    })
})