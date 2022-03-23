import * as cypress from 'cypress';

describe('Login', () => {
  beforeEach(() => {
    cy.viewport(1920, 1000);
  });
  it('should throw error with empty data', () => {
    // cy.get('[data-cy=burger-button]').click();
    cy.visit('/');
    cy.get('[data-cy=login-avatar-button]').click();
    cy.get('[data-cy=login-modal-button]').click();
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/api/user/login',
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });
});
