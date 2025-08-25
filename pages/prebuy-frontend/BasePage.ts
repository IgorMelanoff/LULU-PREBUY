import { expect, Page, Locator, BrowserContext } from '@playwright/test';
import { LoginPage } from './login.page';

export async function navigateTo(page: Page, url: string) {
    //Adding this header to make nuOrder scenario works in Chrome
    await page.route('**/*', (route, request) => {
        const headers = {
            ...request.headers(),
            'x-lll-access-token': process.env.X_ACCESS_TOKEN
        };
        route.continue({ headers });
    });
    await page.goto(url);
}


//Function to perform login action
export async function logIn(homePage: LoginPage, username: string, pass: string) {
    await homePage.typeIntoEmailInputField(username);
    await homePage.page.waitForTimeout(1000)
    await homePage.typeIntoPasswordInputField(pass);
    await homePage.page.waitForTimeout(1000)
    await homePage.clickOnLogInBtn();
    await homePage.page.waitForTimeout(1000);
    //await homePage.typeIntoWindowsEmailInputField(lulu_windows_EMAIL);
    //await homePage.page.waitForTimeout(1000)
    //await homePage.clickOnNextBtn();
    //await homePage.page.waitForTimeout(1000)
    //await homePage.typeIntoWindowsPasswordInputField(lulu_windows_PWD);
    //await homePage.page.waitForTimeout(1000)
    //await homePage.clickOnSignInBtn();
}

export async function navigateAndLogIn(
    page: Page,
    loginPage: LoginPage,
    url: string,
    username: string,
    password: string,
    //lulu_windows_EMAIL: string,
    //lulu_windows_PWD: string,
    loadState: 'load' | 'domcontentloaded' | 'networkidle' = 'domcontentloaded',
    waitForBody: boolean = true,

) {
    //Adding this header to make nuOrder scenario works in Chrome
    await page.route('**/*', (route, request) => {
        const headers = {
            ...request.headers(),
            'x-lll-access-token': process.env.X_ACCESS_TOKEN
        };
        route.continue({ headers });
    });
    await page.waitForTimeout(1000);
    //await page.goto(url, { waitUntil: 'networkidle' });
    await page.goto(url);
    //await page.waitForTimeout(2000);
    //await page.waitForLoadState(loadState);
    //if (waitForBody) {
    //    await page.waitForSelector('body', { state: 'visible' });
    //}
    await loginPage.page.waitForTimeout(1000)
    await loginPage.typeIntoEmailInputField(username);
    await loginPage.page.waitForTimeout(2000)
    await loginPage.typeIntoPasswordInputField(password);
    await loginPage.page.waitForTimeout(2000)
    await loginPage.clickOnLogInBtn();
    await loginPage.page.waitForTimeout(2000);
    //await loginPage.typeIntoWindowsEmailInputField(lulu_windows_EMAIL);
    //await loginPage.page.waitForTimeout(1000);
    //await loginPage.clickOnNextBtn();
    //await loginPage.page.waitForTimeout(1000);
    //await loginPage.typeIntoWindowsPasswordInputField(lulu_windows_PWD);
    //await loginPage.page.waitForTimeout(1000);
    //await loginPage.clickOnSignInBtn();
}

////////////////////////

// Function to check the current page title
export async function checkPageTitle(page: Page, expectedTitle: string) {
    const pageTitle = await page.title();
    expect(pageTitle).toContain(expectedTitle);
}

// Function to check the current page URL
export async function checkCurrentURL(page: Page, expectedURL: string) {
    const currentURL = await page.url();
    expect(currentURL).toContain(expectedURL);
}

// Function to check button visibility, enabled state, and text
export async function checkElementState(element: Locator, expectedText?: string) {
    // Wait for the element to be attached and visible
    await element.waitFor({ state: 'visible' });
    // Check if the button is visible
    await expect(element).toBeVisible();
    // If expected text is provided, verify button text
    if (expectedText) {
        await expect(element).toContainText(expectedText);
    }
}

// Function to handle new tab and perform actions on it
export async function handleUrlOfNewTab(page: Page, context: BrowserContext, expectedUrl: string, clickLocator: Locator) {
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        clickLocator.click()
    ]);
    await newPage.waitForLoadState();
    await page.waitForTimeout(8000);
    const newPageUrl = newPage.url();
    // console.log('Print the New Tab URL: ' + newPageUrl);
    const newPageTitle = await newPage.title();
    // console.log('Print the New Tab Title: ' + newPageTitle);
    expect(newPageUrl).toContain(expectedUrl);
    return newPage;
}

export async function waitForPageLoad(page: Page, state: 'load' | 'domcontentloaded' | 'networkidle' = 'domcontentloaded', waitForBody: boolean = true) {
    await page.waitForLoadState(state); // Waits for the specified load state

    if (waitForBody) {
        await page.waitForSelector('body', { state: 'visible' }); // Ensures page content is visible
    }
}

export async function validateRequiredField(locator: Locator, expectedMessage: string | RegExp) {
    await locator.waitFor({ state: 'visible' });
    await locator.page().waitForTimeout(300);

    const isValid = await locator.evaluate((el: HTMLInputElement) => el.checkValidity());
    expect(isValid).toBe(false);

    const validationMessage = await locator.evaluate((el: HTMLInputElement) => el.validationMessage);
    expect(validationMessage).toMatch(expectedMessage);
}

export async function getUserListDetails(rowLocator: Locator) {
    const allValuesFromRow = new Array
    const totalNumberOfRows = await rowLocator.count();
    for (var i = 0; i < totalNumberOfRows; i++) {

        const row = await rowLocator.nth(i).getByRole('cell').allTextContents();
        const userName = await (await rowLocator.nth(i).getByRole('cell').nth(0).allTextContents()).toString();

        if (!(userName === '')) {
            allValuesFromRow.push(row);

        }
    }
    return allValuesFromRow;
}
