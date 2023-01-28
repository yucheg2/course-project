import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../API/index";
import QualitiesList from "./qualitieList";

const User = () => {
    const [user, setUser] = useState();
    const { userId } = useParams();

    useEffect(() => {
        api.users.getById(userId).then((user) => {
            setUser(user);
        });
    }, []);

    return (
        user
            ? (
                <>
                    <h1>{user.name}</h1>
                    <h2>Профессия: {user.profession.name}</h2>
                    <QualitiesList qualities={user.qualities}/>
                    <h2>Встретился, раз: {user.completedMeetings}</h2>
                    <h2>Оценка: {user.rate}</h2>
                </>
            )
            : "Loading..."
    );
};

export default User;
