import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import qualitiesServise from "../service/qualities.service";
import { toast } from "react-toastify";

const QualitiesContext = React.createContext();

const QualitiesProvider = ({ children }) => {
    const [qualities, setQualities] = useState();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getQualities();
    }, []);
    async function getQualities() {
        try {
            const { content } = await qualitiesServise.get();
            setQualities(content);
            setLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }
    function getQualitieById(id) {
        return qualities.find(q => q._id === id);
    }

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }

    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);
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
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
