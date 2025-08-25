import { expect, Locator, Page } from '@playwright/test';
import * as basePage from 'pages/prebuy-frontend/BasePage';
import dotenv from 'dotenv';

dotenv.config();

export class GalleryProductsPage {
    readonly page: Page;
    readonly searhProductsSpacer: Locator;
    readonly productStyleNumber: Locator;
    readonly addToOrderBtn: Locator;
    readonly Card: Locator;



    constructor(page: Page) {
        this.page = page;
        this.searhProductsSpacer = page.locator('[data-test="search-input"]');
        this.productStyleNumber = page.locator('div[data-test= "style_number"] >> text=A396TEST777IGOR_NOIMAGE');
        this.addToOrderBtn = page.locator('[data-test="add-to-order"]');
        this.Card = page.locator('[data-test="header-cart"] .MuiButton-startIcon');
    }

    async typeIntoEmailInputField(email: string) {
        await this.searhProductsSpacer.fill(email);
    }

    async searchProduct(searchCriteria: string) {
        await this.searhProductsSpacer.fill(searchCriteria);
        await this.page.waitForTimeout(3000);
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(3000);
    }

    async clickOnProduct() {
        await this.productStyleNumber.click();
    }

    async clickAddToOrder() {
        await this.addToOrderBtn.click();
    }

    async clickOnCard() {
        await this.Card.click();
    }



}

