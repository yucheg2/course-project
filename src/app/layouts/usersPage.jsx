import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";

const Users = () => {
    const { userId } = useParams();
    return (
        userId
            ? <UserPage/>
            : <UsersListPage/>
    );
};

export default Users;
