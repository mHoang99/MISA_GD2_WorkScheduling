import jwtDecode from "jwt-decode";

/**
 * Model cho người dùng
 */
export class User {
    constructor(
        public email: string,
        public id: string,
        public username: string,
        public employeeId: string,
        public avatar: string,
        private _accessToken: string,
        private _accessTokenExpDate: Date,
        private _refreshToken: string,
        private _refreshTokenExpDate: Date
    ) {}

    get accessToken() {
        //kiểm tra hạn
        if(!this._accessTokenExpDate || new Date() > this._accessTokenExpDate) {
            return null;
        }
        return this._accessToken;
    }

    get refreshToken() {
        //kiểm tra hạn
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

    get role() {
        //Lấy role bằng cách decode token
        let decodedToken = jwtDecode(this._accessToken);
        return decodedToken['role'];
    }
}