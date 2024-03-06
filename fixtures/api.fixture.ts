import { APIRequestContext, test as baseTest, request } from '@playwright/test';
import { RestClient } from '@core/api/rest-client';

export type ApiFixtureType = {
    createRestClient: (apiRequestContext: APIRequestContext) => RestClient;
}

type ExtendParams = Parameters<typeof baseTest.extend<ApiFixtureType>>;

export const apiFixture: ExtendParams[0] = {
    createRestClient: async ({ }, use) => {
        const func = (apiRequestContext: APIRequestContext) => {
            return new RestClient(apiRequestContext);
        };

        await use(func);
    }
};