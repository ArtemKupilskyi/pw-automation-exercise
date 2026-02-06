import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class CartPage extends BasePage {
    private readonly cartInfoContainer: Locator;
    private readonly productList: Locator;

    private readonly cartEmptyContainer: Locator;

    private readonly checkoutButton: Locator;

    constructor(page: Page) {
        super(page)

        this.cartInfoContainer = page.locator('#cart_info');
        this.productList = this.cartInfoContainer.locator('tbody > tr');

        this.cartEmptyContainer = page.locator('#empty_cart');

        this.checkoutButton = page.locator('#cart_items .check_out');
    }

    async verifyCartEmpty() {
        await expect(this.cartEmptyContainer).toBeVisible();
        await expect(this.cartEmptyContainer).toContainText('Cart is empty!');
    }

    async verifyCartIsNotEmpty(productAmount: number) {
        await expect(this.cartInfoContainer).toBeVisible();
        await expect(this.cartInfoContainer.locator('.cart_menu td')).toContainText(['Item', 'Description', 'Price', 'Quantity', 'Total']);
        await expect(this.productList).toHaveCount(productAmount);
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();
    }

    async getCartProductDetails(productNumber: number){
        const rows = this.productList;
        const selectedRow = rows.nth(productNumber - 1);
        const title = await selectedRow.locator('.cart_description h4').textContent();
        const price = await selectedRow.locator('.cart_price p').textContent();
        const quantity = await selectedRow.locator('.cart_quantity button').textContent();
        const products = [];
        products.push({ title, price, quantity });
        return products;
    }
}