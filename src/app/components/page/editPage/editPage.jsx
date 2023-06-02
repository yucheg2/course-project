import React from "react";
import { useHistory, useParams } from "react-router-dom";
import EditForm from "../../ui/editForm";
// import { useProfessons } from "../../../hooks/useProfessions";
// import { useQualities } from "../../../hooks/useQualities";
import { useUsers } from "../../../hooks/useUsers";
import { useSelector } from "react-redux";
import { getQualitiesList, getQualitiesLoading } from "../../../store/qualities";
import { getProfessionsList, getProfessionsLoading } from "../../../store/professions";

const EditPage = () => {
    const { userId } = useParams();

    // const { professions } = useProfessons();
    const professions = useSelector(getProfessionsList());
    const professionsLoading = useSelector(getProfessionsLoading());
    const qualities = useSelector(getQualitiesList());
    const qualitiesLoading = useSelector(getQualitiesLoading());
    // const { qualities } = useQualities();
    const { getUserById } = useUsers();
    const userData = getUserById(userId);
    const { goBack } = useHistory();
    return (
        <div className="container mt-3">
            <button className="btn btn-primary" onClick={goBack}>
                <i className="bi bi-caret-left">
                    Назад
                </i>
            </button>
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-3">
                    {(userData && !professionsLoading && !qualitiesLoading)
                        ? <EditForm
                            userData={userData}
                            professions={professions}
                            qualities={qualities}/>
                        : "loading..."
                    }
                </div>
            </div>
        </div>
    );
};

export default EditPage;
