import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import professionsService from "../service/profession.service";
import { toast } from "react-toastify";

const ProfessionContext = React.createContext();

const ProfessionProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [professions, setProfessions] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        getProfessions();
    }, []);
    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);
    async function getProfessions() {
        try {
            const { content } = await professionsService.get();
            setProfessions(content);
            setLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }
    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }
    function getProfessionById(id) {
        return professions.find(p => p._id === id);
    }
    return (
        <ProfessionContext.Provider value={{ professions, loading, getProfessionById }}>
            {
                children
            }
        </ProfessionContext.Provider>
    );
};

export const useProfessons = () => {
    return useContext(ProfessionContext);
};

export default ProfessionProvider;

ProfessionProvider.propTypes = {
    children: PropTypes.oneOfType(
        [PropTypes.arrayOf(PropTypes.node), PropTypes.node]
    )
};
