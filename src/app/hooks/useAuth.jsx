import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import usersService from "../service/users.service";
import { toast } from "react-toastify";
import localStorageService, { setTokens } from "../service/localStorage.service";
import { useHistory } from "react-router-dom";

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const httpAuth = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1/",
    params: {
        key: process.env.REACT_APP_FIREBASE_KEY
    }// после этот параметр запишется в url как ?key=...
});

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    async function createUser(data) {
        try {
            const { content } = await usersService.create(data);
            console.log(content);
            setCurrentUser(content);
        } catch (error) {
            errorCatcher(error);
        }
    }

    async function signIn({ email, password }) {
        const url = `accounts:signInWithPassword`;
        try {
            const { data } = await httpAuth.post(url, { email, password, returnSecureToken: true });
            setTokens(data);
            await getCurrentUserData();
        } catch (error) {
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (message === "INVALID_PASSWORD" || message === "EMAIL_NOT_FOUND") {
                    throw new Error("Email или пароль введены неверно");
                }
                if (message.includes("TOO_MANY_ATTEMPTS_TRY_LATER")) {
                    throw new Error("Слишком много попыток входа");
                }
            }
            errorCatcher(error);
        }
    }

    function logOut() {
        localStorageService.clearTokens();
        setCurrentUser(null);
        history.replace("/");
    }

    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    async function signUp({ email, password, ...rest }) {
        const url = `accounts:signUp`;
        try {
            const { data } = await httpAuth.post(url, { email, password, returnSecureToken: true });
            console.log(data);
            setTokens(data);
            await createUser({
                _id: data.localId,
                rate: randomInt(1, 5),
                completedMeetings: randomInt(0, 200),
                email,
                img: `https://avatars.dicebear.com/api/avataaars/${(
                    Math.random() + 1)
                    .toString(36)
                    .substring(7)}.svg`,
                ...rest
            });
        } catch (error) {
            errorCatcher(error);
            const { message, code } = error.response.data.error;
            console.log(message, code);
            if (code === 400) {
                const errorObject = {
                    email: "Пользователь с таким email уже зарегистрирован"
                };
                if (message === "EMAIL_EXISTS") {
                    throw errorObject;
                }
            }
            // throw new Error();
        }
    };

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }

    async function getCurrentUserData() {
        try {
            const { content } = await usersService.getCurrentUser();
            setCurrentUser(content);
        } catch (error) {
            errorCatcher(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (localStorageService.getUserId()) {
            getCurrentUserData();
        } else {
            setLoading(false);
        }
    }, []);
    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);
    return (
        <AuthContext.Provider value={{ signUp, signIn, currentUser, logOut, createUser }}>
            {!loading ? children : "loading..." }
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.oneOfType(
        [PropTypes.arrayOf(PropTypes.node), PropTypes.node]
    )
};

export default AuthProvider;
