import { expect, Locator, Page, BrowserContext } from '@playwright/test';
import * as basePage from 'pages/prebuy-frontend/BasePage';
import dotenv from 'dotenv';

dotenv.config();

export class CardPage {
    readonly page: Page;

    readonly orderTab: Locator;
    readonly companyDropDown: Locator;
    readonly selectCompany: Locator;
    readonly shippingAdddress: Locator;
    readonly shippingLocation: Locator;
    readonly saveBtn: Locator;
    readonly orderNumber: Locator;
    readonly nextBtn: Locator;
    readonly submitBtn: Locator;
    readonly productTab: Locator;


    constructor(page: Page) {
        this.page = page;

        const iFrameLegacyApp = page.locator('#legacy-app').contentFrame();
        this.orderTab = iFrameLegacyApp.locator('[data-test="tab-details"]');
        this.companyDropDown = iFrameLegacyApp.locator('[data-test="company-input"]');
        this.selectCompany = iFrameLegacyApp.getByText('CST50 Athletics');
        this.shippingAdddress = iFrameLegacyApp.locator('input[name="shipping_address"]');
        this.saveBtn = page.locator('[data-test="save-btn"]');
        this.shippingLocation = page.getByRole('row', { name: 'Old Kings Hwy' }).getByRole('checkbox');
        this.orderNumber = iFrameLegacyApp.locator('[data-test="all-group"] var');
        this.nextBtn = iFrameLegacyApp.locator('[data-method="findNextTab"]');
        this.submitBtn = iFrameLegacyApp.locator('[data-test="submitOrder"]');
        this.productTab = iFrameLegacyApp.locator('[data-test="tab-products"]', { hasText: 'Products' });
    }

    async clickOnOrderTab() {
        await this.orderTab.click();
    }

    async clickOnSelectCompany() {
        await this.companyDropDown.click();
    }

    async enterTheCompany() {
        await this.companyDropDown.fill('CST50 Athletics');
        //await this.companyDropDown.press('Enter');
    }

    async selectTheCompany() {
        await this.selectCompany.click();
    }

    async clickOnShippingAddress() {
        await this.shippingAdddress.click();
    }

    async choosShippingLocation() {
        await this.shippingLocation.check();
        await this.page.waitForTimeout(3000);
        await this.saveBtn.click();
    }

    async clickOnNexBtn() {
        await this.nextBtn.click();
    }

    async extractOrderNumber() {
        const orderNumberText = await this.orderNumber.textContent();
        await this.page.waitForTimeout(3000);
        return orderNumberText;
    }

    async clickOnSubmitBtn() {
        await this.submitBtn.click();
    }

    async clickOnProductTab() {
        await this.productTab.click();
    }




}
