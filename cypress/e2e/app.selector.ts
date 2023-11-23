export const cypressElementQuery = (name: string) => cy.get(`[data-cy=${name}]`);
export const goToHomePage = () => cy.visit('localhost:4200');
