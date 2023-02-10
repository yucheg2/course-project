import React from "react";
import PropTypes from "prop-types";

const SerchInput = ({ name, handleChange, serchedText }) => {
    return (
        <div className="my-3">
            <input
                type="text"
                name={name}
                id={name}
                className="form-control"
                value={serchedText}
                onChange={handleChange}
                placeholder="Поиск..."
            />
        </div>
    );
};

SerchInput.propTypes = {
    name: PropTypes.string,
    handleChange: PropTypes.func.isRequired,
    serchedText: PropTypes.string.isRequired
};
export default SerchInput;
