describe('Navigation', () => {
    it('should show the title', () => {
        cy.visit('http://localhost:3000')
        cy.get('h1').contains('Bookstore')
        cy.get('h3').contains('a store that cannot buy book')
    })
})

describe('CRUD', () => {
    it('should able to create book', () => {
        cy.visit('http://localhost:3000')
        cy.get('#CreateButton').click()
        cy.get('#CreateName').type('Edward')
        cy.get('#CreatePrice').type('22')
        cy.get('.ant-select-selection-search').first().type('222')
        cy.get('.ant-select-item').first().trigger('click')
        cy.wait(100)
        cy.get('#CreateSubmit').trigger('click').click()
        cy.get('.ant-table-cell').contains('Edward')
    })
    it('should update', () => {
        cy.visit('http://localhost:3000')
        cy.get('#CreateButton').click()
        cy.get('#CreateName').type('Edward')
        cy.get('#CreatePrice').type('22')
        cy.get('.ant-select-selection-search').first().type('222')
        cy.get('.ant-select-item').first().trigger('click')
        cy.wait(100)
        cy.get('#CreateSubmit').trigger('click').click()

        cy.get('[data-cy=tableRow]').first().click()
        cy.get('#UpdateName').type('Kiki')
        cy.wait(100)
        cy.get('#UpdateSubmit').trigger('click').click()
        cy.get('.ant-table-cell').contains('Kiki')
        cy.get('.ant-table-cell').contains('22')
    })
    it('should delete', () => {
        cy.visit('http://localhost:3000')
        cy.get('#CreateButton').click()
        cy.get('#CreateName').type('Edward')
        cy.get('#CreatePrice').type('22')
        cy.get('.ant-select-selection-search').first().type('222')
        cy.get('.ant-select-item').first().trigger('click')
        cy.wait(100)
        cy.get('#CreateSubmit').trigger('click').click()

        cy.get('[data-cy=DeleteButton]').first().click()
        cy.get('.ant-table-cell').should('have.length', 6)
    })
})
