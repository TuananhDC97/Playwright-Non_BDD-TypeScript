import { BasePage } from '@core/page/base.page';

export class ProfilePage extends BasePage {
    constructor(page, endpoint) {
        super(page, endpoint);
        this.screenshotMaskedLocator = [];
    }

    public get usernameLabel() { return this.page.locator('#userName-value'); }

    async isBookVisible(book: string) {
        var bookInCollection = this.page.locator(`//a[text()='${book.trim()}']`);
        return bookInCollection.isVisible;
    }
}
