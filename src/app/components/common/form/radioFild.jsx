import React from "react";
import PropTypes from "prop-types";

const RadioField = ({ options, name, onChange, value, label }) => {
    const handleChange = ({ target }) => {
        onChange({ [target.name]: target.value });
    };
    return (
        <div className="mb-4">
            <label className="form-label">
                {label}
            </label>
            <div>
                { options.map(option =>
                    (
                        <div className="form-check form-check-inline" key={option.value}>
                            <input
                                className="form-check-input"
                                type="radio"
                                name={name}
                                id={option.name + "_" + option.value}
                                value={option.value}
                                checked={option.value === value}
                                onChange= {handleChange}
                            />
                            <label
                                className="form-check-label"
                                htmlFor={option.name + "_" + option.value}
                            >
                                {option.name}
                            </label>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

RadioField.propTypes = {
    options: PropTypes.oneOfType(PropTypes.object, PropTypes.array),
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string
};

export default RadioField;
