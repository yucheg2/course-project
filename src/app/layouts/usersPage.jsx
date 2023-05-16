import React from "react";
import { Redirect, useParams } from "react-router-dom";
import EditPage from "../components/page/editPage/editPage";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import { useAuth } from "../hooks/useAuth";
import UserProvider from "../hooks/useUsers";

const Users = () => {
    const { userId, edit } = useParams();

    const { currentUser } = useAuth();
    return (
        <>
            <UserProvider>
                {
                    userId
                        ? (edit
                            ? currentUser._id === userId
                                ? <EditPage/>
                                : <Redirect to={`/users/${currentUser._id}/edit`}/>
                            : <UserPage userId={userId}/>)
                        : <UsersListPage/>
                }
            </UserProvider>
        </>
    );
};

export default Users;
