import { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getIsloading, getIsLoggedIn, loadUsersList } from "../../../store/users";
import { loadQualitiesList } from "../../../store/qualities";
import { loadProfessionsList } from "../../../store/professions";

const AppLoader = ({ children }) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getIsLoggedIn());
    const usersStatusLoading = useSelector(getIsloading());
    useEffect(() => {
        dispatch(loadQualitiesList());
        dispatch(loadProfessionsList());
        if (isLoggedIn) {
            dispatch(loadUsersList());
        }
    }, [isLoggedIn]);
    if (usersStatusLoading) return "loading";
    return (children);
};

export default AppLoader;

AppLoader.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
