import React, {useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import { Api} from '../Api/Api'
import ReactLoading from 'react-loading'
import "./SeeProfiles.css"
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
        return <ReactLoading className="loading" type={"spinningBubbles"} color={"green"} height={'20%'} width={'20%'}/>
    }
    return(
        <>  
            <Link to={`/perfil/create/${dados[0]?.usuarioId}`}><button>Cadastrar perfil</button></Link>
            {dados.map(item =>(
                <div className="container">
                    <div key={item.id}>
                        <Link to={`/perfil/${item.id}`}>
                            <div><img src={item.imagem} alt={item.id}/></div>
                            <div>{item.titulo}</div>
                        </Link>
                    </div>
                </div>
            ))}
        </>
    )

}