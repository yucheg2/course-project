import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../API/index";
import { orderBy } from "lodash";
import CommentsList from "./commentsList";
import AddCommentForm from "./addCommentForm";

const CommentsListComponent = ({ userID }) => {
    const [comments, setComments] = useState();
    useEffect(() => {
        api.comments.fetchCommentsForUser(userID).then((data) => {
            setComments(data);
        });
    }, []);
    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);
    const onRemove = (id) => {
        setComments(p => p.filter((c) => c._id !== id));
        api.comments.remove(id);
    };
    console.log(comments);
    const handleSubmit = (data) => {
        data.pageId = userID;
        api.comments.add(data).then((data) => {
            setComments(p => [...p, data]);
        });
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
