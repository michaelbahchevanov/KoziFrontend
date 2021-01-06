import { BasePageObject } from "./BasePageObject"

export class LogInPageObject extends BasePageObject {

    baseUrl = super.baseUrl + 'login'

    get logInButton() { return cy.get('button[type="submit"]') }

    get emailField() { return cy.get('input[name="email"]') }

    get passwordField() { return cy.get('input[name="password"]') }

}