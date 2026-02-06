import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class ProductsPage extends BasePage {
    private readonly searchInput: Locator;
    private readonly searchButton: Locator;

    private readonly productCards: Locator;
    private readonly productTitle: Locator;
    private readonly productAddButton: Locator;
    private readonly productViewButton: Locator;

    private readonly confirmModal: Locator;
    private readonly continueShoppingButton: Locator;

    constructor(page: Page) {
        super(page)

        this.searchInput = page.locator('#search_product');
        this.searchButton = page.locator('#submit_search');

        this.productCards = page.locator('.features_items .product-image-wrapper');
        this.productTitle = this.productCards.locator('.productinfo p');
        this.productAddButton = this.productCards.locator('.add-to-cart');
        this.productViewButton = this.productCards.locator('.nav-justified');

        this.confirmModal = page.locator('.modal-confirm');
        this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
    }


    async searchProduct(productName: string) {
        await this.searchInput.fill(productName);
        await this.searchButton.click();
    }

    async verifyProductTitle(productTitle: string) {
        const productTitles = await this.productTitle.allTextContents();

        for (const title of productTitles) {
            expect(title).toContain(productTitle);
        }
    }

    async addProductToCart(productNumber: number) {
        await this.productAddButton.nth(productNumber - 1).hover();
        await this.page.waitForTimeout(1000);
        await this.productAddButton.nth(productNumber - 1).click();
        await expect(this.confirmModal).toBeVisible();
        await expect(this.confirmModal).toContainText('Added!');
        await this.continueShoppingButton.click();
    }

    async goToProductDetails(productNumber: number) {
        await this.productViewButton.nth(productNumber - 1).click();
    }
}