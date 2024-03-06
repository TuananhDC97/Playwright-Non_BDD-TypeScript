import { chromium, expect, FullConfig } from '@playwright/test';
import { LoginPage } from '@pages/login.page';
import { addNewUser } from '@helpers/api/account-api-helper';

async function setupBookstore(config: FullConfig): Promise<void> {
    let userData = {
        userName: '$$RANDOM_TEXT$$',
        password: '$$RANDOM_PASSWORD$$'
    };

    const createdUserInfo = await addNewUser(userData);
    const browser = await chromium.launch({ headless: true });
    const baseUrl = config.projects[0].use.baseURL;

    const page = await browser.newPage({
        baseURL: baseUrl,
    });
    
    const loginPage = new LoginPage(page, '/login');
    await page.goto('/login', {
        timeout: 50000,
    });

    await loginPage.login({
        Username: userData.userName,
        Password: userData.password,
    });
    
    await expect(page).toHaveURL('/profile');
    var cookies = await page.context().cookies();
    await loginPage.setStorageState('./data/auth.json');
    await browser.close();

    process.env.BOOKSTORE_USERNAME = userData.userName;
    process.env.BOOKSTORE_PASSWORD = userData.password;
    process.env.BOOKSTORE_UUID = createdUserInfo.userID
    process.env.BOOKSTORE_TOKEN = cookies.find(c => c.name == 'token').value;
}

export { setupBookstore };
