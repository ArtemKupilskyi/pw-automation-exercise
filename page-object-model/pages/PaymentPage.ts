import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class PaymentPage extends BasePage {
    private readonly paymentContainer: Locator;
    private readonly nameOnCardInput: Locator;
    private readonly cardNumberInput: Locator;
    private readonly cvcInput: Locator;
    private readonly expirationMonthInput: Locator;
    private readonly expirationYearInput: Locator;
    private readonly payButton: Locator;

    private readonly orderPlacedMessage: Locator;

    constructor(page: Page) {
        super(page)

        this.paymentContainer = page.locator('#payment-form');
        this.nameOnCardInput = this.paymentContainer.locator('[data-qa="name-on-card"]');
        this.cardNumberInput = this.paymentContainer.locator('[data-qa="card-number"]');
        this.cvcInput = this.paymentContainer.locator('[data-qa="cvc"]');
        this.expirationMonthInput = this.paymentContainer.locator('[data-qa="expiry-month"]');
        this.expirationYearInput = this.paymentContainer.locator('[data-qa="expiry-year"]');
        this.payButton = this.paymentContainer.locator('[data-qa="pay-button"]');

        this.orderPlacedMessage = page.locator('[data-qa="order-placed"]')
    }

    async fillCardDetails() {
        await this.nameOnCardInput.fill('test card name');
        await this.cardNumberInput.fill('989302480');
        await this.cvcInput.fill('567');
        await this.expirationMonthInput.fill('10');
        await this.expirationYearInput.fill('2028');
    }

    async confirmAndPay() {
        await this.payButton.click();
        await this.page.waitForURL(/payment_done/);
    }

    async verifyOrderPlaced() {
        await expect(this.page).toHaveURL(/payment_done/);
        await expect(this.orderPlacedMessage).toBeVisible();
        await expect(this.orderPlacedMessage).toContainText('Order Placed!');
    }
}