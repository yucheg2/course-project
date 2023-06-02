import PropTypes from "prop-types";
// import { useProfessons } from "../../hooks/useProfessions";
import React from "react";
import { useSelector } from "react-redux";
import { getProfessionById, getProfessionsLoading } from "../../store/professions";

const Profession = ({ id }) => {
    // const { loading, getProfessionById } = useProfessons();
    // const profession = getProfessionById(id);
    const loading = useSelector(getProfessionsLoading());
    const profession = useSelector(getProfessionById(id));
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
