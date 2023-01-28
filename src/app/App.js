import React from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import UsersPage from "./layouts/usersPage";

function App() {
    return (
        <>
            <NavBar/>
            <Switch>
                <Route path="/users/:userId?" component={UsersPage}/>
                <Route path="/login" component={Login}/>
                <Route path="/" component={Main}/>
            </Switch>
        </>
    );
}

export default App;
