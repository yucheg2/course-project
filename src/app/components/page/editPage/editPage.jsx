import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import EditForm from "../../ui/editForm";
import API from "../../../API";

const EditPage = () => {
    const [professions, setProfessions] = useState();
    const [qualities, setQualities] = useState({});
    const [userData, setUserData] = useState();
    const { userId } = useParams();
    const { goBack } = useHistory();
    useEffect(() => {
        API.professions.fetchAll().then((data) => {
            setProfessions(data);
        });
        API.qualities.fetchAll().then((data) => {
            setQualities(data);
        });
        API.users.getById(userId).then((data) => {
            setUserData(data);
        });
    }, []);
    return (
        <div className="container mt-3">
            <button className="btn btn-primary" onClick={goBack}>
                <i className="bi bi-caret-left">
                    Назад
                </i>
            </button>
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-3">
                    {(userData && professions)
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
