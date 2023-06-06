import { configureStore, combineReducers } from "@reduxjs/toolkit";
import professionsReducer from "./professions";
import qualitiesReducer from "./qualities";
import usersReducer from "./users";

const rootReducer = combineReducers({
    qualities: qualitiesReducer,
    professions: professionsReducer,
    users: usersReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
        devTools: process.env.NODE_ENV !== "production"
    });
}
