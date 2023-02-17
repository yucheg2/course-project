import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditForm from "../../ui/editForm";
import API from "../../../API";

const EditPage = () => {
    const [professions, setProfessions] = useState();
    const [qualities, setQualities] = useState({});
    const [userData, setUserData] = useState();
    const { userId } = useParams();
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
        </div>);
};

export default EditPage;
