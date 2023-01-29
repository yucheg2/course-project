import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import api from "../API/index";
import QualitiesList from "./qualitieList";

const User = () => {
    const [user, setUser] = useState();
    const { userId } = useParams();
    const history = useHistory();

    useEffect(() => {
        api.users.getById(userId).then((user) => {
            setUser(user);
        });
    }, []);

    const handleUsers = () => {
        history.replace("/users");
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
                    <button onClick={handleUsers}>Все пользователи</button>
                </>
            )
            : "Loading..."
    );
};

export default User;
