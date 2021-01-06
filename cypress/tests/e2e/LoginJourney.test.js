/// <reference types="cypress" />

import { DashboardPageObject } from "../page-objects/DashboardPageObject"
import { LogInPageObject } from "../page-objects/LogInPageObject"



describe('A journey to log in and out', () => {
    it('allows the user to log in and out', async () => {
        let { email, password } = await cy.fixture('main.json')

        // Dashboard
        let dashboard = new DashboardPageObject()
        dashboard.visit()
        dashboard.logInButton.click()

        // Log in page
        let login = new LogInPageObject()

        login.emailField.type(email)
        login.passwordField.type(password)
        login.logInButton.click()

        // Dashboard
        dashboard.elementByText(email).click()
        dashboard.logoutButtonIfVissible.click()
        dashboard.elementByText(email).should('not.exist')
    })
})