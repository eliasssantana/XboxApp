import { Api } from "../Api/Api";
import { useHistory } from "react-router";
import React from "react";

export default function CreateGenre() {

    const history = useHistory()
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
