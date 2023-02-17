import React, { useState } from "react";
import PropTypes from "prop-types";

const TextField = ({ label, type, name, value, onChange, error }) => {
    const [ShowPassword, setShowPassword] = useState(false);
    const handleChange = ({ target }) => {
        onChange({ [target.name]: target.value });
    };
    const getInputClasses = () => {
        return "form-control " + (error ? "is-invalid" : "");
    };
    const toggleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };
    return (
        <div className="mb-4">
            <label htmlFor={name}>{label}</label>
            <div className="input-group has-validation">
                <input
                    type={ShowPassword ? "text" : type}
                    id={name}
                    value={value}
                    onChange={handleChange}
                    name={name}
                    className={getInputClasses()}
                />
                {type === "password" && (
                    <button
                        className="btn btn-outline-secondary"
                        onClick={toggleShowPassword}
                        type="button"
                    >
                        <i className={"bi bi-eye" + (ShowPassword ? "-slash" : "")}></i>
                    </button>)
                }
                { error && <div className="invalid-feedback">{error}</div> }
            </div>
        </div>);
};

TextField.defaultProps = {
    type: "text"
};

TextField.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string
};

export default TextField;
