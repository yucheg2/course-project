import PropTypes from "prop-types";
import { useProfessons } from "../../hooks/useProfessions";
import React from "react";

const Profession = ({ id }) => {
    const { loading, getProfessionById } = useProfessons();
    const profession = getProfessionById(id);

    return (
        loading
            ? "loading..."
            : <p>{profession.name}</p>
    );
};

export default Profession;

Profession.propTypes = {
    id: PropTypes.string
};
