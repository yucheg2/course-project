import React from "react";
import PropTypes from "prop-types";

const UserPageLayout = ({ children }) => {
    return (
        <div className="container">
            <div className="row gutters-sm">
                {children}
            </div>
        </div>
    );
};

UserPageLayout.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default UserPageLayout;
