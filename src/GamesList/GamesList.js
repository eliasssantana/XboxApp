import React, {useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import { Api} from '../Api/Api'
import ReactLoading from 'react-loading'
import "./GamesList.css"
export default function GamesList(){
    const [dados,setDados] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getGame = async() =>{
            const response = await fetch(Api.readAllGamesUrl())
            const games = await response.json()
            setDados(games)
            setLoading(false)
        }
        getGame()
    }, []);
    if(loading){
        return <ReactLoading className="loading" type={"spinningBubbles"} color={"green"} height={'20%'} width={'20%'}/>
    }
    return(dados.map(item =>(
        <div className="container">
            <ul key={item.id}>
                <Link to={`game/${item.id}`}>
                    <li><img src={item.capa}/></li>
                    <li>{item.descricao}</li>
                    <li>{item.ano}</li>
                    <li>{item.nota_imdb}</li>
                </Link>
            </ul>
        </div> 
    )))

}