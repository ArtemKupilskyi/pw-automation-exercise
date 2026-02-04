import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class HomePage extends BasePage {
    private readonly sliderSection: Locator;


    constructor(page: Page) {
        super(page);

        this.sliderSection = page.locator('#slider')
    }

    async checkHomePageSection() {
        await expect(this.sliderSection).toBeVisible();
    }
}