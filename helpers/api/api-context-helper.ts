import { BOOKSTORE_BASE_URL } from '@constants/api-constants';
import { request } from '@playwright/test';

function getCommonApiContext () {
    return request.newContext({ 
        baseURL: BOOKSTORE_BASE_URL
    });
}

export { getCommonApiContext };