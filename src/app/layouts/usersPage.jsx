import React from "react";
import { useParams } from "react-router-dom";
import EditPage from "../components/page/editPage/editPage";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import UserProvider from "../hooks/useUsers";

const Users = () => {
    const { userId, edit } = useParams();
    return (
        <>
            <UserProvider>
                {
                    userId
                        ? (edit
                            ? <EditPage/>
                            : <UserPage userId={userId}/>)
                        : <UsersListPage/>
                }
            </UserProvider>
        </>
    );
};

export default Users;
