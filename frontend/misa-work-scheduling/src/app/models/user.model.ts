export class User {
    constructor(
        public email: string,
        public id: string,
        public username: string,
        private _accessToken: string,
        private _accessTokenExpDate: Date,
        private _refreshToken: string,
        private _refreshTokenExpDate: Date
    ) {}

    get accessToken() {
        if(!this._accessTokenExpDate || new Date() > this._accessTokenExpDate) {
            return null;
        }
        return this._accessToken;
    }

    get refreshToken() {
        if(!this._refreshTokenExpDate || new Date() > this._refreshTokenExpDate) {
            return null;
        }
        return this._refreshToken;
    }

    get accessTokenExpDate() {
        return this._accessTokenExpDate;
    }    
    
    get refreshTokenExpDate() {
        return this._refreshTokenExpDate;
    }
}