import { cypressElementQuery } from './app.selector';

describe('App is loaded correctly', () => {
  beforeEach(() => {
    cy.visit('localhost:4200');
  });

  it('should have a header', () => {
    cy.get('h1').should('have.text', 'Mars robot game');
  });

  it('should have a button reset', () => {
    cypressElementQuery('btn-reset').should('exist');
  });

  it('should have a table component', () => {
    cypressElementQuery('table-component').should('exist');
  });

  it('should have a command component', () => {
    cypressElementQuery('command-component').should('exist');
  });
});
