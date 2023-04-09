import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import UserTable from "../../ui/usersTable";
import _ from "lodash";
import SerchInput from "../../ui/searchInput";
import { useUsers } from "../../../hooks/useUsers";
import { useProfessons } from "../../../hooks/useProfessions";
import { useAuth } from "../../../hooks/useAuth";

const UsersListPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { professions, loading } = useProfessons();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [serchedText, setSerchedText] = useState("");
    const { users } = useUsers();
    const { currentUser } = useAuth();
    const pageSize = 4;
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handleChange = ({ target }) => {
        setSerchedText(target.value);
        setSelectedProf();
    };

    const handleProfessionSelect = (params) => {
        setSerchedText("");
        setSelectedProf(params._id);
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

    // const handleDelete = (userId) => {
    //     setUsers(users.filter((user) => user._id !== userId));
    // };
    const handleToggleBookMark = (id) => {
        // setUsers(
        //     users.map((user) => {
        //         if (user._id === id) {
        //             return { ...user, bookmark: !user.bookmark };
        //         }
        //         return user;
        //     })
        // );
    };

    function filterUsers(data) {
        const filteredUsers = serchedText
            ? data.filter((user) => user.name.toLowerCase().includes(serchedText.toLowerCase()))
            : selectedProf
                ? data.filter((user) => JSON.stringify(user.profession) === JSON.stringify(selectedProf))
                : data;
        return filteredUsers.filter((u) => u._id !== currentUser._id);
    }

    const filteredUsers = filterUsers(users);

    const sortedUsers = _.orderBy((filteredUsers), [sortBy.path], [sortBy.order]);
    const count = filteredUsers.length;
    const usersCrop = paginate(sortedUsers, currentPage, pageSize);

    return (
        <div className="d-flex">
            {!loading && (
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
                        // onDelete={handleDelete}
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
};

UsersListPage.propTypes = {
    users: PropTypes.array
};

export default UsersListPage;
