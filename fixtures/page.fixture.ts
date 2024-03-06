import { test as baseTest } from '@playwright/test';
import { LoginPage } from '@pages/login.page';
import { ProfilePage } from '@pages/profile.page';
import { BookStorePage } from '@pages/bookstore.page';
import { BookDetailPage } from '@pages/bookdetail.page';
import { FRONTEND_BOOKSTORE_ENDPOINTS } from '@config/endpoints';

export type PageFixtureType = {
	loginPage: LoginPage;
	profilePage: ProfilePage;
    bookStorePage: BookStorePage;
    bookDetailPage: BookDetailPage;
}

type ExtendParams = Parameters<typeof baseTest.extend<PageFixtureType>>;

export const pageFixture: ExtendParams[0] = {
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page, FRONTEND_BOOKSTORE_ENDPOINTS.LOGIN));
    },
    profilePage: async ({ page }, use) => {
        await use(new ProfilePage(page, FRONTEND_BOOKSTORE_ENDPOINTS.PROFILE));
    },
    bookStorePage: async ({ page }, use) => {
        await use(new BookStorePage(page, FRONTEND_BOOKSTORE_ENDPOINTS.BOOKSTORE));
    },
    bookDetailPage: async ({ page }, use) => {
        await use(new BookDetailPage(page, FRONTEND_BOOKSTORE_ENDPOINTS.BOOKDETAIL));
    }
};