import { Api } from "../Api/Api";
import { useHistory, useParams} from "react-router";
import React, {useState, useEffect} from "react";

export default function UpdateGenre() {
    const [genre,setGenre] = useState()
    const history = useHistory()
    const {id} = useParams()

    useEffect(() => {
        const getData = async() => {
            const response = await fetch(Api.readGenreId(id))
            const data = await response.json()
            setGenre(data)
        }
        getData()
    }, [id])

    const handleSubmit = async event => {
        event.preventDefault();

        const genero = event.target.genero.value;

        const payload = {
            nome: genero

        };

        const response = await fetch(Api.readGenreUrl, {
            method: "POST",
            headers: new Headers({
                "Content-type": "application/json",
            }),
            body: JSON.stringify(payload),
        })

        const bodyResult = await response.json();

        history.push("/genre")

    };

    return (
        <div className="adicionar">
            <form onSubmit={handleSubmit}>
                <label htmlFor="capa">
                    Gênero:
                </label>
                <br />

                <input
                    type="text"
                    id="genero"
                    name="genero"
                    defaultValue={genre.name}
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
