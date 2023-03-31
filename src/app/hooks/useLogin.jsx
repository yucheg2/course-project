import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import axios from "axios";
import { setTokens } from "../service/localStorage.service";
import { useHistory } from "react-router-dom";

const LoginContext = React.createContext();

const httpLogin = axios.create();

const LoginProvider = ({ children }) => {
    const { push } = useHistory();
    const [error, setError] = useState(null);

    async function signIn({ email, password }) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`;
        try {
            const { data } = await httpLogin.post(url, { email, password, returnSecureToken: true });
            setTokens(data);
            push("/");
        } catch (error) {
            const { code, message } = error.response.data.error;
            if (code === 400) {
                const obj = {};
                switch (message) {
                case "EMAIL_NOT_FOUND": {
                    obj.email = "Пользователя с таким email нет";
                    throw obj; }
                case "INVALID_PASSWORD": {
                    obj.password = "Пароль неправильный";
                    throw obj; }
                default:
                    break;
                }
            }
            errorCatcher(error);
        }
    }

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }
    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);
    return (
        <LoginContext.Provider value={{ signIn }}>
            {children}
        </LoginContext.Provider>
    );
};

export const useLogin = () => useContext(LoginContext);

export default LoginProvider;

LoginProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
