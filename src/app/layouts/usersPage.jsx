import React from "react";
import { useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import EditPage from "../components/page/editPage/editPage";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import UsersLoader from "../components/ui/hoc/usersLoader";
// import UserProvider from "../hooks/useUsers";
import { getCurrentUserId } from "../store/users";

const Users = () => {
    const { userId, edit } = useParams();

    const currentUserId = useSelector(getCurrentUserId());
    return (
        <>
            <UsersLoader>
                {/* <UserProvider> */}
                {
                    userId
                        ? (edit
                            ? currentUserId === userId
                                ? <EditPage/>
                                : <Redirect to={`/users/${currentUserId}/edit`}/>
                            : <UserPage userId={userId}/>)
                        : <UsersListPage/>
                }
                {/* </UserProvider> */}
            </UsersLoader>
        </>
    );
};

export default Users;
