export interface AuthResponseData {
    user: {
        email: string,
        userId: string,
        username: string
    };
    accessToken: string,
    refreshToken: string
}
