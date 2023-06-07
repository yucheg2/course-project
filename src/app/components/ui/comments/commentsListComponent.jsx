import React, { useEffect } from "react";
import PropTypes from "prop-types";
// import api from "../../../API/index";
import { orderBy } from "lodash";
import CommentsList from "./commentsList";
import AddCommentForm from "./addCommentForm";
// import { useComments } from "../../../hooks/useComments";
import { useDispatch, useSelector } from "react-redux";
import { createComment, getCommentsList, getCommentsLoading, loadCommentsList, removeComment } from "../../../store/comments";
import { useParams } from "react-router-dom";

const CommentsListComponent = () => {
    const { userId } = useParams();

    const dispatch = useDispatch();
    const isLoading = useSelector(getCommentsLoading());
    const comments = useSelector(getCommentsList());

    useEffect(() => {
        dispatch(loadCommentsList(userId));
    }, [userId]);

    // const { createComment, removeComment } = useComments();

    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);
    const onRemove = (id) => {
        dispatch(removeComment(id));
        // setComments(p => p.filter((c) => c._id !== id));
        // api.comments.remove(id);
    };
    const handleSubmit = (data) => {
        dispatch(createComment(data, userId));
        // api.comments.add({ ...data, pageId: userID })
        //     .then((data) => {
        //         setComments(p => [...p, data]);
        //     });
    };
    return (
        <>
            <div className="card mb-2">
                <div className="card-body ">
                    <AddCommentForm onSubmit={handleSubmit}/>
                </div>
            </div>
            <div className="card mb-3">
                <div className="card-body ">
                    <h2>Comments</h2>
                    <hr />
                    {!isLoading
                        ? <CommentsList comments={sortedComments} onRemove={onRemove}/>
                        : "loading..."}
                </div>
            </div>
        </>);
};

CommentsListComponent.propTypes = {
    userID: PropTypes.string
};

export default CommentsListComponent;
