import { Locator, PageScreenshotOptions } from '@playwright/test';

/// TODO: break IPage into more granular interfaces - IPageAction, IWait, IPageHistory, IPageInfo
export interface IPage {
    goto(url: string, options?: {
        timeout?: number;
        waitUntil?: 'networkidle' | 'load' | 'domcontentloaded' | 'commit';
    }) : Promise<void>;
    goBack (options?: {
        timeout?: number;
        waitUntil?: 'networkidle' | 'load' | 'domcontentloaded' | 'commit';
    }) : Promise<void>;

    click (locator: Locator, index): Promise<IPage>;
    holdKeyAndClick (locator: Locator, options?: {
        modifiers?: ('Alt' | 'Control' | 'Meta' | 'Shift')[];
        timeout?: number;
    });
    clickAndHold (locator: Locator);
    clickMultipleTimes (locator: Locator, clickCount: number);
    rightClick (locator: Locator);
    middleClick (locator: Locator);
    hover (locator: Locator, options?: {
        timeout?: number;
    }): Promise<void>;
    // type will simulate the typing behaviour of user
    typeText (locator: Locator, text: string, options?: {
        delay?: number;
        noWaitAfter?: boolean;
        strict?: boolean;
        timeout?: number;
    }): Promise<IPage>;
    fillText (locator: Locator, text: string): Promise<IPage>;
    pressKey (locator: Locator, key: string,
        options?: { delay?: number; noWaitAfter?: boolean; timeout?: number; });
    checkButton (locator: Locator);
    uncheckButton (locator: Locator);
    selectFromDropdown (dropdownLocator: Locator, value: string);

    getTitle (): Promise<string>;
    getText (locator: Locator, index): Promise<string>;
    getNumberOfElements (locator: Locator): Promise<number>;
    
    waitForPageLoad (loadState?: 'networkidle' | 'load' | 'domcontentloaded', options?: {
        timeout?: number;
    }): Promise<IPage>;
    waitForElementToBeVisible (locator: Locator, index) : Promise<void>;
    waitForElementToBeHidden (locator: Locator, index) : Promise<void>;

    captureScreenshot (options?: PageScreenshotOptions): Promise<Buffer>;
    checkScreenshot (screenshotBuffer: Buffer, fileName: string, options?: {
        threshold?: number,
        maxDiffPixels?: number,
        maxDiffPixelRatio?: number,
    });
    captureAndVerifyScreenshot (fileName: string, captureScreenshotOptions?: PageScreenshotOptions);
}