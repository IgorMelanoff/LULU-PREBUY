import { test } from 'fixture/BaseTest';
import * as commonMethod from '../pages/prebuy-frontend/BasePage';

// Example usage of WebAuthn bypass functionality
test.describe('WebAuthn Bypass Examples', () => {

    test('Login with WebAuthn bypass enabled (default)', async ({ page, loginPage }) => {
        // Default behavior - WebAuthn bypass is enabled
        await commonMethod.navigateAndLogIn(
            page,
            loginPage,
            process.env.NuORDER_URL!,
            process.env.NuORDER_USER_EMAIL!,
            process.env.NuORDER_USER_PASSWORD!
            // bypassPasskey defaults to true
        );

        console.log('✅ Login completed with WebAuthn bypass');
    });

    test('Login with explicit WebAuthn bypass', async ({ page, loginPage }) => {
        // Explicitly enable WebAuthn bypass
        await commonMethod.navigateAndLogIn(
            page,
            loginPage,
            process.env.NuORDER_URL!,
            process.env.NuORDER_USER_EMAIL!,
            process.env.NuORDER_USER_PASSWORD!,
            'domcontentloaded',
            true,
            true  // Enable WebAuthn bypass
        );

        console.log('✅ Login completed with explicit WebAuthn bypass');
    });

    test('Login without WebAuthn bypass', async ({ page, loginPage }) => {
        // Disable WebAuthn bypass if you want to test actual passkey flow
        await commonMethod.navigateAndLogIn(
            page,
            loginPage,
            process.env.NuORDER_URL!,
            process.env.NuORDER_USER_EMAIL!,
            process.env.NuORDER_USER_PASSWORD!,
            'domcontentloaded',
            true,
            false  // Disable WebAuthn bypass
        );

        console.log('✅ Login completed without WebAuthn bypass');
    });

    test('Manual WebAuthn bypass setup', async ({ page, loginPage }) => {
        // Manual setup for more control
        await commonMethod.disableWebAuthnAPIs(page);
        await commonMethod.bypassWebAuthn(page);

        await page.goto(process.env.NuORDER_URL!);
        await loginPage.typeIntoEmailInputField(process.env.NuORDER_USER_EMAIL!);
        await loginPage.typeIntoPasswordInputField(process.env.NuORDER_USER_PASSWORD!);
        await loginPage.clickOnLogInBtn();

        // Handle any WebAuthn prompts
        await commonMethod.dismissWebAuthnPrompts(page);

        console.log('✅ Manual WebAuthn bypass completed');
    });
});
