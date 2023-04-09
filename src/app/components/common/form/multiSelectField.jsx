import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultiSelectField = ({ options, onChange, name, label, defaultValue }) => {
    const optionArray = !Array.isArray(options) && typeof (options) === "object"
        ? Object.keys(options).map(optionName => ({ label: options[optionName].name, value: options[optionName]._id }))
        : options.map(o => ({ label: o.name, value: o._id }));

    const handleChange = (e) => {
        onChange({ [name]: e });
    };
    return (
        <div className="mb-4">
            <label className="form-label">
                {label}
            </label>
            <Select
                closeMenuOnSelect={false}
                defaultValue={defaultValue}
                isMulti
                name={name}
                options={optionArray}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleChange}
            />
        </div>);
};

MultiSelectField.propTypes = {
    defaultValue: PropTypes.array,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.oneOfType(PropTypes.array, PropTypes.object)
};

export default MultiSelectField;
