
const TOKEN_KEY = "jwt_token";
const REFRESH_KEY = "refreshToken";
const EXPIRES_KEY = "jwt_expires";
const USERID_KEY = "user-local-id";

export function setTokens({ localId, refreshToken, expiresIn = 3600, idToken }) {
    const expiresDate = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem(USERID_KEY, localId);
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

export function clearTokens() {
    localStorage.removeItem(USERID_KEY);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(EXPIRES_KEY);
}

export function getUserId() {
    return localStorage.getItem(USERID_KEY);
}

const localStorageService = {
    setTokens,
    getAccessToken,
    getExpires,
    getRefreshToken,
    getUserId,
    clearTokens
};

export default localStorageService;
