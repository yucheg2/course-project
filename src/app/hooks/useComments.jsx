import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useAuth } from "./useAuth";
import { nanoid } from "nanoid";
import commentServise from "../service/comment.service";

const CommentContext = React.createContext();

const CommentProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(null);
    const { userId } = useParams();
    const { currentUser } = useAuth();

    useEffect(() => {
        getComments();
    }, [userId]);
    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);
    async function createComment(data) {
        const comment = {
            ...data,
            _id: nanoid(),
            pageId: userId,
            created_at: Date.now(),
            userId: currentUser._id
        };
        try {
            const { content } = await commentServise.createComment(comment);
            setComments(p => [...p, content]);
        } catch (error) {
            errorCatcher(error);
        }
    }
    async function removeComment(id) {
        try {
            const { content } = await commentServise.deleteComment(id);
            if (content === null) {
                setComments(p => p.filter(c => c._id !== id));
            }
        } catch (error) {
            errorCatcher(error);
        }
    }
    async function getComments() {
        try {
            const { content } = await commentServise.getComments(userId);
            setComments(content);
        } catch (error) {
            errorCatcher(error);
        } finally {
            setLoading(false);
        }
    }
    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }
    return (
        <CommentContext.Provider value={{ comments, loading, removeComment, createComment }}>
            {children}
        </CommentContext.Provider>
    );
};

export const useComments = () => {
    return useContext(CommentContext);
};

export default CommentProvider;

CommentProvider.propTypes = {
    children: PropTypes.oneOfType(
        [PropTypes.arrayOf(PropTypes.node), PropTypes.node]
    )
};
