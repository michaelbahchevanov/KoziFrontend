import { BasePageObject } from "./BasePageObject"

export class DashboardPageObject extends BasePageObject {

    get logInButton() { return cy.contains(/login/i) }

    get logoutButtonIfVissible() { return cy.get('.navbar').contains(/log out/i) }

}