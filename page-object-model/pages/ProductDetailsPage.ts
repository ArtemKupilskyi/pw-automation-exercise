import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class ProductDetailsPage extends BasePage {
    private readonly reviewSectionContainer: Locator;
    private readonly nameInput: Locator;
    private readonly emailInput: Locator;
    private readonly reviewInput: Locator;
    private readonly submitButton: Locator;
    private readonly successMessage: Locator;
    
    private readonly productsDetailsContainer: Locator;
    private readonly productTitle: Locator;
    private readonly productPrice: Locator;
    private readonly productQuantity: Locator;
    private readonly addToCartButton: Locator;

    private readonly confirmModal: Locator;
    private readonly continueShoppingButton: Locator;

    constructor(page: Page){
        super(page);

        this.reviewSectionContainer = page.locator('.shop-details-tab');
        this.nameInput = this.reviewSectionContainer.locator('#name');
        this.emailInput = this.reviewSectionContainer.locator('#email');
        this.reviewInput = this.reviewSectionContainer.locator('#review');
        this.submitButton = this.reviewSectionContainer.getByRole('button', { name: 'Submit'});
        this.successMessage = this.reviewSectionContainer.locator('.alert-success');

        this.productsDetailsContainer = page.locator('.product-details');
        this.productTitle = this.productsDetailsContainer.getByRole('heading');
        this.productPrice = this.productsDetailsContainer.locator('span span');
        this.productQuantity = this.productsDetailsContainer.locator('#quantity');
        this.addToCartButton = this.productsDetailsContainer.getByRole('button', { name: 'Add to cart' });

        this.confirmModal = page.locator('.modal-confirm');
        this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
    }

    async fillReview(name: string, email: string, review: string){
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.reviewInput.fill(review);
    }

    async submitReview(){
        await this.submitButton.click();
    }

    async verifySuccessMessage(){
        await expect(this.successMessage).toBeVisible();
        await expect(this.successMessage).toContainText('Thank you for your review.');
    }

    async addProductToCart() {
        await this.addToCartButton.click();
        await expect(this.confirmModal).toBeVisible();
        await expect(this.confirmModal).toContainText('Added!');
        await this.continueShoppingButton.click();
    }

    async getProductDetails(){
        const title = await this.productTitle.textContent();
        const price = await this.productPrice.textContent();
        const quantity = await this.productQuantity.inputValue();
        const products = [];
        products.push({title, price, quantity});
        return products;
    }

}