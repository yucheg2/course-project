import React from "react";
import PropTypes from "prop-types";
import { useProfessons } from "../../../hooks/useProfessions";
import { useAuth } from "../../../hooks/useAuth";

const UserCard = ({ user, onClick }) => {
    const { currentUser } = useAuth();
    const { getProfessionById } = useProfessons();
    const prof = getProfessionById(user.profession);
    return (
        <div className="card mb-3">
            <div className="card-body">
                {
                    currentUser._id === user._id &&
                <button onClick={onClick} className="position-absolute top-0 end-0 btn btn-light btn-sm">
                    <i className="bi bi-gear"></i>
                </button>
                }
                <div className="d-flex flex-column align-items-center text-center position-relative">
                    <img
                        src={user.img}
                        className="rounded-circle"
                        width="150"
                    />
                    <div className="mt-3">
                        <h4>{user.name}</h4>
                        {prof && <p className="text-secondary mb-1">{prof.name}</p>}
                        <div className="text-muted">
                            <i className="bi bi-caret-down-fill text-primary" role="button"></i>
                            <i className="bi bi-caret-up text-secondary" role="button"></i>
                            <span className="ms-2">{user.rate}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

UserCard.propTypes = {
    onClick: PropTypes.func,
    user: PropTypes.object
};

export default UserCard;
