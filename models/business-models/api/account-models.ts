import { BookModel } from './book-models';

interface LoginViewModel {
    userName: string,
    password: string
}

interface TokenViewModel {
    token: string,
    expires: string,
    status:	string
    result:	string
}

interface RegisterViewModel {
    userName: string,
    password: string
}

interface CreateUserResult {
    userID: string,
    userName: string,
    books:	BookModel[]
}

interface GetUserResult {
    userId: string,
    userName: string,
    books:	BookModel[]
}

export { LoginViewModel, TokenViewModel, RegisterViewModel, CreateUserResult, GetUserResult };