import { Api } from "../Api/Api";
import React from "react";
import { useState} from "react";
import { useEffect } from "react";

import "./VisualizarGame.css";
import { useParams } from "react-router";

export default function VisualizarGame() {
    const {id} = useParams();

    const [Game, setGame] = useState(undefined);

    useEffect(() => {
        const loadData = async () => {
            const response = await fetch(Api.readByIdUrl(id));

            const result = await response.json();

            setGame(result);
        };

        loadData();
    }, [id]);

    if (!Game) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="Game">
            {Game.map(i => (
                <>
                    <iframe src={i.link_trailer}></iframe>
                    <iframe src={i.link_gameplay}></iframe>
                </>
            ))}
                
        </div>
    );
}
