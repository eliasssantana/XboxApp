import React, {useEffect,useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import {IoIosStar, IoIosStarOutline} from 'react-icons/io'
import { Api} from '../Api/Api'
import ReactLoading from 'react-loading'
import "./Favoritos.css"
import {Card} from 'react-bootstrap'
export default function Favoritos(props){
    const { id } = useParams();
    const [dados,setDados] = useState([]);
    const [loading, setLoading] = useState(true);
    const removeFavoriteGame = async(id2) =>{
        const profileData = await fetch(Api.readProfileId(+id));
        const result = await profileData.json();
        delete result.id
        delete result.jogos
        delete result.usuario
        delete result.usuarioId
        const payload = {
            ...result,
            //jogosIds: [id2],
            jogosDisconnectIds: [id2]
        }
        const response = await fetch(Api.readProfileId(+id),{
            method: "PATCH",
            headers: new Headers({
                "content-type": "application/json"
            }),
            body: JSON.stringify(payload)
        }
        );
        const resultado = await response.json();
        console.log(resultado)
        setLoading(true)
        setTimeout(() =>{
            setLoading(false)
            props.history.push(`/games/${id}`)
        }, 2000)
        
    }
    useEffect(() => {
        const getProfile = async() =>{
        const response = await fetch(Api.readProfileId(id))
        const profile = await response.json()
        setDados(profile)
        setLoading(false)
        console.log(profile)
        }
        getProfile()
    }, [id]);
    if(loading){
        return <ReactLoading className="loading" type={"spinningBubbles"} color={"green"} height={'20%'} width={'20%'}/>
    }
    return(
        <React.Fragment>
            {dados.jogos.map(item =>(
            <div className="container">
                <Card>
                    <Card.Body>
                        <div key={item.id}>
                            <Link to={`game/${item.id}`}>
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
                            <button className="button" onClick={() => removeFavoriteGame(item.id)}>Excluir game</button>
                        </div>
                    </Card.Body>
                </Card>
            </div> 
            ))}
        </React.Fragment>
    )
}