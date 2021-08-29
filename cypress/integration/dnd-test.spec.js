describe('dnd test', function () {
  before(function () {
    cy.visit('http://localhost:3000');
  });
  const dragAndDrop = (index) => {
    cy.get('[data-test="ingredient"]').eq(index).trigger('dragstart');
    cy.get('[data-test="dropTarget"]').trigger('drop');
  };
  it('dnd add bun', function () {
    dragAndDrop(0);
    cy.get('[data-test="container-bun-up"]')
      .children()
      .should('have.length', 1);
    cy.get('[data-test="container-bun-down"]')
      .children()
      .should('have.length', 1);
    cy.get('[data-test="container"]').should('not.exist');
  });
  it('dnd change bun', function () {
    dragAndDrop(1);
    cy.get('[data-test="container-bun-up"]')
      .children()
      .should('have.length', 1);
    cy.get('[data-test="container-bun-down"]')
      .children()
      .should('have.length', 1);
    cy.get('[data-test="container"]').should('not.exist');
  });
  it('dnd add other ingredients', function () {
    dragAndDrop(3);
    cy.get('[data-test="container-bun-up"]')
      .children()
      .should('have.length', 1);
    cy.get('[data-test="container-bun-down"]')
      .children()
      .should('have.length', 1);
    cy.get('[data-test="container"]').children().should('have.length', 1);
    dragAndDrop(4);
    dragAndDrop(3);
    cy.get('[data-test="container-bun-up"]')
      .children()
      .should('have.length', 1);
    cy.get('[data-test="container-bun-down"]')
      .children()
      .should('have.length', 1);
    cy.get('[data-test="container"]').children().should('have.length', 3);
  });
});
