import React, {useEffect,useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import {IoIosStar, IoIosStarOutline} from 'react-icons/io'
import { Api} from '../Api/Api'
import ReactLoading from 'react-loading'
import "./Admin.css"
import {Card} from 'react-bootstrap'
function Admin() {
    const {id} = useParams();
    const [dados,setDados] = useState([]);
    const [loading, setLoading] = useState(true);
    const handleDelete = async(id2) =>{
        const jogo = await fetch(Api.readByIdUrl(id2), {
            method: "DELETE"
        })
        const convertedGame = await jogo.json();
        console.log(convertedGame);
        window.location.reload();
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
            <di>
                <h1>Seja bem-vindo ao portal do administrador</h1>
            </di>
            <div className="body">
            {dados.map(item =>(
            <div className="container">
                <Card className="card">
                    <div key={item.id}>
                        <Link to={`/game/${item.id}`}>
                            <div><img src={item.capa} alt={item.titulo}/></div>
                            <div>{item.titulo}</div>
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
                        <div className="botoes">
                            <Link className="btn" to={`/game/update/${item.id}`}>Editar Game</Link>
                            <button onClick={() => handleDelete(item.id)}>Excluir Game</button>
                        </div>
                    </div>
                </Card>
            </div> 
            ))}
            </div>
        </React.Fragment>
    )
}

export default Admin

    