export interface ApiHeader {
    [headers: string | number | symbol]: unknown;
}

export interface ApiRequest {
    header?: ApiHeader,
    data?: unknown
}

export class ApiRequestBuilder {
    private readonly _apiRequest: ApiRequest;

    constructor () {
        this._apiRequest = {};
        this._apiRequest.header = {};
    }

    build () {
        return this._apiRequest;
    }

    addContentTypeHeader (contentType: string) : ApiRequestBuilder {
        this._apiRequest.header['Content-Type'] = contentType;
        return this;
    }

    addAcceptTypeHeader (acceptType: string) : ApiRequestBuilder {
        this._apiRequest.header['Accept'] = acceptType;
        return this;
    }

    addAuthorizationHeader (authorizationType: string, options?: {
        token?: string, username?: string, password?: string
    }) {
        switch (authorizationType) {
        case 'BEARER_TOKEN':
            this.addBearerTokenAuthorizationHeader(options.token);
            break;
        default:
            break;
        }
        return this;
    }

    addBearerTokenAuthorizationHeader (token: string) {
        this._apiRequest.header['Authorization'] = `Bearer ${token}`;
        return this;
    }

    addAdditionalHeaders (additionalHeaders: [
        headerKey: string | number | symbol, 
        headerValue: string | number | symbol
    ]) : ApiRequestBuilder {
        additionalHeaders.forEach((key, value) => {
            this._apiRequest.header[key] = value;
        });
        return this;
    }

    addData (data: unknown) : ApiRequestBuilder {
        this._apiRequest.data = data;
        return this;
    }
}