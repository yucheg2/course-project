import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import commentService from "../service/comment.service";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: [],
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
        },
        createRequestSuccess(state, action) {
            state.entities.push(action.payload);
        },
        deleteRequestSuccess(state, action) {
            state.entities = state.entities.filter(c => c._id !== action.payload);
        }
    }
});

const { actions, reducer: commentsReducer } = commentsSlice;

const {
    requested,
    receved,
    requestFiled,
    createRequestSuccess,
    deleteRequestSuccess
} = actions;

export const loadCommentsList = (id) => async (dispatch) => {
    dispatch(requested());
    try {
        const { content } = await commentService.getComments(id);
        dispatch(receved(content));
    } catch (error) {
        const { message } = error;
        dispatch(requestFiled(message));
    }
};

export const createComment = (data, userId) => async (dispatch, getState) => {
    dispatch({ type: "comments/createRequested" });
    const comment = {
        ...data,
        _id: nanoid(),
        pageId: userId,
        created_at: Date.now(),
        userId: getState().users.auth.userId
    };
    try {
        const { content } = await commentService.createComment(comment);
        dispatch(createRequestSuccess(content));
    } catch (error) {
        dispatch({ type: "comments/createRequestFaild", payload: error.message });
    }
};

export const removeComment = (id) => async (dispatch) => {
    dispatch({ type: "comments/deleteRequested" });
    try {
        const { content } = await commentService.deleteComment(id);
        if (content === null) {
            dispatch(deleteRequestSuccess(id));
        }
    } catch (error) {
        dispatch({ type: "comments/deleteRequestFaild", payload: error.message });
    }
};

export const getCommentsList = () => (state) => {
    return state.comments.entities;
};
export const getCommentsLoading = () => (state) => {
    return state.comments.isLoading;
};

export default commentsReducer;
