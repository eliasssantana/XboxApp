import React, {useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import { Api} from '../Api/Api'
import ReactLoading from 'react-loading'

export default function GenreList(){
    const [dados,setDados] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getGame = async() =>{
            const response = await fetch(Api.readGenreUrl());
            const games = await response.json()
            setDados(games)
            setLoading(false)
        }
        getGame()
    }, []);
    if(loading){
        return <ReactLoading className="loading" type={"spinningBubbles"} color={"green"} height={'20%'} width={'20%'}/>
    }
    return(
        <>
            <h1>Gêneros</h1>
            <button><Link to="genre/create">Criar gênero</Link></button>
            {dados.map((i) =>(
                <ul key={i.id}>
                    <li>{i.nome}</li>
                    <li><Link to={`genre/${i.id}`}/>editar</li>
                </ul>
            ))}
        </>
        )

}