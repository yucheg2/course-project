import React from "react";
import PropTypes from "prop-types";

const CheckBoxField = ({ name, value, onChange, children, error }) => {
    const handleChange = () => {
        onChange({ [name]: !value });
    };

    const getLabelClasses = () => {
        return "form-check-input " + (error ? "is-invalid" : "");
    };

    return (
        <div className="form-check mb-4">
            <input
                className={getLabelClasses()}
                type="checkbox"
                value=""
                checked={value}
                id={name}
                onChange={handleChange}
            />
            <label className="form-check-label " htmlFor="flexCheckDefault">
                {children}
            </label>
            {error &&
            <div id="invalidCheck3Feedback" className="invalid-feedback">
                {error}
            </div>}
        </div>
    );
};

CheckBoxField.propTypes = {
    error: PropTypes.string,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.bool.isRequired,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default CheckBoxField;
