import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { useQualities } from "../../../hooks/useQualities";

const QualitiesList = ({ qualities }) => {
    const { loading, getQualitieById } = useQualities();
    const getQualities = () => {
        return qualities.map((id) => {
            const qual = getQualitieById(id);
            return <Quality key={qual._id} {...qual} />;
        });
    };
    return <>
        {
            loading
                ? "loading..."
                : getQualities()
        }
    </>;
};

QualitiesList.propTypes = {
    qualities: PropTypes.array.isRequired
};

export default QualitiesList;
