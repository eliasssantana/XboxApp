import React, {useEffect,useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import {IoIosStar, IoIosStarOutline} from 'react-icons/io'
import { Api} from '../Api/Api'
import ReactLoading from 'react-loading'
import "./GamesList.css"
import {Card} from 'react-bootstrap'
export default function GamesList(){
    const {id} = useParams();
    const [dados,setDados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [admin, setAdmin] = useState(false);
    const addFavoriteGame = async(id2) =>{
        const profileData = await fetch(Api.readProfileId(id));
        const result = await profileData.json();
        delete result.id
        delete result.jogos
        delete result.usuario
        delete result.usuarioId
        const payload = {
            ...result,
            jogosIds: [id2],
        }
        const response = await fetch(Api.readProfileId(id),{
            method: "PATCH",
            headers: new Headers({
                "content-type": "application/json"
            }),
            body: JSON.stringify(payload)
        }
        );
        const resultado = await response.json();
        console.log(resultado);
        window.location.reload()
    }
    useEffect(() => {
        const getGame = async() =>{
            const response = await fetch(Api.readAllGamesUrl())
            const games = await response.json()
            setDados(games)
            setLoading(false)
            console.log(games)
        }
        const getProfile = async() =>{
            const response = await fetch(Api.readProfileId(id))
            const profile = await response.json()
            setAdmin(profile.usuario.isAdmin)
            console.log(profile)
        }
        getGame()
        getProfile()
    }, [id]);
    if(loading){
        return <ReactLoading className="loading" type={"spinningBubbles"} color={"green"} height={'20%'} width={'20%'}/>
    }
    return(
        <React.Fragment>
            <div>
                <Link to={`/favoritos/${id}`}><button>Favoritos</button></Link>
                {admin?(<Link to={"/admin"}><button>Admin</button></Link>):""}
            </div>
            <div className="body">
            {dados.map(item =>(
            <div className="container">
                <Card className="card">
                    <div key={item.id}>
                        <Link to={`/game/${item.id}`}>
                            <div><img src={item.capa} alt={item.titulo}/></div>
                            <div className="titulo">{item.titulo}</div>
                            <div>{item.ano}</div>
                            <div className="classificacao">{item.nota_imdb >= 1?(
                                <IoIosStar/>
                            ):(<IoIosStarOutline/>)}
                            {item.nota_imdb >= 2?(
                                <IoIosStar/>
                            ):(<IoIosStarOutline/>)}
                            {item.nota_imdb >= 3?(
                                <IoIosStar/>
                            ):(<IoIosStarOutline/>)}
                            {item.nota_imdb >= 4?(
                                <IoIosStar/>
                            ):(<IoIosStarOutline/>)}
                            {item.nota_imdb >= 5?(
                                <IoIosStar/>
                            ):(<IoIosStarOutline/>)}
                            </div>
                        </Link>
                        <button className="btn" onClick={() => addFavoriteGame(item.id)}>Adicionar aos favoritos</button>
                    </div>
                </Card>
            </div> 
            ))}
            </div>
        </React.Fragment>
    )
}