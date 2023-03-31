
const TOKEN_KEY = "jwt_token";
const REFRESH_KEY = "refreshToken";
const EXPIRES_KEY = "jwt_expires";

export function setTokens({ refreshToken, expiresIn = 3600, idToken }) {
    const expiresDate = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem(TOKEN_KEY, idToken);
    localStorage.setItem(REFRESH_KEY, refreshToken);
    localStorage.setItem(EXPIRES_KEY, expiresDate);
}

export function getAccessToken() {
    return localStorage.getItem(TOKEN_KEY);
}

export function getRefreshToken() {
    return localStorage.getItem(REFRESH_KEY);
}

export function getExpires() {
    return localStorage.getItem(EXPIRES_KEY);
}

const localStorageService = {
    setTokens,
    getAccessToken,
    getExpires,
    getRefreshToken
};

export default localStorageService;
