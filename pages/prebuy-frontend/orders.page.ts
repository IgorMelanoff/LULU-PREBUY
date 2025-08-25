import { expect, Locator, Page } from '@playwright/test';
import * as basePage from 'pages/prebuy-frontend/BasePage';
import dotenv from 'dotenv';

dotenv.config();

export class OrdersPage {
    readonly page: Page;


    constructor(page: Page) {
        this.page = page;

    }


    async verifyOrderInList(orderNumber: string) {
        await this.page.locator(`text="${orderNumber}"`).waitFor({ state: 'visible', timeout: 10000 });
    }




}

