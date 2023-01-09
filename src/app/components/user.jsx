import React from "react";
import Qualitie from "./qualitie";
import Bookmark from "./bookmark";
import PropTypes from "prop-types";

const User = ({
    name,
    qualities,
    profession,
    completedMeetings,
    rate,
    onDelete,
    id
}) => {
    return (
        <tr>
            <td>{name}</td>
            <td>
                {qualities.map((qualiti) => {
                    return (
                        <Qualitie
                            name={qualiti.name}
                            key={qualiti._id}
                            color={qualiti.color}
                        />
                    );
                })}
            </td>
            <td>{profession}</td>
            <td>{completedMeetings}</td>
            <td>{`${rate}/5`}</td>
            <td>
                <Bookmark />
            </td>
            <td>
                <button onClick={() => onDelete(id)} className="btn btn-danger">
                    delete
                </button>
            </td>
        </tr>
    );
};

export default User;

User.propTypes = {
    name: PropTypes.string.isRequired,
    qualities: PropTypes.array.isRequired,
    profession: PropTypes.string.isRequired,
    completedMeetings: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired
};
