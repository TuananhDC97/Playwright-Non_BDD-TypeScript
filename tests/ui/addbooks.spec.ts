import test, { expect } from '@fixtures/all.fixture';
import { deleteAllBooksInUserCollection } from '@helpers/api/book-api-helper';

const collectionBookData = ['Git Pocket Guide', 'Git Pocket Guide, Understanding ECMAScript 6'];

test.use({
    storageState: './data/auth.json'
});

test('profile page displays correctly @visualCheck', async ({ page }) => {
    await expect(page).toHaveScreenshot({
        fullPage: true
    });
});

test.describe('Add books and check Profile page @bookstore @profile', async () => {
    for (const bookData of collectionBookData) {
        test(`Add book ${bookData} to collection and check Profile page`, async ({ page, bookStorePage, bookDetailPage, profilePage }) => {
            const books = bookData.split(',');
            for (const book of books) {
                await bookStorePage.selectBook(book);
                await bookDetailPage.addBookToCollection();
                await bookDetailPage.backToBookStorePage();
            }
            await profilePage.gotoOwnPage();
            for (const book of books) {
                expect(profilePage.isBookVisible(book)).toBeTruthy();
            }
        });
    }
});

test.afterEach(async ({ }) => {
    await deleteAllBooksInUserCollection(process.env.BOOKSTORE_TOKEN, process.env.BOOKSTORE_UUID);
});