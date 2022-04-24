import * as cypress from 'cypress';
import { USER_NAME, USER_PASSWORD } from './constants';

describe('userEdit', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit('/');
    cy.get('[data-cy=login-avatar-button]').click();
    cy.get('[data-cy=login]').type(USER_NAME);
    cy.get('[data-cy=password]').type(USER_PASSWORD);
    cy.get('[data-cy=login-modal-button]').click();
    cy.request('POST', 'http://localhost:3000/api/user/login', {
      login: USER_NAME,
      password: USER_PASSWORD,
    }).then((response) => {
      expect(response.status).to.eq(201);
    });
    cy.visit('/user');
  });
  afterEach(() => {
    cy.get('[data-cy=user-edit-button]').click();
  });
  it('should change email', () => {});
});
