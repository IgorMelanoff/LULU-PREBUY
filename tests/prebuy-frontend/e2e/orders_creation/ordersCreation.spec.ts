import dotenv from 'dotenv';
import { test } from 'fixture/BaseTest';
import * as commonMethod from 'pages/prebuy-frontend/BasePage';
import * as testData from 'utilities/PREBUYTestData';
//import * as constant from 'utilities/PREBUYConstants';

dotenv.config();

test.beforeEach(async ({ page, loginPage, homePage }) => {
    console.log("QA: Login to the NuORDER site")
    await test.step(`Login to the NuORDER`, async () => {
        console.log("DEBUG: NuOrder_URL = ", process.env.NuORDER_URL);
        await commonMethod.navigateAndLogIn(page, loginPage, process.env.NuORDER_URL, process.env.NuORDER_USER_EMAIL, process.env.NuORDER_USER_PASSWORD);
        console.log("QA: check if the Product Link is Visible on the Home Page")
        await test.step(`Verify Product Link Label on the Home Page`, async () => {
            await homePage.page.waitForTimeout(10000);
            //await homePage.verifyProductLinkVisibility();
        });
    });
});

test.describe('PreConditioning - Clearing the CARD', () => {
    test('Verify_That_The_Card_Is_EMPTY_and_CLEAR . tags: @e2e, @smoke', async ({ homePage, productsPage }) => {
        await test.step(`Check if the Card Count is Visible`, async () => {
            await homePage.page.waitForTimeout(2000);
            if (await homePage.isTheCardCountVisible()) {
                console.log("QA: The Card Count is Visible - something in the Card")
                await test.step(`Click on the Card Cout`, async () => {
                    await homePage.page.waitForTimeout(2000);
                    await homePage.clickCardCount();
                });
                console.log("QA: In Products Tab - Click Remove 'Product butoon'")
                await test.step(`Click Remove Product btn`, async () => {
                    await productsPage.page.waitForTimeout(1000);
                    await productsPage.clickRemoveProductBtn();
                    await homePage.page.waitForTimeout(4000);
                });
            } else {
                console.log("QA: The Card is Empty - do nothing")
            }
        });

    });
});

test.describe.skip('Test Suite for Orders Creations', () => {
    test('Verify_That_User_Can_Order_1_PINK_SACURA_PANTS_in_NuOrder . tags: @e2e, @smoke', async ({ homePage, galetyProductsPage, productsPage, cardPage, ordersPage }) => {
        let orderNumber: string; // Declare orderNumber variable to use across steps

        await test.step(`Click on the Products in the left side panel Menu`, async () => {
            console.log("QA: Click on 'Products' in the side Menu")
            await test.step(`Verify Product Link Label on the Home Page`, async () => {
                await homePage.page.waitForTimeout(3000);
                await homePage.clickOnProductSidePanelMenu();
            });
        });


        await test.step('Search for "SACURA PINK" from the Product page', async () => {
            await homePage.page.waitForTimeout(3000);
            await galetyProductsPage.searchProduct(testData.data.ProductColor);
        })


        await test.step('Click on decription product Style Number Product "SACURA PINK" pants"', async () => {
            await galetyProductsPage.page.waitForTimeout(2000);
            await galetyProductsPage.clickOnProduct();
        })

        await test.step('Click Add to Order', async () => {
            await productsPage.page.waitForTimeout(2000);
            await productsPage.enterSizeQty('1');
            await productsPage.page.waitForTimeout(2000);
            await productsPage.clickAddToOrder();
            await productsPage.page.waitForTimeout(2000);

        })
        await test.step('Click on Card', async () => {
            await galetyProductsPage.page.waitForTimeout(2000);
            await galetyProductsPage.clickOnCard();
            await cardPage.page.waitForTimeout(2000);
        })
        //Finishing the Order
        await test.step('Card - Order Details Tab - click on the Order Tab', async () => {
            await cardPage.page.waitForTimeout(2000);
            await cardPage.clickOnOrderTab();
            await cardPage.page.waitForTimeout(2000);
        })

        await test.step('Card - Order Details Tab - Select a Company', async () => {
            await cardPage.page.waitForTimeout(1000);
            await cardPage.clickOnSelectCompany();
            await cardPage.page.waitForTimeout(1000);
            await cardPage.enterTheCompany();
            await cardPage.page.waitForTimeout(1000);
            await cardPage.selectTheCompany();
        })

        await test.step.skip('Card - ORDER DETAILS Tab - choose the Shipping Address', async () => {
            await cardPage.page.waitForTimeout(2000);
            await cardPage.clickOnShippingAddress();
            await cardPage.page.waitForTimeout(2000);
            await cardPage.choosShippingLocation();
            await cardPage.page.waitForTimeout(2000);
            await cardPage.clickOnNexBtn();
        })

        await test.step('Card - click on Order PRODUCTS Tab', async () => {
            await cardPage.page.waitForTimeout(2000);
            await cardPage.clickOnProductTab();
            await cardPage.page.waitForTimeout(2000);
        })

        await test.step('Card - PRODUCTS Tab - Extract the Order Number and just click Next', async () => {
            await cardPage.page.waitForTimeout(2000);
            orderNumber = await cardPage.extractOrderNumber(); // Assign to the declared variable
            orderNumber = await cardPage.extractOrderNumber(); // Assign to the declared variable
            console.log('Order Number:', orderNumber);
            await cardPage.page.waitForTimeout(2000);
            await cardPage.clickOnNexBtn();
        })

        await test.step('Card - ORDER REVIEW Tab - click SUBMIT ORDER', async () => {
            await cardPage.page.waitForTimeout(2000);
            await cardPage.clickOnSubmitBtn();
        })

        await test.step(`Click on the Orders in the left side panel Menu`, async () => {
            console.log("QA: Click on the 'Orders' in the side Menu")
            await homePage.page.waitForTimeout(3000);
            await homePage.clickOnOrdersSidePanelMenu();
            await homePage.page.waitForTimeout(2000);
            await homePage.clickOnOrdersSidePanelMenu();
        });

        await test.step(`Verify that the new Order is in Order List`, async () => {
            console.log("QA: Verify that the Order is in the List")
            await homePage.page.waitForTimeout(3000);
            // Verify the order number appears in the orders List
            await ordersPage.verifyOrderInList(orderNumber);
            console.log(`✅ Order ${orderNumber} successfully found in Orders list`);
        });

    });

});
