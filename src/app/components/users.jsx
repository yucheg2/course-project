import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import api from "../API/index";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";
import UserTable from "./usersTable";
import _ from "lodash";
const Users = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [users, setUsers] = useState();
    const pageSize = 4;
    useEffect(() => {
        api.professions.fetchAll().then((professions) => {
            setProfessions(professions);
        });
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handleProfessionSelect = (params) => {
        setSelectedProf(params);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    const clearFilter = () => {
        setSelectedProf();
    };

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

    if (users) {
        const filteredUsers = selectedProf
            ? users.filter((user) => JSON.stringify(user.profession) === JSON.stringify(selectedProf))
            : users;
        const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
        const count = filteredUsers.length;
        const usersCrop = paginate(sortedUsers, currentPage, pageSize);

        return (
            <div className="d-flex">
                {professions && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectedItem = {selectedProf}
                            items={professions}
                            onItemSelect = {handleProfessionSelect}
                        />
                        <button className="btn btn-secondary mt-2"onClick={clearFilter}> Очистить</button>
                    </div>
                )}
                <div className="d-flex flex-column ">
                    <SearchStatus length={count} />
                    {count > 0 && (
                        <UserTable
                            users={usersCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onDelete={handleDelete}
                            onToggleBookMark={handleToggleBookMark}
                        />
                    )}

                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return "loading...";
};

Users.propTypes = {
    users: PropTypes.array
};

export default Users;
