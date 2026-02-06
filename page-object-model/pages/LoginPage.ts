import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class LoginPage extends BasePage {

    private readonly loginFormContainer: Locator;
    private readonly emailLoginInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;

    private readonly signUpFormContainer: Locator;
    private readonly nameInput: Locator;
    private readonly emailSignupInput: Locator;
    private readonly signupButton: Locator;

    private readonly errorMessage: Locator;

    constructor(page: Page) {
        super(page);

        this.loginFormContainer = page.locator('.login-form');
        this.emailLoginInput = this.loginFormContainer.getByRole('textbox', { name: 'Email Address' });
        this.passwordInput = this.loginFormContainer.getByRole('textbox', { name: 'Password' });
        this.loginButton = this.loginFormContainer.getByRole('button', { name: 'Login' });

        this.signUpFormContainer = page.locator('.signup-form');
        this.nameInput = this.signUpFormContainer.getByRole('textbox', { name: 'Name' });
        this.emailSignupInput = this.signUpFormContainer.getByRole('textbox', { name: 'Email Address' });
        this.signupButton = this.signUpFormContainer.getByRole('button', { name: 'Signup' });

        this.errorMessage = page.locator('[action="/login"] p');
    }

    async login(email: string, password: string) {
        await this.emailLoginInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async signup(name: string, email: string) {
        await this.nameInput.fill(name);
        await this.emailSignupInput.fill(email);
        await this.signupButton.click();
    }

    async verifyError() {
        await expect(this.errorMessage).toBeVisible();
        await expect(this.errorMessage).toHaveText('Your email or password is incorrect!');
    }

}