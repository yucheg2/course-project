import React from "react";
import PropTypes from "prop-types";
const BookMark = ({ status, ...rest }) => {
    return (
        <button {...rest}>
            <i
                className={
                    "bi bi-arrow-through-heart" +
                    (status === true ? "-fill" : "")
                }
            ></i>
        </button>
    );
};
BookMark.propTypes = {
    status: PropTypes.bool
};

export default BookMark;
