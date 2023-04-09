import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import usersService from "../service/users.service";
import { toast } from "react-toastify";

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setLoadig] = useState(true);
    useEffect(() => {
        getUsers();
    }, []);
    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);
    async function getUsers() {
        try {
            const { content } = await usersService.get();
            setUsers(content);
            setLoadig(false);
        } catch (error) {
            errorCatcher(error);
        }
    };
    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }

    function getUserById(id) {
        return users.find((user) => user._id === id);
    }
    return (
        <UserContext.Provider value={{ users, getUserById }}>
            {
                isLoading
                    ? "loading..."
                    : children
            }
        </UserContext.Provider>
    );
};

export const useUsers = () => {
    return useContext(UserContext);
};

export default UserProvider;

UserProvider.propTypes = {
    children: PropTypes.oneOfType(
        [PropTypes.arrayOf(PropTypes.node), PropTypes.node]
    )
};
