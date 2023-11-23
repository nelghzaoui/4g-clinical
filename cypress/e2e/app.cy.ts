/**
 * This file contains end-to-end tests for the App component.
 * The tests ensure that the App is loaded correctly and that its child components exist.
 */
import { select } from './app.selector';

describe('App is loaded correctly', () => {
  beforeEach(() => {
    cy.visit('localhost:4200');
  });

  it('should have a header', () => {
    cy.get('h1').should('have.text', 'Mars robot game');
  });

  it('should have a button reset', () => {
    select('btn-reset').should('exist');
  });

  it('should have a table component', () => {
    select('table-component').should('exist');
  });

  it('should have a command component', () => {
    select('command-component').should('exist');
  });
});
