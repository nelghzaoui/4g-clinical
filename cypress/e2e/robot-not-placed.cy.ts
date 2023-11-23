import { cypressElementQuery, goToHomePage } from './app.selector';

describe('Robot not placed', () => {
  beforeEach(() => {
    goToHomePage();
  });

  it('should not be able to move', () => {
    cypressElementQuery('command').should('have.text', 'Robot not placed');
  });

  xit('should not be able to turn left', () => {
    cy.visit('/');
    cypressElementQuery('left').click();
    cypressElementQuery('report').should('have.text', 'Robot not placed');
  });

  xit('should not be able to turn right', () => {
    cy.visit('/');
    cypressElementQuery('right').click();
    cypressElementQuery('report').should('have.text', 'Robot not placed');
  });
});
