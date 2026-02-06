import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export enum MenuOption {
    HOME = 'Home',
    PRODUCTS = 'Products',
    CART = 'Cart',
    SIGNUP_LOGIN = 'Signup / Login',
    CONTACT_US = 'Contact us',
    LOGOUT = 'Logout',
    DELETE_ACCOUNT = 'Delete Account'
}

export class HeaderPage extends BasePage {
    private readonly headerContainer: Locator;
    private readonly loggedUserLink: Locator;
    private readonly accountDeletedMessage: Locator;

    constructor(page: Page) {
        super(page)

        this.headerContainer = page.locator('#header');

        this.loggedUserLink = page.locator('.navbar-nav li').last();

        this.accountDeletedMessage = page.locator('[data-qa="account-deleted"]');
    }

    async goToSelectedOption(option: MenuOption) {
        await this.headerContainer.locator('li a').filter({ hasText: option }).click();
        await this.page.waitForLoadState();
    }

    async verifyUserSignedIn(username: string) {
        await expect(this.loggedUserLink).toHaveText(` Logged in as ${username}`);
    }

    async deleteAccount() {
        await this.headerContainer.locator('li a').filter({ hasText: 'Delete Account' }).click();
        await expect(this.accountDeletedMessage).toBeVisible();
        await expect(this.accountDeletedMessage).toContainText('Account Deleted!');
    }
}