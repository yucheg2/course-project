import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import UsersPage from "./layouts/usersPage";
import { ToastContainer } from "react-toastify";
// import ProfessionProvider from "./hooks/useProfessions";
// import QualitiesProvider from "./hooks/useQualities";
import AuthProvider from "./hooks/useAuth";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logout";
import { loadQualitiesList } from "./store/qualities";
import { useDispatch } from "react-redux";
import { loadProfessionsList } from "./store/professions";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadQualitiesList());
        dispatch(loadProfessionsList());
    }, []);

    return (
        <>
            <AuthProvider>
                <NavBar/>
                {/* <QualitiesProvider> */}
                {/* <ProfessionProvider> */}
                <Switch>
                    <ProtectedRoute path="/users/:userId?/:edit?" component={UsersPage}/>
                    <Route path="/login/:type?" component={Login}/>
                    <Route path="/logout" component={LogOut}/>
                    <Route path="/" component={Main}/>
                    <Redirect to="/"/>
                </Switch>
                {/* </ProfessionProvider> */}
                {/* </QualitiesProvider> */}
            </AuthProvider>
            <ToastContainer/>
        </>
    );
}

export default App;
