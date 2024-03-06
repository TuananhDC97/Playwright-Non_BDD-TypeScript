import { expect, FullConfig } from '@playwright/test';
import { deleteUser, generateToken } from '@helpers/api/account-api-helper';
import { TokenViewModel } from '@models/business-models/api/account-models';

async function teardownBookstoreAPI(config: FullConfig): Promise<void> {
    const deleteUserResult = await deleteUser(process.env.BOOKSTORE_API_TOKEN, process.env.BOOKSTORE_API_UUID);
    expect(deleteUserResult).toBeTruthy();

    delete process.env.BOOKSTORE_API_TOKEN;
    delete process.env.BOOKSTORE_API_UUID;
}

async function teardownBookstore(config: FullConfig): Promise<void> {
    let userData = {
        userName: process.env.BOOKSTORE_USERNAME,
        password: process.env.BOOKSTORE_PASSWORD
    };
    const generateTokenResponse = await generateToken(userData);
    const tokenInfo = await generateTokenResponse.json() as TokenViewModel;

    const deleteUserResult = await deleteUser(tokenInfo.token, process.env.BOOKSTORE_UUID);
    expect(deleteUserResult).toBeTruthy();

    delete process.env.BOOKSTORE_USERNAME;
    delete process.env.BOOKSTORE_PASSWORD;
    delete process.env.BOOKSTORE_UUID;
    delete process.env.BOOKSTORE_TOKEN;
}

async function globalTeardown(config: FullConfig): Promise<void> {
    console.log('Tearing down BOOKSTORE API test suite');
    await teardownBookstoreAPI(config);
    console.log('Tearing down BOOKSTORE test suite');
    await teardownBookstore(config);
}

export default globalTeardown;