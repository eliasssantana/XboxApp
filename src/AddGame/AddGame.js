import { Api } from "../Api/Api";
import { useHistory } from "react-router";
import React from "react";

export default function AdicionarPersonagem() {

    const history = useHistory()
    const handleSubmit = async event => {
        event.preventDefault();

        const capa = event.target.capa.value;
        const descricao = event.target.decricao.value;
        const ano = event.target.ano.value;
        const nota = event.target.nota.value;
        const trailer = event.target.trailer.value;
        const gameplay = event.target.gameplay.value;
        const genero = event.target.genero.value;

        const payload = {
            capa,
            descricao,
            ano,
            nota_imdb: nota,
            link_trailer: trailer,
            link_gameplay: gameplay,
            generos: {
                nome: genero
            }

        };

        const response = await fetch(Api.addGameUrl, {
            method: "POST",
            headers: new Headers({
                "Content-type": "application/json",
            }),
            body: JSON.stringify(payload),
        })

        const bodyResult = await response.json();

        history.push("/game")

    };

    return (
        <div className="adicionar">
            <form onSubmit={handleSubmit}>
                <label htmlFor="capa">
                    Capa:
                </label>
                <br />

                <input
                    type="text"
                    id="capa"
                    name="capa"
                />

                <br />

                <label htmlFor="descricao">
                    Descrição:
                </label>
                <br />

                <input
                    type="text"
                    id="descricao"
                    name="descricao"
                />

                <br />
                <label htmlFor="ano">
                    Ano:
                </label>
                <br />
                <input
                    type="number"
                    id="ano"
                    name="ano"
                />

                <br />
                <label htmlFor="nota">
                    Nota no IMDB:
                </label>
                <br />
                <input
                    type="number"
                    id="nota"
                    name="nota"
                />
                <br/>
                <label htmlFor="trailer">
                    Trailer:
                </label>
                <br />

                <input
                    type="text"
                    id="trailer"
                    name="trailer"
                />
                <br/>
                <label htmlFor="gameplay">
                    Gameplay:
                </label>
                <br />
                <input
                    type="text"
                    id="gameplay"
                    name="gameplay"
                />

                <br/>
                <label htmlFor="genero">
                    Gênero:
                </label>
                <br />
                <input
                    type="text"
                    id="genero"
                    name="genero"
                />
                <input
                    type="submit"
                    value="Adicionar"
                    className="form__submit button button--success"
                />
            </form>
        </div>
    );
}
