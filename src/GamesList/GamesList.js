import React, {useEffect,useState, useContext} from 'react';
import { Link, useParams } from 'react-router-dom';
import {IoIosStar, IoIosStarOutline} from 'react-icons/io'
import { Api} from '../Api/Api'
import ReactLoading from 'react-loading'
import "./GamesList.css"
export default function GamesList(){
    const {id} = useParams();
    const [dados,setDados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [admin, setAdmin] = useState(false);
    useEffect(() => {
        const getGame = async() =>{
            const response = await fetch(Api.readAllGamesUrl())
            const games = await response.json()
            setDados(games)
            setLoading(false)
        }
        const getProfile = async() =>{
            const response = await fetch(Api.readProfileId(id))
            const profile = await response.json()
            setAdmin(profile.usuario.isAdmin)
        }
        getGame()
        getProfile()
    }, [id]);
    if(loading){
        return <ReactLoading className="loading" type={"spinningBubbles"} color={"green"} height={'20%'} width={'20%'}/>
    }
    return(
        <>  <div>
                <Link to="/favoritos"><button>Favoritos</button></Link>
                {admin?(<Link to={"/admin"}><button>Admin</button></Link>):""}
            </div>
            {dados.map(item =>(
            <div className="container">
                <ul key={item.id}>
                    <Link to={`game/${item.id}`}>
                        <li><img src={item.capa} alt={item.titulo}/></li>
                        <li>{item.titulo}</li>
                        <li>{item.descricao}</li>
                        <li>{item.ano}</li>
                        <li>{item.nota_imdb >= 1?(
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
                        {item.nota_imdb >= 6?(
                            <IoIosStar/>
                        ):(<IoIosStarOutline/>)}
                        {item.nota_imdb >= 7?(
                            <IoIosStar/>
                        ):(<IoIosStarOutline/>)}
                        {item.nota_imdb >= 8?(
                            <IoIosStar/>
                        ):(<IoIosStarOutline/>)}
                        {item.nota_imdb >= 9?(
                            <IoIosStar/>
                        ):(<IoIosStarOutline/>)}
                        {item.nota_imdb >= 10?(
                            <IoIosStar/>
                        ):(<IoIosStarOutline/>)}
                        </li>
                    </Link>
                    <Link to={`game/update/${item.id}`}><button>Update</button></Link>
                </ul>
            </div> 
            ))}
        </>
    )
}