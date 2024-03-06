import { ReplacePlaceHolderValueInObjbect } from '@core/utils/placeholder-helper';
import test, { expect } from '@fixtures/all.fixture';
import { LoginInfo } from '@models/business-models/book/login-info';
import * as loginTestData from '@data/frontend/login-data.json';

test.beforeEach(async ({ page }) => {
    await page.goto('/login');
});

test('login page displays correctly @visualCheck', async ({ page }) => {
    await expect(page).toHaveScreenshot({
        fullPage: true
    });
});

test.describe('Login successfully @bookstore @login', async () => {
    test('Login with valid account', async ({ page, loginPage, profilePage }) => {
        let loginInfo: LoginInfo = loginTestData.ValidData.ValidAccount;
        loginInfo = ReplacePlaceHolderValueInObjbect(loginInfo) as LoginInfo;
        await loginPage.login(loginInfo);
        await expect(page).toHaveURL('/profile');
        await expect(profilePage.usernameLabel).toHaveText(loginInfo.Username);

        //Save current state of web because new token will be generated after signing in successfully
        await loginPage.setStorageState('./data/auth.json');
        var cookies = await page.context().cookies();
        process.env.BOOKSTORE_TOKEN = cookies.find(c => c.name == 'token').value;
    });
    test('Login with invalid account', async ({ page, loginPage }) => {
        let loginInfo: LoginInfo = loginTestData.InvalidData.InvalidUsernameOrPassword;
        await loginPage.login(loginInfo);
        await expect(page).toHaveURL('/login');
        await expect(loginPage.errorMessage).toHaveText("Invalid username or password!");
    });
});