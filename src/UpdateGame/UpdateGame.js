import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router';
import { Api } from '../Api/Api';

export default function UpdateGame() {
    const [jogo,setJogo] = useState({});
    const [loading, setLoading] = useState(true);
    const {id} = useParams()
    const history = useHistory()


    useEffect(() => {
        const loadData = async() => {
            const response = await fetch(Api.readByIdUrl(id));
            const dado = await response.json();
            console.log(dado)
            setJogo(dado);
            setLoading(false);
        }
        loadData()
    }, [id])

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

        const response = await fetch(Api.UpdateGame, {
            method: "PATH",
            headers: new Headers({
                "Content-type": "application/json",
            }),
            body: JSON.stringify(payload),
        })

        const bodyResult = await response.json();

        history.push("/game")

    };

    if(!loading){
        return <h1>Carregando...</h1>
    }

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
                    defaultValue={jogo.capa}
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
                    defaultValue={jogo.descricao}
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
                    defaultValue={jogo.ano}
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
                    defaultValue={jogo.nota_imdb}
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
                    defaultValue={jogo.trailer}
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
                    defaultValue={jogo.gameplay}
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
