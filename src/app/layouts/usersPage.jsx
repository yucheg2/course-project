import React from "react";
import { useParams } from "react-router-dom";
import User from "../components/user";
import Users from "../components/users";

const UsersPage = () => {
    const { userId } = useParams();
    return (
        userId
            ? <User/>
            : <Users/>
    );
};

export default UsersPage;
