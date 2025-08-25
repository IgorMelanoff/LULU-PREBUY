import dotenv from 'dotenv';
import { test } from 'fixture/BaseTest';
import * as commonMethod from 'pages/prebuy-frontend/BasePage';
//import * as constant from 'utilities/PREBUYConstants';

dotenv.config();

test.beforeEach(async ({ page }) => {
    const url = process.env.NuORDER_URL;
    console.log("QA: Navigate to the NuORDER Login Page")
    await test.step(`Navigate to the URL NuORDER Login Page`, async () => {
        console.log("DEBUG: NuOrder_URL = ", process.env.NuORDER_URL);
        await commonMethod.navigateTo(page, url);
        // Wait till the page is fully loaded
        await commonMethod.waitForPageLoad(page);
    });
});

test.describe('Test Suite for NuORDER Login Page', () => {
    test('Verify_That_User_Can_Login_To_NuOrder . tags: @smoke', async ({ page, loginPage }) => {
        await test.step(`Enter valid email and PWD and click on the LogIn btn`, async () => {
            const userEmail = process.env.NuORDER_USER_EMAIL;
            const userPassword = process.env.NuORDER_USER_PASSWORD;
            const lulu_windows_EMAIL = process.env.LULU_WINDOWS_EMAIL;
            const lulu_windows_PWD = process.env.LULU_WINDOWS_PWD;
            //const firstLetterUppderEmail = originalEmail.charAt(0).toUpperCase() + originalEmail.slice(1).toLowerCase();
            //const mixedCaseEmail = firstLetterUppderEmail.replace("@lululemon.com", "@LULULEMON.COM");
            await commonMethod.logIn(loginPage, userEmail, userPassword);
            //Wait till the page is fully loaded
            await commonMethod.waitForPageLoad(page);
            await page.waitForTimeout(10000)
        });
        ///await test.step(`Verify User logged in success and Assertion on the account btn lable and URL.`, async () => {
        // Assertion on the Account Button Lable Text and URL.
        //await homePage.verifyAccountButtonText(constant.expectedAccountText);
        //await commonMethod.checkCurrentURL(page, constant.expectedLandingPageURI);
        //});
    });
});