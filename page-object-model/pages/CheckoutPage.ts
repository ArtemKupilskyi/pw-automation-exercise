import { Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class CheckoutPage extends BasePage {
    private readonly orderMessageInput: Locator;
    private readonly placeOrderButton: Locator;

    constructor(page: Page) {
        super(page);

        this.orderMessageInput = page.locator('#ordermsg').getByRole('textbox');

        this.placeOrderButton = page.getByRole('link', { name: 'Place Order' });
    }

    async fillCommentForOrder(comment: string) {
        await this.orderMessageInput.fill(comment)
    }

    async placeOrder() {
        await this.placeOrderButton.click();
    }
}