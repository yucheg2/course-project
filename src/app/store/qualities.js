import { createSlice } from "@reduxjs/toolkit";
import qualitiesServise from "../service/qualities.service";

const qualotiesSlice = createSlice({
    name: "qualities",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        requested(state) {
            state.isLoading = true;
        },
        resived(state, action) {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        requestFailed(state, action) {
            state.error = action.payload;
            state.isLoading = false;
        }
    }

});

const { reducer: qualitiesReducer, actions } = qualotiesSlice;

const {
    requested,
    resived,
    requestFailed
} = actions;

function isOutDated(date) {
    return (Date.now() - date > 1000 * 60 * 10);
}

export const loadQualitiesList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().qualities;
    if (isOutDated(lastFetch)) {
        dispatch(requested());
        try {
            const { content } = await qualitiesServise.get();
            dispatch(resived(content));
        } catch (error) {
            const { message } = error.response.data;
            requestFailed(message);
        }
    }
};

export const getQualitiesList = () => (state) => {
    return state.qualities.entities;
};

export const getQualitiesLoading = () => (state) => {
    return state.qualities.isLoading;
};

export const getQualititesById = (idArray) => (state) => {
    if (state.qualities.entities) {
        return idArray.map((id) => {
            return state.qualities.entities.find(
                (qual) => qual._id === id
            );
        });
    }
    return [];
};

export default qualitiesReducer;
