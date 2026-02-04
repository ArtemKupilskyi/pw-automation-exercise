import { expect, Locator, Page, request } from "@playwright/test";
import { BasePage } from "../BasePage";
import { UserData } from "../../types/user";

export class SignupPage extends BasePage {
    private readonly nameInput: Locator;
    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    private readonly dayOptions: Locator;
    private readonly monthOptions: Locator;
    private readonly yearOptions: Locator;

    private readonly firstNameInput: Locator;
    private readonly addressInput: Locator;
    private readonly lastNameInput: Locator;

    private readonly countryOptions: Locator;

    private readonly stateInput: Locator;
    private readonly cityInput: Locator;
    private readonly zipcodeInput: Locator;
    private readonly mobileNumberInput: Locator;

    private readonly createAccountButton: Locator;
    private readonly accountCreatedMessage: Locator;
    private readonly continueButton: Locator;

    constructor(page: Page) {
        super(page);

        this.nameInput = page.getByRole('textbox', { name: 'Name', exact: true });
        this.emailInput = page.getByRole('textbox', { name: 'Email' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.dayOptions = page.locator('select#days');
        this.monthOptions = page.locator('select#months');
        this.yearOptions = page.locator('select#years');

        this.firstNameInput = page.getByRole('textbox', { name: 'First name' });
        this.lastNameInput = page.getByRole('textbox', { name: 'Last name' });
        this.addressInput = page.getByRole('textbox', { name: 'Address * (Street address, P.' });

        this.countryOptions = page.locator('select#country');

        this.stateInput = page.getByRole('textbox', { name: 'State' });
        this.cityInput = page.locator('#city');
        this.zipcodeInput = page.locator('#zipcode');
        this.mobileNumberInput = page.getByRole('textbox', { name: 'Mobile Number' });

        this.createAccountButton = page.getByRole('button', { name: 'Create Account' });

        this.accountCreatedMessage = page.locator('[data-qa="account-created"]');

        this.continueButton = page.getByRole('link', { name: 'Continue' });

    }

    async fillAccountInformation(userdata: UserData) {
        await this.page.getByLabel(userdata.title, { exact: true }).check();

        await this.passwordInput.fill(userdata.password);
        await this.dayOptions.selectOption(userdata.day);
        await this.monthOptions.selectOption(userdata.month);
        await this.yearOptions.selectOption(userdata.year);

        await this.firstNameInput.fill(userdata.firstName);
        await this.lastNameInput.fill(userdata.lastName);
        await this.addressInput.fill(userdata.address);

        await this.countryOptions.selectOption(userdata.country);

        await this.stateInput.fill(userdata.state);
        await this.cityInput.fill(userdata.city);
        await this.zipcodeInput.fill(userdata.zipcode);
        await this.mobileNumberInput.fill(userdata.mobileNumber);

        await this.createAccountButton.click();

        await expect(this.accountCreatedMessage).toBeVisible();
        await expect(this.accountCreatedMessage).toContainText('Account Created!');

        await this.continueButton.click();
    }
}