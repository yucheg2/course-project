import React from "react";
import PropTypes from "prop-types";

const SelectField = ({ label, value, onChange, defaultOption, options, error, name }) => {
    const getSelectClass = () => {
        return "form-select " + (error ? "is-invalid" : "");
    };
    const handleChange = ({ target }) => {
        onChange({ [target.name]: target.value });
    };

    const optionArray = !Array.isArray(options) && typeof (options) === "object"
        ? Object.keys(options).map(optionName => ({ name: options[optionName].name, _id: options[optionName]._id }))
        : options;

    return (<div className="mb-4">
        <label htmlFor={name} className="form-label">
            {label}
        </label>
        <select
            className={getSelectClass()}
            id={name}
            value={value}
            name={name}
            onChange={handleChange}
        >
            <option disabled value="">{defaultOption}</option>
            {options && optionArray.map((option) => {
                return (
                    <option
                        value={option._id}
                        key={option._id}
                    >
                        {option.name}
                    </option>
                );
            })}
        </select>
        {error &&
        <div className="invalid-feedback">
            {error}
        </div>
        }
    </div>);
};

SelectField.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    defaultOption: PropTypes.string.isRequired,
    options: PropTypes.oneOfType(PropTypes.array, PropTypes.object),
    error: PropTypes.string
};

export default SelectField;
