import { createSlice } from "@reduxjs/toolkit";
import professionsService from "../service/profession.service";

const professionsSlice = createSlice({
    name: "professions",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        requested(state) {
            state.isLoading = true;
        },
        receved(state, action) {
            state.entities = action.payload;
            state.isLoading = false;
        },
        requestFiled(state, action) {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { actions, reducer: professionsReducer } = professionsSlice;

const { requested, receved, requestFiled } = actions;

export const loadProfessionsList = () => async (dispatch) => {
    dispatch(requested());
    try {
        const { content } = await professionsService.get();
        dispatch(receved(content));
    } catch (error) {
        const { message } = error;
        dispatch(requestFiled(message));
    }
};

export const getProfessionById = (id) => (state) => {
    if (state.professions.entities) {
        return state.professions.entities.find((prof) => prof._id === id);
    }
};

export const getProfessionsList = () => (state) => {
    return state.professions.entities;
};

export const getProfessionsLoading = () => (state) => {
    return state.professions.isLoading;
};

export default professionsReducer;
