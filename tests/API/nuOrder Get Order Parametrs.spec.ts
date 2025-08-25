import { test, request, expect } from '@playwright/test';
import OAuth from 'oauth-1.0a';
import crypto from 'crypto';
import Ajv from 'ajv';

// Schema for response validation
const orderSchema = {
    type: 'object',
    required: ['id', 'line_items', 'price', 'category', 'creator_name'],
    properties: {
        id: { type: 'string' },
        line_items: { type: 'array' },
        price: { type: ['number', 'string'] },
        category: { type: 'string' },
        creator_name: { type: 'string' },
    },
    additionalProperties: true,
};

test('🤖 Get API Order by Number. tags: @api', async () => {
    // ENV and endpoint config
    //const env = 'next';
    const orderNumber = '2021598';
    //const url = `https://${env}.nuorder.com/api/order/number/${orderNumber}`;
    const url = process.env.NuORDER_API_URL_END_POINT + orderNumber;

    // OAuth 1.0a credentials (from Postman export)
    const consumer_key = process.env.NuORDER_CONSUMER_KEY;
    const consumer_secret = process.env.NuORDER_CONSUMER_SECRET;
    const token = process.env.NuORDER_TOKEN;
    const token_secret = process.env.NuORDER_TOKEN_SECRET;

    // Step 1: Generate OAuth header
    const oauth = new OAuth({
        consumer: { key: consumer_key, secret: consumer_secret },
        signature_method: 'HMAC-SHA1',
        hash_function(baseString, key) {
            return crypto.createHmac('sha1', key).update(baseString).digest('base64');
        },
    });

    const requestData = { url, method: 'GET' };
    const authHeader = oauth.toHeader(
        oauth.authorize(requestData, { key: token, secret: token_secret })
    );

    // Step 2: Make the request
    const apiContext = await request.newContext({
        extraHTTPHeaders: {
            Authorization: authHeader.Authorization,
            Accept: 'application/json',
        },
    });


    const response = await apiContext.get(url);
    if (response.status() !== 200) {
        console.error(`❌ API call failed with status: ${response.status()}`);
        expect(response.status()).toBe(200); // Will fail and stop the test
        return; // Stop further execution if not 200
    }
    console.log('The Respond APi call STATUS is ✅ 200');

    // Step 3: Parse response
    const body = await response.json();

    // Step 4: Validate required keys exist
    for (const key of ['schema_id', 'creator_name', 'line_items']) {
        expect(body).toHaveProperty(key);
    }

    // Step 5: Validate data types using Ajv
    //const ajv = new Ajv();
    //const validate = ajv.compile(orderSchema);
    //const valid = validate(body);
    //if (!valid) {
    //    console.error('❌ Ajv validation errors:', validate.errors);
    //}
    //expect(valid).toBe(true);

    // Step 6: Log key values
    //console.log(`\n📦 Order by: ${body.creator_name}, 
    //    \n💰 Schema_id: ${body.schema_id}`,
    //    `\n🎨 color: ${body.line_items.map(item => item.product.color).join(', ')}`);

    console.log('📦 NuOrder Order Summary');
    console.log('───────────────────────────────');
    console.log(`👤 Creator      : ${body.creator_name}`);
    console.log(`🆔 Schema ID    : ${body.schema_id}`);
    //console.log(`💰 Price        : ${body.shipping_information.price}`);

    // Extract all prices from all sizes in all line items
    const allPrices = body.line_items.flatMap(item =>
        item.sizes.map(size => `$${size.price} (${size.size})`)
    );
    console.log(`💰 Prices       : ${allPrices.join(', ')}`);

    console.log(`\n🎨 Product Colors in Line Items:: ${body.line_items.map(item => item.product.color).join(', ')}`);

});
