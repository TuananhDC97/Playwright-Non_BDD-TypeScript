import { BasePage } from '@core/page/base.page';

export class BookDetailPage extends BasePage {
    constructor(page, endpoint) {
        super(page, endpoint);
        this.screenshotMaskedLocator = [];
    }

    public get addToYourCollecionButton() { return this.page.locator(`//button[text()='Add To Your Collection']`); }
    public get backToBookStoreButton() { return this.page.locator(`//button[text()='Back To Book Store']`); }

    async addBookToCollection() {
        await this.click(this.addToYourCollecionButton);
    }

    async backToBookStorePage() {
        await this.click(this.backToBookStoreButton);
    }
}
