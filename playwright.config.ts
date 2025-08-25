import { PlaywrightTestConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';


dotenv.config();
const isCI = process.env.CI === 'true'; // Detect if running on GitLab

const defaultConfig: PlaywrightTestConfig = {
  workers: isCI ? 1 : 1, // Single worker for CI , single for local (no parallelism)
  timeout: isCI ? 120000 : 120000, // 2 min for CI, 2 min for local for each test
  fullyParallel: false, // Ensure tests run sequentially
  //expect: {
  //  timeout: 20000 //20 sec //120000 - 2min  timeouts for await ecpect(locator).toBeVisible
  //},
  //globalTimeout: 60 * 10 * 100, //60 * 60 * 1000,- 1hour - entire test suite run
  //retries: isCI ? 1 : 0, // Set retries: 1 for GitLab CI, 0 for local
  snapshotPathTemplate: 'test-reports/snapshots/{testName}{ext}',
  updateSnapshots: 'all',
  use: {
    //extraHTTPHeaders: {
    //  'x-lll-access-token': process.env.X_ACCESSTOKEN_BYPASSVPN!,
    //},
    //baseURL: process.env.NuORDER_URL,
    //headless: true,
    //viewport: { width: 1250, height: 700 },
    //ignoreHTTPSErrors: true,
    //acceptDownloads: true,
    screenshot: 'on',
    video: `on`,
    trace: `off`,
    //launchOptions: {
    //  slowMo: 0,
    //},
    actionTimeout: isCI ? 20000 : 15000,  // 20s for CI, 15s for local
    //navigationTimeout: 25000, // 15 seconds for navigation
  },

  reporter: [
    ['list'],
    [
      'allure-playwright',
      {
        detail: false,
        outputFolder: 'test-reports/allure-results',
        suiteTitle: true,
        history: true,
        host: true,
        printSteps: true,
        categories: [
          {
            name: 'Outdated tests',
            messageRegex: '.*FileNotFound.*',
          },
        ],
      },
    ],
    [`html`, { outputFolder: 'test-reports/playwright-report', open: 'never' }],
    [
      `junit`,
      { outputFile: 'test-results/junit-report.xml', embedAnnotationsAsProperties: true, attachmentsBaseURL: true, printSteps: true },
    ],
  ],

  projects: [
    {
      name: 'setup',
      testMatch: /GlobalSetup\.setup\.ts/,
    },
    {
      name: 'teardown',
      testMatch: /GlobalTeardown\.setup\.ts/,
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: `Chrome`,
      use: {
        browserName: `chromium`,
        channel: `chrome`,
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36', // Normal Chrome user-agent
        ignoreHTTPSErrors: true,
      },
      dependencies: ['setup'],
      teardown: 'teardown',
    },
    {
      name: `Firefox`,
      use: {
        browserName: `firefox`,
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36', // Normal Chrome user-agent
        ignoreHTTPSErrors: true,
      },
      dependencies: ['setup'],
      teardown: 'teardown',
    },
    {
      name: `Edge`,
      use: {
        browserName: `chromium`,
        channel: `msedge`,
        ignoreHTTPSErrors: true,
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36', // Normal Chrome user-agent
      },
      dependencies: ['setup'],
      teardown: 'teardown',
    },
    {
      name: `Safari`,
      use: {
        browserName: `webkit`,
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36', // Normal Chrome user-agent
        ignoreHTTPSErrors: true,
      },
      dependencies: ['setup'],
      teardown: 'teardown',
    }
  ],
};
export default defaultConfig;
