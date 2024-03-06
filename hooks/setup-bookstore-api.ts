import { expect, FullConfig } from '@playwright/test';
import { addNewUser, generateToken } from '@helpers/api/account-api-helper';
import { TokenViewModel } from '@models/business-models/api/account-models';

async function setupBookstoreAPI(config: FullConfig): Promise<void> {
    let userData = {
        userName: '$$RANDOM_TEXT$$',
        password: '$$RANDOM_PASSWORD$$'
    };
    const createdUserInfo = await addNewUser(userData);
    const generateTokenResponse = await generateToken(userData);

    console.log(generateTokenResponse.status());
    console.log(await generateTokenResponse.json());

    expect(generateTokenResponse.ok()).toBeTruthy();
    const tokenInfo = await generateTokenResponse.json() as TokenViewModel;

    process.env.BOOKSTORE_API_UUID = createdUserInfo.userID;
    process.env.BOOKSTORE_API_TOKEN = tokenInfo.token;
}

export { setupBookstoreAPI };