import React, {useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import { Api} from '../Api/Api'
import ReactLoading from 'react-loading'
// import "./GamesList.css"
export default function ProfileList(){
    const [dados,setDados] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getGame = async() =>{
            const response = await fetch(Api.readProfileUrl())
            const profiles = await response.json()
            setDados(profiles)
            setLoading(false)
        }
        getGame()
    }, []);
    if(loading){
        return <ReactLoading type={"spinningBubbles"} color={"green"} height={'20%'} width={'20%'}/>
    }
    return(dados.map(item =>(
        <div className="container">
            <ul key={item.id}>
                <Link to={`/perfil/${item.id}`}>
                    <li><img src={item.imagem} alt={item.id}/></li>
                    <li>{item.titulo}</li>
                </Link>
            </ul>
        </div> 
    )))

}