import React, { useState, useEffect } from "react";
import Users from "./components/users";
import api from "./API";

function App() {
    const [users, setUsers] = useState();
    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };
    useEffect(() => {
        api.users.fetchAll().then((users) => {
            setUsers(users);
        });
    }, []);
    const handleToggleBookMark = (id) => {
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    return { ...user, bookmark: !user.bookmark };
                }
                return user;
            })
        );
    };
    return (
        <div>
            {users && (
                <Users
                    onDelete={handleDelete}
                    onToggleBookMark={handleToggleBookMark}
                    users={users}
                />
            )}
        </div>
    );
}

export default App;
