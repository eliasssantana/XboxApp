import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import GuardedRoute from "./GuardedRoute/GuardedRoute";
import Login from "./Login/Login";
import GamesList from "./GamesList/GamesList";
import Header from "./Header/Header";
import Home from './Home/Home'
import AddGame from './AddGame/AddGame'
import VisualizarGame from './VisualizarGame/VisualizarGame'
import CreateProfile from "./Profile/Profile";
import ProfileList from "./Profile/SeeProfiles";

export default function App() {
    const isAuthenticated = Boolean(localStorage.getItem("JWT"));

    return (
        <div className="App">
            <Header />

            <div className="content">
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Home}/>

                        <Route path="/login" exact={true} component={Login} />

                        <GuardedRoute
                            path="/game"
                            component={AddGame}
                            auth={isAuthenticated}
                        />

                        <Route
                            path="/game"
                            component={GamesList}
                        />
                        <Route
                            path="/game/:id"
                            component={VisualizarGame}
                        />
                        <Route path="/perfil" component={CreateProfile}/>
                        <Route exact={true} path="perfils/" component={ProfileList}/>
                    </Switch>
                </BrowserRouter>
            </div>
        </div>
    );
}