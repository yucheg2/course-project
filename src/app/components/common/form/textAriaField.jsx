import React from "react";
import PropTypes from "prop-types";

const TextAriaFiald = ({ value, label, name, onChange, error, placeHolder }) => {
    const handleChange = ({ target }) => {
        onChange({ [target.name]: target.value });
    };
    return (
        <div className="mb-3">
            <label required htmlFor={name} className="form-label">{label}</label>
            <textarea
                value={value}
                className={"form-control " + (error ? "is-invalid" : "")}
                id={name}
                name={name}
                placeholder={placeHolder}
                onChange={handleChange}></textarea>
            {error &&
            <div className="invalid-feedback">
                {error}
            </div>}
        </div>);
};

TextAriaFiald.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
    placeHolder: PropTypes.string
};

export default TextAriaFiald;
