import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import UsersPage from "./layouts/usersPage";
import { ToastContainer } from "react-toastify";
import ProfessionProvider from "./hooks/useProfessions";
import QualitiesProvider from "./hooks/useQualities";
import AuthProvider from "./hooks/useAuth";
import LoginProvider from "./hooks/useLogin";

function App() {
    return (
        <>
            <LoginProvider>
                <AuthProvider>
                    <NavBar/>
                    <QualitiesProvider>
                        <ProfessionProvider>
                            <Switch>
                                <Route exact path="/users/:userId?/:edit?" component={UsersPage}/>
                                <Route path="/login/:type?" component={Login}/>
                                <Route path="/" component={Main}/>
                                <Redirect to="/"/>
                            </Switch>
                        </ProfessionProvider>
                    </QualitiesProvider>
                </AuthProvider>
            </LoginProvider>
            <ToastContainer/>
        </>
    );
}

export default App;
