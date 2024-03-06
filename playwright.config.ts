import { devices, PlaywrightTestConfig, defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';

import { FRONTEND_BASE_URL } from '@constants/url-constants';
import { BOOKSTORE_BASE_URL } from '@constants/api-constants';

dotenv.config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
    testDir:     './tests',
    snapshotDir: './__snapshots__',
    /* Maximum time one test can run for. */
    timeout:     80 * 1000,
    expect:      {
        /**
         * Maximum time expect() should wait for the condition to be met.
         * For example in `await expect(locator).toHaveText();`
         */
        timeout:         5000,
        toMatchSnapshot: {
            maxDiffPixels: 700
        },
        toHaveScreenshot: {
            maxDiffPixels: 700
        }
    },
    // testMatch: '.*(test|spec)\.(js|ts|mjs)',
    testIgnore: '',
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries:    process.env.CI ? 2 : 0,
    /* Opt out of parallel tests on CI. */
    workers:    process.env.CI ? 1 : 3,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter:   [
        process.env.CI ? ['html', { open: 'never' }] : ['html'],
        // ['list'],
        // ['json', { outputFile: './test-results/json/json-report-test-result.json' }],
        ['dot'], // concise, default on CI
        // ['line'], // useful for large test suites where it shows the progress
        ['junit', { outputFile: './test-results/junit/junit-report-test-result.xml' }], // junit xml report
        // ['./reporters/custom_reporter.ts'] // custom reporter,
        [
            'allure-playwright',
            {
                detail:       true,
                outputFolder: './test-results/allure',
                suiteTitle:   false
            }
        ]
    ],
    globalSetup:    './hooks/global-setup',
    globalTeardown: './hooks/global-teardown',
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use:            {
        /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
        actionTimeout: 0,
        headless:      true,
        viewport:      { width: 1280, height: 720 },
        video:         'retain-on-failure',
        screenshot:    'on',
        /* Base URL to use in actions like `await page.goto('/')`. */
        baseURL: FRONTEND_BASE_URL,
        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'on',
    },

    /* Configure projects for different environments */
    projects: [
        {
            name:       'bookstore-chromium',
            testDir:    './tests/book',
            testMatch:  /.*.spec.ts/,
            testIgnore: /.*smoke.spec.ts/,
            retries:    2,
            use:        {
                ...devices['Desktop Chrome'],
                browserName: 'chromium',
                baseURL:     FRONTEND_BASE_URL,
            }
        },
        {
            name:       'bookstore-firefox',
            testDir:    './tests/book',
            testMatch:  /.*.spec.ts/,
            testIgnore: /.*smoke.spec.ts/,
            retries:    2,
            use:        {
                ...devices['Desktop Firefox'],
                browserName: 'firefox',
                baseURL:     FRONTEND_BASE_URL,
            }
        },
        {
            name:       'bookstore-api',
            testDir:    './tests/api',
            testMatch:  /.*.spec.ts/,
            testIgnore: /.*smoke.spec.ts/,
            retries:    2,
            use:        {
                baseURL: BOOKSTORE_BASE_URL
            },
        },

        /* Test against mobile viewports. */
        // {
        //   name: 'Demo Mobile Chrome',
        //   testDir: './tests/demo',

        //   testMatch: /.*.spec.ts/,
        //   testIgnore: /.*smoke.spec.ts/,
        //   use: {
        //     ...devices['Pixel 5'],
        //     browserName: 'chromium'
        //   },
        // },
        // {
        //   name: 'Mobile Safari',
        //   use: {
        //     ...devices['iPhone 12'],
        //   },
        // },

        /* Test against branded browsers. */
        // {
        //   name: 'Microsoft Edge',
        //   use: {
        //     channel: 'msedge',
        //   },
        // },
        // {
        //   name: 'Google Chrome',
        //   use: {
        //     channel: 'chrome',
        //   },
        // },
    ],

    /* Folder for test artifacts such as screenshots, videos, traces, etc. */
    outputDir: 'test-results/',
};

export default config;