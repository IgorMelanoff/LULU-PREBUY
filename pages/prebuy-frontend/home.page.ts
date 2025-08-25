import { expect, Locator, Page, BrowserContext } from '@playwright/test';
import * as basePage from 'pages/prebuy-frontend/BasePage';
//import * as constant from 'utilities/PREBUYConstants';
//import pdf from 'pdf-parse';
import dotenv from 'dotenv';

dotenv.config();

export class HomePage {
    readonly page: Page;
    readonly quickProductLinkLable: Locator;
    readonly sideMenuProductIcon: Locator;
    readonly cardCount: Locator;
    readonly sideMenuOrdersIcon: Locator;

    constructor(page: Page) {
        this.page = page;
        this.quickProductLinkLable = page.locator('[id="id76jt"]');
        this.sideMenuProductIcon = page.locator('[data-test="gallery"]');
        this.cardCount = page.locator('[data-test="cart-item-count"]');
        this.sideMenuOrdersIcon = page.locator('[data-test="orders"]');
    }

    async verifyProductLinkVisibility() {
        await expect(this.quickProductLinkLable).toBeVisible();
    }

    async clickOnProductSidePanelMenu() {
        await this.sideMenuProductIcon.click({ force: true });
    }

    async isTheCardCountVisible() {
        return await this.cardCount.isVisible();
    }

    async clickCardCount() {
        return await this.cardCount.click();
    }

    async clickOnOrdersSidePanelMenu() {
        await this.sideMenuOrdersIcon.click({ force: true });
    }

}
