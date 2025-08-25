# WebAuthn/Passkey Bypass Implementation

This implementation provides comprehensive WebAuthn and passkey authentication bypass for automated testing using Playwright and Chrome DevTools Protocol (CDP).

## Features

✅ **Virtual Authenticator Setup** - Creates a virtual WebAuthn device that auto-approves authentication  
✅ **API Blocking** - Disables WebAuthn JavaScript APIs to prevent authentication prompts  
✅ **Prompt Dismissal** - Automatically detects and dismisses authentication prompts  
✅ **Easy Integration** - Simple parameter to enable/disable bypass in existing login flows  

## How It Works

### 1. Virtual Authenticator (CDP)
- Uses Chrome DevTools Protocol to create a virtual WebAuthn device
- Configured with `isUserVerified: true` to automatically approve authentication
- Sets `automaticPresenceSimulation: true` for seamless operation

### 2. API Blocking (JavaScript Injection)
- Overrides `navigator.credentials.create()` and `navigator.credentials.get()`
- Disables `PublicKeyCredential` availability checks
- Prevents WebAuthn authentication from being initiated

### 3. Prompt Dismissal
- Searches for common WebAuthn/passkey prompt selectors
- Clicks cancel/skip buttons automatically
- Uses keyboard Escape as fallback

## Usage

### Basic Usage (Recommended)
```typescript
// WebAuthn bypass is enabled by default
await commonMethod.navigateAndLogIn(
    page, 
    loginPage, 
    url, 
    username, 
    password
);
```

### Explicit Control
```typescript
// Explicitly enable WebAuthn bypass
await commonMethod.navigateAndLogIn(
    page, 
    loginPage, 
    url, 
    username, 
    password,
    'domcontentloaded',
    true,
    true  // Enable WebAuthn bypass
);

// Disable WebAuthn bypass (test real passkey flow)
await commonMethod.navigateAndLogIn(
    page, 
    loginPage, 
    url, 
    username, 
    password,
    'domcontentloaded',
    true,
    false  // Disable WebAuthn bypass
);
```

### Manual Setup
```typescript
// For fine-grained control
await commonMethod.disableWebAuthnAPIs(page);
await commonMethod.bypassWebAuthn(page);

// Your login code here...

await commonMethod.dismissWebAuthnPrompts(page);
```

## Functions Reference

### `bypassWebAuthn(page: Page)`
Sets up a virtual WebAuthn authenticator using CDP that automatically approves authentication requests.

### `disableWebAuthnAPIs(page: Page)` 
Injects JavaScript to override and disable WebAuthn APIs, preventing authentication prompts from appearing.

### `dismissWebAuthnPrompts(page: Page)`
Searches for and dismisses any WebAuthn/passkey authentication prompts that may appear.

### `navigateAndLogIn(..., bypassPasskey: boolean = true)`
Enhanced login function with integrated WebAuthn bypass functionality.

## Browser Compatibility

- ✅ **Chrome/Chromium** - Full support via CDP
- ✅ **Edge** - Full support via CDP  
- ⚠️ **Firefox** - Limited support (API blocking only)
- ⚠️ **Safari** - Limited support (API blocking only)

## Common Selectors Handled

The implementation automatically handles these common WebAuthn prompt selectors:
- `[data-testid="webauthn-cancel"]`
- `[data-testid="passkey-cancel"]`
- `button:has-text("Cancel")`
- `button:has-text("Skip")`
- `button:has-text("Use password instead")`
- `.webauthn-cancel`
- `.passkey-cancel`

## Environment Variables

Make sure these are set in your `.env` file:
```env
NuORDER_URL=https://your-app-url.com
NuORDER_USER_EMAIL=test@example.com
NuORDER_USER_PASSWORD=your-password
```

## Troubleshooting

### Issue: WebAuthn prompts still appear
**Solution:** Ensure you're using Chrome/Chromium browser and the CDP session is properly established.

### Issue: Login fails after bypass
**Solution:** Check if the application has fallback authentication methods and ensure credentials are correct.

### Issue: Bypass not working in headless mode
**Solution:** The virtual authenticator works in both headed and headless modes. Verify the CDP session is created successfully.

## Security Note

⚠️ **This implementation is for testing purposes only.** Do not use in production environments as it completely bypasses security authentication mechanisms.

## Testing

Run the example tests to verify the implementation:
```bash
npx playwright test examples/webauthn-bypass-example.ts
```
