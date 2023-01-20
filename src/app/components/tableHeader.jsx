import React from "react";
import PropTypes from "prop-types";

const TableHeader = ({ onSort, selectedSort, columns }) => {
    const handleSort = (item) => {
        if (selectedSort.path === item) {
            onSort({ path: selectedSort.path, order: selectedSort.order === "asc" ? "desc" : "asc" });
        } else {
            onSort({ path: item, order: "asc" });
        }
    };

    const toggleArrow = (item) => {
        if (selectedSort.path === item) {
            return (
                <i
                    className={"bi bi-caret-" + (selectedSort.order === "asc" ? "up-fill" : "down-fill")} >
                </i>);
        }
        return "";
    };
    return (
        <thead>
            <tr>
                {Object.keys(columns).map((column) => (
                    <th key={column}
                        {...{ role: columns[column].path && "button" }}
                        onClick={columns[column].path ? () => { handleSort(columns[column].path); } : undefined }
                        scope="col">
                        <p>{columns[column].name} {toggleArrow(columns[column].path)}</p>
                    </th>
                ))}
            </tr>
        </thead>);
};

TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableHeader;
