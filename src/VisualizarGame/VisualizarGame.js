import React from "react";
import { useState} from "react";
import { useEffect } from "react";
import "./VisualizarGame.css";
import { useParams } from "react-router-dom";
import {Card } from 'react-bootstrap'

export default function VisualizarGame() {
    const {id} = useParams();

    const [Game, setGame] = useState({});

    useEffect(() => {
        const loadData = async () => {
            const response = await fetch(`http://localhost:5000/game/${id}`);
            const result = await response.json();
            console.log(result.generos.map(i => i.nome))
            setGame(result);
        };
        console.log("tô aqui")
        loadData();
    }, [id]);

    if (!Game) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="Game">
            <h1 className="title">{Game.titulo}</h1>
            <div key={Game.id}>
                <iframe title={Game.id} src={Game.link_trailer} allowFullScreen>trailer</iframe>
                <iframe title={Game.id} src={Game.link_gameplay} allowFullScreen>Gameplay</iframe>
            </div>
            {Game.generos.map(i =>(
                <p>{i.nome}</p>
            ))}
            <p>{Game.descricao}</p>
        </div>
    );
}
