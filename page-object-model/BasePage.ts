import { Locator, Page } from "@playwright/test";

export class BasePage {
    readonly page: Page
    private readonly closeCookiesButton: Locator

    constructor(page: Page) {
        this.page = page;
        this.closeCookiesButton = page.getByRole('button', { name: 'Consent' });
    }

    async closeCookies() {
        if (await this.closeCookiesButton.isVisible()) {
            await this.closeCookiesButton.click()
        }
    }
}