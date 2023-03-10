import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import api from "../../../API/index";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import UserTable from "../../ui/usersTable";
import _ from "lodash";
import SerchInput from "../../ui/searchInput";

const UsersListPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [users, setUsers] = useState();
    const [serchedText, setSerchedText] = useState("");
    const pageSize = 4;
    useEffect(() => {
        api.professions.fetchAll().then((professions) => {
            setProfessions(professions);
        });
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handleChange = ({ target }) => {
        setSerchedText(target.value);
        setSelectedProf();
    };

    const handleProfessionSelect = (params) => {
        setSerchedText("");
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
        const serchedUsers = serchedText
            ? users.filter((user) => user.name.toLowerCase().includes(serchedText.toLowerCase()))
            : undefined;

        const filteredUsers = selectedProf
            ? users.filter((user) => JSON.stringify(user.profession) === JSON.stringify(selectedProf))
            : users;
        const sortedUsers = _.orderBy((serchedUsers || filteredUsers), [sortBy.path], [sortBy.order]);
        const count = serchedText ? serchedUsers.length : filteredUsers.length;
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
                        <button className="btn btn-secondary mt-2"onClick={clearFilter}> ????????????????</button>
                    </div>
                )}
                <div className="d-flex flex-column ">
                    <SearchStatus length={count} />
                    <SerchInput
                        name="usersSearch"
                        handleChange={handleChange}
                        serchedText={serchedText}
                    />
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

UsersListPage.propTypes = {
    users: PropTypes.array
};

export default UsersListPage;
