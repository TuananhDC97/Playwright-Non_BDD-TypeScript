import { API_BOOKSTORE_ENDPOINTS } from '@config/endpoints';
import { createRestClient, PlaywrightRestOptions, RestClient } from '@core/api/rest-client';
import { APIResponse } from '@playwright/test';
import { getCommonApiContext } from './api-context-helper';
import { expect } from '@fixtures/all.fixture';
import { ACCEPT, ApiAuthorizationType, CONTENT_TYPE } from '@constants/api-constants';
import { getSpecificUserInfo } from './account-api-helper';
import { GetUserResult } from '@models/business-models/api/account-models';
import { AddListOfBookModel } from '@models/business-models/api/book-models';

async function addNewBooksIntoUserCollection(bearerToken: string, userData: AddListOfBookModel): Promise<APIResponse> {
    const restClient = await createRestClient(await getCommonApiContext());

    const addBookToCollectionReq = restClient.requestBuilder()
        .addAcceptTypeHeader(ACCEPT.JSON)
        .addContentTypeHeader(CONTENT_TYPE.JSON)
        .addAuthorizationHeader(ApiAuthorizationType.BEARER_TOKEN, {
            token: bearerToken
        })
        .addData(userData)
        .build();

    return await restClient.post(API_BOOKSTORE_ENDPOINTS.BOOKS_ENDPOINT, <PlaywrightRestOptions>{
        data: addBookToCollectionReq.data,
        headers: addBookToCollectionReq.header
    });
}

async function deleteBookInUserCollection(bearerToken: string, isbn: string, userID: string): Promise<boolean> {
    const restClient = await createRestClient(await getCommonApiContext());

    const deleteBookInUserCollectionRequest = restClient.requestBuilder()
        .addAuthorizationHeader(ApiAuthorizationType.BEARER_TOKEN, {
            token: bearerToken
        })
        .build();

    console.log(`Deleting book with ISBN ${isbn} from user ${userID} collection`);

    const deleteBookInCollection = await restClient.delete(`${API_BOOKSTORE_ENDPOINTS.BOOKS_ENDPOINT}/${isbn}`, <PlaywrightRestOptions>{
        headers: deleteBookInUserCollectionRequest.header
    });

    console.log(deleteBookInCollection.status());

    expect(deleteBookInCollection.ok()).toBeTruthy();

    return true;
}

async function deleteAllBooksInUserCollection(bearerToken: string, userId: string) {
    const getUserInfoResponse = await getSpecificUserInfo(bearerToken, userId);
    const userInfo = await getUserInfoResponse.json() as GetUserResult;
    for(var i in userInfo.books)
    {
        deleteBookInUserCollection(bearerToken, userInfo.books[i].isbn, userId);
    }
}

export { addNewBooksIntoUserCollection, deleteBookInUserCollection, deleteAllBooksInUserCollection };