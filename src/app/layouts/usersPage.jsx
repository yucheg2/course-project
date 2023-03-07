import React from "react";
import { useParams } from "react-router-dom";
import EditPage from "../components/page/editPage/editPage";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";

const Users = () => {
    const { userId, edit } = useParams();
    return (
        userId
            ? (edit
                ? <EditPage/>
                : <UserPage userId={userId}/>)
            : <UsersListPage/>
    );
};

export default Users;
