
import test, { expect } from '@fixtures/all.fixture';
import { getSpecificUserInfo } from '@helpers/api/account-api-helper';
import { addNewBooksIntoUserCollection, deleteAllBooksInUserCollection } from '@helpers/api/book-api-helper';
import { AddListOfBookModel } from '@models/business-models/api/book-models';

const isbns = [
    { isbn: '9781449325862' },
    { isbn: '9781449331818' }
];

// eslint-disable-next-line @typescript-eslint/no-empty-function
test.beforeEach(async ({ }) => {
});

test.describe('Get User API @api @books-api', async () => {
    test('GET 1 User API should returns user info with their collection of books @get-book-api @add-book-api',
        async ({ }) => {
            await test.step('Add new books into user collection', async () => {
                const newBookInUserData = {
                    userId: process.env.BOOKSTORE_API_UUID,
                    collectionOfIsbns: isbns
                } as AddListOfBookModel;

                console.log(JSON.stringify(newBookInUserData));
                const newBookInCollection = await addNewBooksIntoUserCollection(process.env.BOOKSTORE_API_TOKEN, newBookInUserData);

                console.log(newBookInCollection.status());
                console.log(await newBookInCollection.json());
                // add book data will be covered in another test suite
                // in this test case, we just focus on the get 1 user API
                expect(newBookInCollection.ok()).toBeTruthy();
            });
            await test.step('Get User Info', async () => {
                const userInfo = await getSpecificUserInfo(process.env.BOOKSTORE_API_TOKEN, process.env.BOOKSTORE_API_UUID);

                console.log(userInfo.status());
                console.log(await userInfo.json());

                expect(userInfo.ok()).toBeTruthy();

                for (const isbn of isbns)
                    expect((await userInfo.json()).books).toContainEqual(expect.objectContaining(isbn));
            });
        });
});

test.afterAll(async ({ }) => {
    // Delete the book in user collection
    await deleteAllBooksInUserCollection(process.env.BOOKSTORE_API_TOKEN, process.env.BOOKSTORE_API_UUID);
});