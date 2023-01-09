import React from "react";
import PropTypes from "prop-types";

const Qualitie = ({ color, name }) => {
    return <span className={`badge m-1 text-bg-${color}`}>{name}</span>;
};

export default Qualitie;

Qualitie.propTypes = {
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};
