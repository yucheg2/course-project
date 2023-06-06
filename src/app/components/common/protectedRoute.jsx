import React from "react";
import { Redirect, Route } from "react-router-dom";
// import { useAuth } from "../../hooks/useAuth";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "../../store/users";

const ProtectedRoute = ({ children, component: Component, ...rest }) => {
    // const { currentUser } = useAuth();
    const isLoggedIn = useSelector(getIsLoggedIn());

    return (<Route {...rest} render={(props) => {
        // if (!currentUser) {
        if (!isLoggedIn) {
            return <Redirect to={{
                pathname: "/login",
                state: {
                    from: props.location
                }
            }}/>;
        }
        return Component
            ? <Component {...props}/>
            : children;
    }}/>);
};

export default ProtectedRoute;

ProtectedRoute.propTypes = {
    location: PropTypes.object,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    component: PropTypes.func
};
