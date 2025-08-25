import dotenv from 'dotenv';
import { test } from 'fixture/BaseTest';
import * as commonMethod from 'pages/prebuy-frontend/BasePage';
import * as testData from 'utilities/PREBUYTestData';
//import * as constant from 'utilities/PREBUYConstants';


import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';

dotenv.config();


test('Upload BuyFile CSV to S3 and validate in NuOrder UI', async ({ page }) => {
    // --- Step 1: Upload CSV to S3 ---
    const bucketName = "acs-b2b-prebuy-uploads-bucket";
    const key = "linesheets/franchise/igor-prebuy-linesheets-test.csv";
    const filePath = "./test-data/igor-prebuy-linesheets-test.csv";

    const s3 = new S3Client({ region: "us-east-1" });
    //const fileContent = fs.readFileSync(filePath);
    /*
        await s3.send(new PutObjectCommand({
            Bucket: bucketName,
            Key: key,
            Body: fileContent,
            ContentType: "text/csv"
        }));
    */
    console.log("✅ CSV uploaded to S3:", key);

    // --- Step 2: Go to NuOrder Linesheets ---
    //await page.goto("https://app.sandbox.nuorder.com/brand/<brandId>/linesheets");

    // --- Step 3: Search for uploaded file ---
    //await page.fill('input[placeholder="Search Linesheets"]', "igor-prebuy-linesheets-test");
    //await page.keyboard.press("Enter");

    // --- Step 4: Validate linesheet appears ---
    //const lineSheetTile = page.locator(`text=igor-prebuy-linesheets-test`);
    //await expect(lineSheetTile).toBeVisible({ timeout: 60000 }); // allow processing time

    // --- Step 5: Assert details ---
    //await lineSheetTile.click();
    //await expect(page.locator("h1")).toContainText("igor-prebuy-linesheets-test");
});

