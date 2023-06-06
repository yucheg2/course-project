import React from "react";
import PropTypes from "prop-types";
import getDate from "../../../utils/getDate";
// import { useUsers } from "../../../hooks/useUsers";
// import { useAuth } from "../../../hooks/useAuth";
import { useSelector } from "react-redux";
import { getUserById, getCurrentUserId } from "../../../store/users";

const Comment = ({
    content,
    created_at: created,
    userId,
    onRemove,
    _id
}) => {
    // const { getUserById } = useUsers();
    const user = useSelector(getUserById(userId));
    // const { currentUser } = useAuth();

    const currentUserId = useSelector(getCurrentUserId());

    return (
        <div className="bg-light card-body  mb-3">
            <div className="row">
                {!user
                    ? "loading..."
                    : <div className="col">
                        <div className="d-flex flex-start ">
                            <img
                                src={user.img}
                                className="rounded-circle shadow-1-strong me-3"
                                alt="avatar"
                                width="65"
                                height="65"
                            />
                            <div className="flex-grow-1 flex-shrink-1">
                                <div className="mb-4">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <p className="mb-1 ">
                                            {user.name }
                                            <span className="small">
                                                {getDate(created)}
                                            </span>
                                        </p>
                                        { currentUserId === userId &&
                                        <button onClick={() => { onRemove(_id); }} className="btn btn-sm text-primary d-flex align-items-center">
                                            <i className="bi bi-x-lg"></i>
                                        </button>
                                        }
                                    </div>
                                    <p className="small mb-0">{content}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>);
};

Comment.propTypes = {
    userId: PropTypes.string,
    created_at: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    content: PropTypes.string,
    onRemove: PropTypes.func,
    _id: PropTypes.string
};

export default Comment;
