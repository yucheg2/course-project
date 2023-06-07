import { createSlice } from "@reduxjs/toolkit";
import authService from "../service/auth.serice";
import localStorageService from "../service/localStorage.service";
import usersService from "../service/users.service";
import generateAuthError from "../utils/generateAuthError";
import history from "../utils/history";
import randomInt from "../utils/randomInt";

const initialState = localStorageService.getAccessToken()
    ? {
        entities: null,
        isLoading: true,
        error: null,
        auth: {
            userId: localStorageService.getUserId(),
            isLoggedIn: true
        },
        dataLoaded: false
    }
    : {
        entities: null,
        isLoading: false,
        error: null,
        auth: {
            userId: null,
            isLoggedIn: false
        },
        dataLoaded: false
    };

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        requested(state) {
            state.isLoading = true;
        },
        resived(state, action) {
            state.entities = action.payload;
            state.isLoading = false;
            state.dataLoaded = true;
        },
        requestFailed(state, action) {
            state.error = action.payload;
            state.isLoading = false;
        },
        authReqestSuccess(state, action) {
            state.auth.isLoggedIn = true;
            state.auth.userId = action.payload;
        },
        authReqestFaild(state, action) {
            state.auth.AuthError = action.payload;
        },
        userCreated(state, action) {
            if (state.entities === null) {
                state.entities = [];
            }
            state.entities.push(action.payload);
        },
        userLoggedOut(state) {
            state.entities = null;
            state.auth = {};
            state.dataLoaded = false;
        },
        userEditRequestSuccess(state, action) {
            const currentUserInd = state.entities.findIndex(user => user._id === state.auth.userId);
            state.entities[currentUserInd] = {
                ...state.entities[currentUserInd],
                ...action.payload
            };
        },
        authRequested(state) {
            state.auth.AuthError = null;
        }
    }
});

const { reducer: usersReducer, actions } = usersSlice;

const {
    requested,
    resived,
    requestFailed,
    authReqestSuccess,
    authReqestFaild,
    userCreated,
    userLoggedOut,
    userEditRequestSuccess,
    authRequested
} = actions;

export const loadUsersList = () => async (dispatch) => {
    dispatch(requested());
    try {
        const { content } = await usersService.get();
        dispatch(resived(content));
    } catch (error) {
        dispatch(requestFailed(error.message));
    }
};

export const getAuthError = () => (state) => {
    return state.users.auth.AuthError;
};
export const getDataStatus = () => (state) => {
    return state.users.dataLoaded;
};
export const getUserById = (id) => (state) => {
    if (state.users.entities) {
        return state.users.entities.find((user) => user._id === id);
    }
};
export const getCurrentUserId = () => (state) => {
    if (state.users.auth.userId) {
        return state.users.auth.userId;
    }
};
export const getIsloading = () => (state) => {
    return state.users.isLoading;
};
export const getUsersList = () => (state) => {
    return state.users.entities;
};
export const getIsLoggedIn = () => (state) => {
    return state.users.auth.isLoggedIn;
};
export const getCurrentUserData = () => (state) => {
    if (state.users.entities) {
        return state.users.entities.find(user => {
            return user._id === state.users.auth.userId;
        });
    }
};

const createUser = (payload) => async (dispatch) => {
    dispatch({ type: "users/userCreateRequested" });
    try {
        const { content } = await usersService.create(payload);
        dispatch(userCreated(content));
        history.push("/users");
    } catch (error) {
        dispatch({ type: "users/userCreateFaild", payload: error.message });
    }
};

export const logOut = () => (dispatch) => {
    dispatch(userLoggedOut());
    localStorageService.clearTokens();
    history.replace("/");
};

export const logIn = ({ data, redirect }) => async (dispatch) => {
    dispatch(authRequested());
    const { email, password } = data;
    try {
        const data = await authService.login({ email, password });
        localStorageService.setTokens(data);
        dispatch(authReqestSuccess(data.localId));
        history.push(redirect);
    } catch (error) {
        const { code, message } = error.response.data.error;
        if (code === 400) {
            const errorMessage = generateAuthError(message);
            dispatch(authReqestFaild(errorMessage));
        } else {
            dispatch(authReqestFaild(error.message));
        }
    }
};

export const editUser = (data) => async (dispatch) => {
    dispatch({ type: "users/editUserRequested" });
    try {
        const { content } = await usersService.edit(data);
        dispatch(userEditRequestSuccess(content));
        history.push("/users/" + data._id);
    } catch (error) {
        dispatch({ type: "users/editUserFaild", payload: error.message });
    }
};

export const signUp = ({ email, password, ...rest }) => async (dispatch) => {
    dispatch(authRequested());
    try {
        const data = await authService.register({ email, password });
        localStorageService.setTokens(data);
        dispatch(authReqestSuccess(data.localId));
        dispatch(createUser({
            _id: data.localId,
            rate: randomInt(1, 5),
            completedMeetings: randomInt(0, 200),
            email,
            img: `https://avatars.dicebear.com/api/avataaars/${(
                Math.random() + 1)
                .toString(36)
                .substring(7)}.svg`,
            ...rest
        }));
    } catch (error) {
        dispatch(authReqestFaild(error.message));
    }
};

export default usersReducer;
