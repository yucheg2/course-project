import React from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import UsersPage from "./layouts/usersPage";

function App() {
    return (
        <>
            <NavBar/>
            <Switch>
                <Route exact path="/users/:userId?/:edit?" component={UsersPage}/>
                <Route path="/login/:type?" component={Login}/>
                <Route path="/" component={Main}/>
            </Switch>
        </>
    );
}

export default App;
