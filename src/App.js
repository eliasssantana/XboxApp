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
import CreateProfile from "./Profile/createProfile";
import ProfileList from "./Profile/SeeProfiles";
import SeeProfile from "./Profile/seeProfile";
import UpdateGame from "./UpdateGame/UpdateGame";
import GenreList from "./readAllGenre/readAllGenre";
import createGenre from "./readAllGenre/createGenre";
import UpdateGenre from "./readAllGenre/updateGenre";
import UserLogin from "./User/UserLogin";
import UpdateProfile from "./Profile/UpdateProfile";
import Admin from './Admin/Admin'
import Favoritos from "./Favoritos/Favoritos";

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
                        <Route path="/usuario/create" exact component={UserLogin} />
                        <Route path="/admin" component={Admin}/>
                        <Route path="/favoritos" component={Favoritos}/>

                        <GuardedRoute exact
                            path="/game"
                            component={AddGame}
                            auth={isAuthenticated}
                        />

                        <Route
                            path="/games/:id"
                            component={GamesList}
                        />
                        <Route exact={true}
                            path="/game/:id"
                            component={VisualizarGame}
                        />
                        <Route exact path="/game/create" component={AddGame}/>
                        <Route exact path="/game/update/:id" component={UpdateGame}/>
                        <Route exact path="/perfil/create" component={CreateProfile}/>
                        <Route exact path="/perfil/update/:id" component={UpdateProfile}/>
                        <Route exact path="/perfil/:id" component={SeeProfile}/>
                        <Route exact path="/perfis" component={ProfileList}/>

                        <Route path="/genre" component={GenreList}/>
                        <Route path="/genre/create" component={createGenre}/>
                        <Route path="/genre/:id" component={UpdateGenre}/>
                    </Switch>
                </BrowserRouter>
            </div>
        </div>
    );
}