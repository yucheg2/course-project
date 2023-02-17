import React from "react";
import PropTypes from "prop-types";

const GroupList = ({ items, valuePropertie, contentPropertie, selectedItem, onItemSelect }) => {
    return (
        <ul className="list-group">
            { (Array.isArray(items) ? items : Object.values(items)).map(item => {
                return (
                    <li
                        className={"list-group-item" + (item === selectedItem ? " active" : "")}
                        key={item[valuePropertie]}
                        onClick={() => {
                            onItemSelect(item);
                        }}
                        role="button"
                    >
                        {item[contentPropertie]}
                    </li>);
            })}
        </ul>
    );
};

GroupList.propTypes = {
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onItemSelect: PropTypes.func,
    valuePropertie: PropTypes.string.isRequired,
    contentPropertie: PropTypes.string.isRequired,
    selectedItem: PropTypes.object
};

GroupList.defaultProps = {
    valuePropertie: "_id",
    contentPropertie: "name"
};
export default GroupList;
