import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import qualitiesServise from "../service/qualities.service";

const QualitiesContext = React.createContext();

const QualitiesProvider = ({ children }) => {
    const [qualities, setQualities] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getQualities();
    }, []);
    async function getQualities() {
        const { content } = await qualitiesServise.get();
        setQualities(content);
        setLoading(false);
    }
    function getQualitieById(id) {
        return qualities.find(q => q._id === id);
    }
    return (
        <QualitiesContext.Provider value={{ getQualitieById, qualities, loading }}>
            {children}
        </QualitiesContext.Provider>
    );
};

export const useQualities = () => {
    return useContext(QualitiesContext);
};

export default QualitiesProvider;

QualitiesProvider.propTypes = {
    children: PropTypes.oneOfType()
};
