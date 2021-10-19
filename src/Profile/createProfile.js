import React, { useState } from 'react'
import {Api} from '../Api/Api'
import { useParams } from 'react-router-dom';

function CreateProfile(props){
    const {id} = useParams()
    const [erro, setErro] = useState("");
    const handleSubmit = async event => {
        event.preventDefault();

        const titulo = event.target.titulo.value;
        const imagem = event.target.imagem.value;

        const payload = {
            titulo,
            imagem,
            usuarioId: +id
        };

        const response = await fetch("http://localhost:5000/profile", {
            method: "POST",
            headers: new Headers({
                "Content-type": "application/json",
            }),
            body: JSON.stringify(payload),
        })
        const bodyResult = await response.json();
        console.log(bodyResult)
        if(response.status === 201){
            props.history.push("/perfis")
        }else{
            setErro("Houve um erro")
        }
        
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
                    required
                />

                <br />

                <label htmlFor="imagem">
                    imagem:
                </label>
                <br />
                <input
                    type="text"
                    id="imagem"
                    name="imagem"
                    required
                    onInvalid={() => erro}
                />

                <input
                    type="submit"
                    value="Adicionar"
                    
                />
            </form>
        </div>
    );
}

export default CreateProfile
