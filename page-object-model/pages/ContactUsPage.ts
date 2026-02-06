import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class ContactUsPage extends BasePage {
    private readonly nameInput: Locator;
    private readonly emailInput: Locator;
    private readonly subjectInput: Locator;
    private readonly messageInput: Locator;

    private readonly fileInput: Locator;

    private readonly submitButton: Locator;

    private readonly successMessage: Locator;

    constructor(page: Page) {
        super(page);

        this.nameInput = page.getByRole('textbox', { name: 'Name' });
        this.emailInput = page.getByRole('textbox', { name: 'Email', exact: true });
        this.subjectInput = page.getByRole('textbox', { name: 'Subject' });
        this.messageInput = page.locator('#message');

        this.fileInput = page.locator('[name="upload_file"]');

        this.submitButton = page.getByRole('button', { name: 'Submit' });

        this.successMessage = page.locator('.status.alert-success');
    }

    async fillForm(name: string, email: string, subject: string, message: string) {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.subjectInput.fill(subject);
        await this.messageInput.fill(message);
    }

    async uploadFile(path: string) {
        await this.fileInput.setInputFiles(path);
    }

    async submitForm() {
        this.page.on('dialog', dialog => {
            expect(dialog.message()).toEqual('Press OK to proceed!')
            dialog.accept()
        })
        await this.submitButton.click();
    }

    async verifySuccessMessage() {
        await expect(this.successMessage).toBeVisible();
        await expect(this.successMessage).toContainText('Success!');
    }
}