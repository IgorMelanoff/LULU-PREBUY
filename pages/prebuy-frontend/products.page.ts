import { expect, Locator, Page } from '@playwright/test';
import * as basePage from 'pages/prebuy-frontend/BasePage';
import dotenv from 'dotenv';

dotenv.config();

export class ProductsPage {
    readonly page: Page;
    readonly addToOrderBtn: Locator;
    readonly sizeQty: Locator;
    readonly removeProductBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.sizeQty = page.locator('[data-test="size-input"]');
        this.addToOrderBtn = page.locator('[data-test="add-to-order"]');
        const iFrameLegacyApp = page.locator('#legacy-app').contentFrame();
        this.removeProductBtn = iFrameLegacyApp.locator('[class="remove_product"]').first();
    }


    async enterSizeQty(qty: string) {
        await this.sizeQty.isVisible();
        await this.sizeQty.click();
        await this.sizeQty.fill(qty);
        await this.sizeQty.press('Enter');
    }


    async clickAddToOrder() {
        await this.addToOrderBtn.click();
    }

    async clickRemoveProductBtn() {
        await this.removeProductBtn.click();
    }



}

