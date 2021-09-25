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
import UpdateGame from "./UpdateGame/UpdateGame";
import GenreList from "./readAllGenre/readAllGenre";
import createGenre from "./readAllGenre/createGenre";
import UpdateGenre from "./readAllGenre/updateGenre";

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
                        <Route path="/game/create" component={AddGame}/>
                        <Route path="/gameUpdate/:id" component={UpdateGame}/>
                        <Route path="/perfil" component={CreateProfile}/>
                        <Route exact={true} path="/perfils" component={ProfileList}/>

                        <Route path="/genre" component={GenreList}/>
                        <Route path="/genre/create" component={createGenre}/>
                        <Route path="/genre/:id" component={UpdateGenre}/>
                    </Switch>
                </BrowserRouter>
            </div>
        </div>
    );
}