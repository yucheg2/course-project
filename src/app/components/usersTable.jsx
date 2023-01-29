import React from "react";
import PropTypes from "prop-types";
import BookMark from "./bookmark";
import QualitiesList from "./qualitieList";
import Table from "./table";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";

const UserTable = ({
    users,
    onSort,
    selectedSort,
    onToggleBookMark,
    onDelete,
    ...rest
}) => {
    const columns = {
        name: { path: "name", name: "Имя" },
        qualities: { name: "Качества", component: (user) => (<QualitiesList qualities={user.qualities}/>) },
        professions: { path: "profession.name", name: "Профессия" },
        completedMeetings: { path: "completedMeetings", name: "Встретился, раз" },
        rate: { path: "rate", name: "Оценка" },
        bookmark: {
            path: "bookmark",
            name: "избранное",
            component: (user) => (
                <BookMark
                    status={(user.bookmark)}
                    onClick={() => onToggleBookMark(user._id)}
                />)
        },
        delete: {
            component: (user) => (
                <button
                    onClick={() => onDelete(user._id)}
                    className="btn btn-danger m-2"
                >
                delete
                </button>
            )
        }
    };
    return (
        <Table
            onSort = {onSort}
            selectedSort = {selectedSort}
            columns = {columns}
            data = {users}>
            <TableHeader {...{ onSort, selectedSort, columns }}/>
            <TableBody {...{ columns, data: users }}/>
        </Table>
    );
};

UserTable.propTypes = {
    onToggleBookMark: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default UserTable;
