import { BasePage } from '@core/page/base.page';

export class BookStorePage extends BasePage {
    constructor(page, endpoint) {
        super(page, endpoint);
        this.screenshotMaskedLocator = [];
    }

    async selectBook(book: string) {
        await this.gotoOwnPage();
        var selectedBook = this.page.locator(`//a[text()='${book.trim()}']`);
        await this.click(selectedBook);
    }
}
