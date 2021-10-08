import React from "react";
import { useState} from "react";
import { useEffect } from "react";
import "./VisualizarGame.css";
import { useParams } from "react-router";

export default function VisualizarGame() {
    const {id} = useParams();

    const [Game, setGame] = useState({});

    useEffect(() => {
        const loadData = async () => {
            const response = await fetch(`http://localhost:5000/game/${id}`);

            const result = await response.json();
            console.log(result)
            setGame(result);
        };

        loadData();
    }, [id]);

    if (!Game) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="Game">
                <React.Fragment key={Game.id}>
                    <iframe title={Game.id} src={Game.link_trailer}>trailer</iframe>
                    <iframe title={Game.id} src={Game.link_gameplay}>Gameplay</iframe>
                </React.Fragment>
            ))}
                
        </div>
    );
}
