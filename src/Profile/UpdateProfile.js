import React, {useEffect,useState} from 'react'
import { useParams } from 'react-router';
import ReactLoading from 'react-loading'
import {Api} from '../Api/Api'

function UpdateProfile(props){
    const {id} = useParams()
    const [dados,setDados] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getGame = async() =>{
            const response = await fetch(Api.readProfileId(id))
            const profile = await response.json()
            setDados(profile)
            setLoading(false)
        }
        getGame()
    }, [id]);

    if(loading){
        return <ReactLoading type={"spinningBubbles"} color={"green"} height={'20%'} width={'20%'}/>
    }
    const handleSubmit = async event => {
        event.preventDefault();

        const titulo = event.target.titulo.value;
        const imagem = event.target.imagem.value;

        const payload = {
            titulo,
            imagem,
            usuarioId: 21
        };

        const response = await fetch(`http://localhost:5000/profile/${dados.id}`, {
            method: "PATCH",
            headers: new Headers({
                "Content-type": "application/json",
            }),
            body: JSON.stringify(payload),
        })

        const bodyResult = await response.json();

        props.history.push("/perfils")

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
                    placeholder="Insira o novo nome do perfil"
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
                    placeholder="Insira a URL da imagem"
                />

                <br />

                <input
                    type="submit"
                    value="Adicionar"
                />
            </form>
        </div>
    );
}

export default UpdateProfile
