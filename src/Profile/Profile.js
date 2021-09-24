import React, {useHistory} from 'react'
import {Api} from '../Api/Api'

function CreateProfile(){
    const history = useHistory()
    const handleSubmit = async event => {
        event.preventDefault();

        const titulo = event.target.titulo.value;
        const imagem = event.target.imagem.value;

        const payload = {
            titulo,
            imagem
        };

        const response = await fetch(Api.createProfile, {
            method: "POST",
            headers: new Headers({
                "Content-type": "application/json",
            }),
            body: JSON.stringify(payload),
        })

        const bodyResult = await response.json();

        history.push("/perfils")

    };

    return (
        <div className="adicionar">
            <form onSubmit={handleSubmit}>
                <label htmlFor="titulo">
                    Título:
                </label>
                <br />

                <input
                    type="text"
                    id="titulo"
                    name="titulo"
                />

                <br />

                <label htmlFor="imagem">
                    imagem:
                </label>
                <br />

                <input
                    type="submit"
                    value="Adicionar"
                    className="form__submit button button--success"
                />
            </form>
        </div>
    );
}

export default CreateProfile
