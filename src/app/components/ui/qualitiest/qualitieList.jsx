import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
// import { useQualities } from "../../../hooks/useQualities";
import { getQualitiesLoading, getQualititesById, loadQualitiesList } from "../../../store/qualities";
import { useDispatch, useSelector } from "react-redux";
// import { getQualitiesList } from "../../../store/qualities";

const QualitiesList = ({ qualities }) => {
    // const { loading, getQualitieById } = useQualities();
    const dispatch = useDispatch();
    const loading = useSelector(getQualitiesLoading());
    const qualitiesList = useSelector(getQualititesById(qualities));

    useEffect(() => {
        dispatch(loadQualitiesList());
    }, []);

    // const getQualities = () => {
    //     return qualities.map((id) => {
    //         const qual = getQualitieById(id);
    //         return <Quality key={qual._id} {...qual} />;
    //     });
    // };
    return <>
        {
            loading
                ? "loading..."
                : qualitiesList.map((q) => {
                    return <Quality key={q._id} {...q} />;
                })
        }
    </>;
};

QualitiesList.propTypes = {
    qualities: PropTypes.array.isRequired
};

export default QualitiesList;
