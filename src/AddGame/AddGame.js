import { Api } from "../Api/Api";
import React, {useState, useEffect}from "react";
import Select from 'react-select'

export default function AddGame(props) {
        const [generos, setGeneros] = useState([])
        const [generosSelecionados, setGenerosSelecionados] = useState([]);
        const [genresIds, setGenresIds] = useState([])
           
    const handleGenreChange = selectedOptions =>{
            setGenresIds(selectedOptions.map(option=> option.value))
    }
    const handleSubmit = async (event) => {
        event.preventDefault();

        const titulo = event.target.titulo.value;
        const capa = event.target.capa.value;
        const descricao = event.target.descricao.value;
        const ano = +event.target.ano.value;
        const nota = +event.target.nota.value;
        const trailer = event.target.trailer.value;
        const gameplay = event.target.gameplay.value;

        const payload = {
            titulo,
            capa,
            descricao,
            ano,
            nota_imdb: nota,
            link_trailer: trailer,
            link_gameplay: gameplay,
            genreConnectIds: genresIds
        }



        const response = await fetch('http:localhost:5000/game', {
            method: "POST",
            headers: new Headers({
                "Content-type": "application/json",
            }),
            body: JSON.stringify(payload),
        })

        const bodyResult = await response.json();
        console.log(bodyResult)
        if(response.status === 201){
            window.location.reload()
        }

    };
    useEffect(() => {
        const loadGenre = async() =>{
            const response = await fetch('http://localhost:5000/genre');
            const dados = await response.json();
            setGeneros(dados)
        }
        loadGenre()
    }, [])
    
    const options = generos.map(genero => ({
        value: genero.id,
        label: genero.nome
    }))

    return (
        <div className="adicionar">
            <form onSubmit={handleSubmit}>
                <label htmlFor="titulo">
                    Titulo:
                </label>
                <br />

                <input
                    type="text"
                    id="titulo"
                    name="titulo"
                    required
                />
                <br/>
                <label htmlFor="capa">
                    Capa:
                </label>
                <br />

                <input
                    type="text"
                    id="capa"
                    name="capa"
                    required
                />

                <br />

                <label htmlFor="descricao">
                    Descri????o:
                </label>
                <br />

                <input
                    type="text"
                    id="descricao"
                    name="descricao"
                    required
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
                    required
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
                    max={10}
                    min={0}
                    required
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
                    required
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
                    required
                />
                <br/>
                <br/>

                <Select options={options} onChange={handle}/>
                <input
                    type="submit"
                    value="Adicionar"
                    className="form__submit button button--success"
                />
            </form>
        </div>
    );
}
