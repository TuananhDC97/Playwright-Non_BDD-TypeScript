import { 
    BrowserContext, 
    Config, 
    expect, 
    FrameLocator, Locator, 
    Page, 
    PageScreenshotOptions
} from '@playwright/test';
import config from '../../playwright.config';
import { IPage } from '@core/page/page';

export class BasePage implements IPage {
    private readonly _page: Page;
    endpoint: string;
    screenshotMaskedLocator: Locator[];
    testBaseTimeout = config.timeout; // timeout for each test, default: 30s
    globalTimeout = config.globalTimeout; // maximum timeout for whole test suite, default: 0s (disabled)
    expectBaseTimeout = config.expect.timeout; // timeout for expect matchers, default: 5s

    constructor (page: Page, endpoint = '') {
        this._page = page;
        this.endpoint = endpoint;
    }

    public get page () { return this._page; }

    async goto (url: string = this.endpoint, options?: {
        timeout?: number;
        waitUntil?: 'networkidle' | 'load' | 'domcontentloaded' | 'commit';
    }) {
        await this.page.goto(url, options);
    }

    async gotoOwnPage () {
        await this.goto(this.endpoint);
    }

    async goBack (options?: {
        timeout?: number;
        waitUntil?: 'networkidle' | 'load' | 'domcontentloaded' | 'commit';
    }) {
        await this.page.goBack(options);
    }

    async getTitle (): Promise<string> {
        console.log('Getting page\'s title');
        return await this.page.title();
    }

    async waitForPageLoad (loadState?: 'networkidle' | 'load' | 'domcontentloaded', options?: {
        timeout?: number;
    }): Promise<IPage> {
        await this.page.waitForLoadState(loadState, options);
        return this as IPage;
    }

    async waitForElement (locator: Locator, options?: {
        state?: 'attached' | 'detached' | 'visible' | 'hidden';
        timeout?: number;
    }): Promise<void> {
        await locator.waitFor(options);
    }

    async waitForElementToBeVisible (locator: Locator) : Promise<void> {
        return await this.waitForElement(locator, { state: 'visible' });
    }

    async waitForElementToBeHidden (locator: Locator) {
        return await this.waitForElement(locator, { state: 'hidden' });
    }

    // type will simulate the typing behaviour of user
    async typeText (locator: Locator, text: string, options?: {
        delay?: number;
        noWaitAfter?: boolean;
        strict?: boolean;
        timeout?: number;
    }): Promise<IPage> {
        await locator.type(text, options);
        return this;
    }

    async fillText (locator: Locator, text: string): Promise<IPage> {
        await locator.fill(text);
        return this;
    }

    async click (locator: Locator, index = 0): Promise<IPage> {
        await locator.nth(index).click();
        return this;
    }

    async hover (locator: Locator, options?: {
        timeout?: number;
    }): Promise<void> {
        await locator.hover(options);
    }

    async getBrowserContext (): Promise<BrowserContext> {
        return await this.page.context();
    }

    async setStorageState (storageStatePath: string) {
        await this.page.context().storageState({ path: storageStatePath });
    }

    async getText (locator: Locator, index = 0): Promise<string> {
        const elementText = await locator.nth(index).innerText();

        return elementText;
    }

    async getInputValue (locator: Locator, index = 0): Promise<string> {
        const elementText = await locator.nth(index).inputValue();

        return elementText;
    }

    async getLocator (selector: string, index = 0, options?: {
        has?: Locator;
        hasText?: string | RegExp;
    }): Promise<Locator> {
        return await this.page.locator(selector, options).nth(index);
        // await this.getLocatorBy(LocatorType.ROLE, 'alert', {});
    }

    // async getLocatorBy (locatorType: LocatorType, locatorValue: string, options?) : Promise<Locator> {
    //     switch (locatorType) {
    //     case LocatorType.ROLE:
    //         return await this.page.getByRole(locatorValue, options);
    //     case LocatorType.TEXT:
    //         return await this.page.getByText(locatorValue, options);
    //     case LocatorType.LABEL:
    //         return await this.page.getByLabel(locatorValue, options);
    //     case LocatorType.PLACEHOLDER:
    //         return await this.page.getByPlaceholder(locatorValue, options);
    //     case LocatorType.ALT_TEXT:
    //         return await this.page.getByAltText(locatorValue, options);
    //     case LocatorType.TITLE:
    //         return await this.page.getByTitle(locatorValue, options);
    //     case LocatorType.TEST_ID:
    //         return await this.page.getByTestId(locatorValue);
    //     default: 
    //         return await this.getLocator(locatorValue, 0, options);
    //     }
    // }

    async getNumberOfElements (locator: Locator): Promise<number> {
        return await locator.count();
    }

    async pressKey (locator: Locator, key: string,
        options?: { delay?: number; noWaitAfter?: boolean; timeout?: number; }) {
        return await locator.press(key, options);
    }

    async rightClick (locator: Locator) {
        return await locator.click({
            button: 'right',
        });
    }

    async middleClick (locator: Locator) {
        return await locator.click({
            button: 'middle',
        });
    }

    async holdKeyAndClick (locator: Locator, options?: {
        modifiers?: ('Alt' | 'Control' | 'Meta' | 'Shift')[];
        timeout?: number;
    }) {
        return await locator.click(options);
    }

    async clickAndHold (locator: Locator) {
        return await locator.click({
            delay: 3000
        });
    }

    async clickMultipleTimes (locator: Locator, clickCount: number) {
        return await locator.click({
            clickCount: clickCount,
        });
    }

    async checkButton (locator: Locator) {
        await this.waitForElementToBeVisible(locator);
        await locator.check();
    }

    async uncheckButton (locator: Locator) {
        await this.waitForElementToBeVisible(locator);
        await locator.uncheck();
    }

    async selectFromDropdown (dropdownLocator: Locator, value: string) {
        await dropdownLocator.selectOption(value);
    }

    async captureScreenshot (options?: PageScreenshotOptions): Promise<Buffer> {
        return await this.page.screenshot(options);
    }

    async checkScreenshot (screenshotBuffer: Buffer, fileName: string, options?: {
        threshold?: number,
        maxDiffPixels?: number,
        maxDiffPixelRatio?: number,
    }) {
        await expect(screenshotBuffer).toMatchSnapshot(fileName, options);
    }

    async captureAndVerifyScreenshot (fileName: string, captureScreenshotOptions?: PageScreenshotOptions) {
        const screenshotBuffer = await this.captureScreenshot(captureScreenshotOptions);

        await this.checkScreenshot(screenshotBuffer, fileName);
    }
}