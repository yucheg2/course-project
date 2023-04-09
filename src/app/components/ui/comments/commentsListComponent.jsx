import React from "react";
import PropTypes from "prop-types";
// import api from "../../../API/index";
import { orderBy } from "lodash";
import CommentsList from "./commentsList";
import AddCommentForm from "./addCommentForm";
import { useComments } from "../../../hooks/useComments";

const CommentsListComponent = () => {
    const { createComment, comments, removeComment } = useComments();
    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);
    const onRemove = (id) => {
        removeComment(id);
        // setComments(p => p.filter((c) => c._id !== id));
        // api.comments.remove(id);
    };
    const handleSubmit = (data) => {
        createComment(data);
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
                    {comments
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
