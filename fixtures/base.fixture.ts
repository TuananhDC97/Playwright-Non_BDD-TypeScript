import { test as baseTest } from '@playwright/test';
import { BasePage } from '@core/page/base.page';

export type BaseFixtureType = {
    basePage: BasePage;
}

type ExtendParams = Parameters<typeof baseTest.extend<BaseFixtureType>>;

export const baseFixture: ExtendParams[0] = {
    basePage: async ({ page }, use) => {
        await use(new BasePage(page));
    },
};