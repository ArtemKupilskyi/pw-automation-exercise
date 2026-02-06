import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class HomePage extends BasePage {
    private readonly sliderSection: Locator;
    
    private readonly sliderCarouselContainer: Locator;
    private readonly nextButton: Locator;
    private readonly dotButtons: Locator;
    private readonly content: Locator;


    constructor(page: Page) {
        super(page);

        this.sliderSection = page.locator('#slider');
        
        this.sliderCarouselContainer = page.locator('#slider-carousel');
        this.nextButton = this.sliderCarouselContainer.locator('[data-slide="next"]');
        this.dotButtons = this.sliderCarouselContainer.locator('li');
        this.content = this.sliderCarouselContainer.locator('.carousel-inner > div')
    }

    async checkHomePageSection() {
        await expect(this.sliderSection).toBeVisible();
    }

    async selectCarouselDot(dotNumber: number){
        const selectedDot = this.dotButtons.nth(dotNumber - 1);
        await selectedDot.click();
        await expect(selectedDot).toHaveClass(/active/);
    }

    async selectCarouselNext(){
        await this.nextButton.click();
    }

    async correctCarouselContentVisible(contentNumber: number){
        await expect(this.content.nth(contentNumber - 1)).toHaveClass(/active/);
    }

}