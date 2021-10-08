import React, {useEffect,useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import { Api} from '../Api/Api'
import ReactLoading from 'react-loading'
import { Button } from 'react-bootstrap';
// import "./GamesList.css"
export default function SeeProfile(props){
    const {id} = useParams()
    const [dados,setDados] = useState({});
    const [loading, setLoading] = useState(true);
    const handleDelete = async(id) =>{
        const response = await fetch(`http://localhost:5000/profile/${id}`, {
            method: "DELETE"
        })
        const del = await response.json();
        console.log(del)
        props.history.push("/perfis")
    }

    useEffect(() => {
        const getProfile = async() =>{
            const response = await fetch(Api.readProfileId(id))
            const profile = await response.json()
            setDados(profile)
            setLoading(false)
        }
        getProfile()
    }, [id]);
    if(loading){
        return <ReactLoading type={"spinningBubbles"} color={"green"} height={'20%'} width={'20%'}/>
    }
    return(
        <div className="container">
            <ul key={dados.id}>
                <li><Link to={`/games/${dados.id}`}><img src={dados.imagem} alt={dados.titulo}/></Link></li>
                <li>
                    <div>
                        <Button><Link to={`/perfil/update/${dados.id}`}>Editar Perfil</Link></Button>
                        <Button onClick={() => handleDelete(dados.id)}>Delete</Button>
                    </div>
                </li>
            </ul>
        </div> 
    )

}