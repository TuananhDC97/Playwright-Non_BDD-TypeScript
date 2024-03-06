import { API_BOOKSTORE_ENDPOINTS } from '@config/endpoints';
import { createRestClient, PlaywrightRestOptions } from '@core/api/rest-client';
import { CreateUserResult, LoginViewModel, RegisterViewModel } from '@models/business-models/api/account-models';
import { APIResponse, expect } from '@playwright/test';
import { getCommonApiContext } from './api-context-helper';
import { ACCEPT, ApiAuthorizationType, CONTENT_TYPE } from '@constants/api-constants';
import { ReplacePlaceHolderValueInObjbect } from '@core/utils/placeholder-helper';

async function addNewUser(userData: RegisterViewModel): Promise<CreateUserResult> {
    const restClient = await createRestClient(await getCommonApiContext());
    userData = ReplacePlaceHolderValueInObjbect(userData) as RegisterViewModel;

    const addNewUserReq = restClient.requestBuilder()
        .addAcceptTypeHeader(ACCEPT.JSON)
        .addContentTypeHeader(CONTENT_TYPE.JSON)
        .addData(userData)
        .build();

    const createUserResponse = await restClient.post(API_BOOKSTORE_ENDPOINTS.USER_ENDPOINT, <PlaywrightRestOptions>{
        data: addNewUserReq.data,
        headers: addNewUserReq.header
    });

    console.log(createUserResponse.status());
    console.log(await createUserResponse.json());
    expect(createUserResponse.ok()).toBeTruthy();
    
    const createdUserInfo = await createUserResponse.json() as CreateUserResult;
    return createdUserInfo;
}

async function generateToken(userData: LoginViewModel): Promise<APIResponse> {
    const restClient = await createRestClient(await getCommonApiContext());

    const generateTokenRequest = restClient.requestBuilder()
        .addAcceptTypeHeader(ACCEPT.JSON)
        .addContentTypeHeader(CONTENT_TYPE.JSON)
        .addData(userData)
        .build();

    return await restClient.post(API_BOOKSTORE_ENDPOINTS.GENERATE_TOKEN_ENDPOINT, <PlaywrightRestOptions>{
        data: generateTokenRequest.data,
        headers: generateTokenRequest.header
    });
}

async function getSpecificUserInfo(bearerToken: string, userId: string): Promise<APIResponse> {
    const restClient = await createRestClient(await getCommonApiContext());

    const getUserInfoRequest = restClient.requestBuilder()
        .addAuthorizationHeader(ApiAuthorizationType.BEARER_TOKEN, {
            token: bearerToken
        })
        .build();

    return await restClient.get(`${API_BOOKSTORE_ENDPOINTS.USER_ENDPOINT}/${userId}`, <PlaywrightRestOptions>{
        headers: getUserInfoRequest.header,
        // maxRedirects: 2
    });
}

async function deleteUser(bearerToken: string, userId: string): Promise<boolean> {
    const restClient = await createRestClient(await getCommonApiContext());

    const deleteUserRequest = restClient.requestBuilder()
        .addAcceptTypeHeader(ACCEPT.JSON)
        .addContentTypeHeader(CONTENT_TYPE.JSON)
        .addAuthorizationHeader(ApiAuthorizationType.BEARER_TOKEN, {
            token: bearerToken
        })
        .build();

    console.log(`Deleting user ${userId}`);

    const deleteUserRequestResult = await restClient.delete(`${API_BOOKSTORE_ENDPOINTS.USER_ENDPOINT}/${userId}`,
        <PlaywrightRestOptions>{
            headers: deleteUserRequest.header
        });

    return deleteUserRequestResult.ok();
}

export { addNewUser, generateToken, getSpecificUserInfo, deleteUser };