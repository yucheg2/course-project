import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import api from "../../../API/index";
import QualitiesList from "../../ui/qualitiest/qualitieList";

const UserPage = () => {
    const [user, setUser] = useState();
    const { userId } = useParams();
    const history = useHistory();

    useEffect(() => {
        api.users.getById(userId).then((user) => {
            setUser(user);
        });
    }, []);

    const handleUsers = () => {
        history.push(`/users/${userId}/edit`);
    };

    return (
        user
            ? (
                <>
                    <h1>{user.name}</h1>
                    <h2>Профессия: {user.profession.name}</h2>
                    <QualitiesList qualities={user.qualities}/>
                    <h2>Встретился, раз: {user.completedMeetings}</h2>
                    <h2>Оценка: {user.rate}</h2>
                    <button onClick={handleUsers}>Изменить</button>
                </>
            )
            : "Loading..."
    );
};

export default UserPage;
