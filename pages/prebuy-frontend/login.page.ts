import { expect, Locator, Page } from '@playwright/test';
import * as basePage from 'pages/prebuy-frontend/BasePage';
import dotenv from 'dotenv';

dotenv.config();

export class LoginPage {
    readonly page: Page;
    readonly userEmailInput: Locator;
    readonly userPasswordInput: Locator;
    readonly logInBtn: Locator;
    readonly nextBtn: Locator;
    readonly windowsUserEmailInput: Locator;
    readonly windowsPasswordInput: Locator;
    readonly signInBtn: Locator;

    /////////

    readonly welcomeHeaderText: Locator;
    readonly emailLableText: Locator;
    readonly emailHintText: Locator;
    readonly forgotPasswordLinkBtn: Locator;
    readonly errorNotification: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userEmailInput = page.locator('[data-test="login-email"]');
        this.userPasswordInput = page.locator('[data-test="login-password"]');
        this.logInBtn = page.locator('[data-test="login-submit"]');
        this.windowsUserEmailInput = page.locator('[data-report-value="Email_Phone_Skype_Entry"]');
        this.nextBtn = page.locator('[data-report-value="Submit"]');
        this.windowsPasswordInput = page.locator('[placeholder="Password"]');
        this.signInBtn = page.locator('[data-report-event="Signin_Submit"]');
    }

    async goto() {
        await this.page.goto(process.env.B2B_URL);
    }

    async typeIntoEmailInputField(email: string) {
        await this.userEmailInput.fill(email);
    }

    async typeIntoPasswordInputField(PWD: string) {
        await this.userPasswordInput.fill(PWD);
    }

    async clickOnLogInBtn() {
        await this.logInBtn.click({ force: true });
    }

    async typeIntoWindowsEmailInputField(lulu_windows_EMAIL: string) {
        await this.windowsUserEmailInput.waitFor({ state: 'visible', timeout: 10000 });
        await this.windowsUserEmailInput.fill(lulu_windows_EMAIL);
    }

    async clickOnNextBtn() {
        await this.nextBtn.click({ force: true });
    }

    async typeIntoWindowsPasswordInputField(lulu_windows_PWD: string) {
        await this.windowsPasswordInput.waitFor({ state: 'visible', timeout: 10000 });
        await this.windowsPasswordInput.fill(lulu_windows_PWD);
    }

    async clickOnSignInBtn() {
        await this.signInBtn.click({ force: true });
    }

}

