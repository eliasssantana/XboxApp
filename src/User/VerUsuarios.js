import React, {useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import { Api} from '../Api/Api'
import ReactLoading from 'react-loading'
// import "./GamesList.css"
export default function ProfileList(props){
    const [dados,setDados] = useState([]);
    const [loading, setLoading] = useState(true);
    const handleDelete = async(id) =>{
        const response = await fetch(`http://localhost:5000/users/${id}`, {
            method: "DELETE"
        })
        const del = await response.json();
        console.log(del)
        props.history.push("/")
    }
    useEffect(() => {
        const getUsers = async() =>{
            const response = await fetch("http://localhost:5000/users")
            const users = await response.json()
            setDados(users)
            setLoading(false)
        }
        getUsers()
    }, []);
    if(loading){
        return <ReactLoading type={"spinningBubbles"} color={"green"} height={'20%'} width={'20%'}/>
    }
    return(
        <>  
            {dados.map(item =>(
                <div className="container">
                    <ul key={item.id}>
                        <Link to={`/usuario/${item.id}`}>
                            <li>{item.nome}</li>
                            <li>{item.sobrenome}</li>
                        </Link>
                        <button onClick={() => handleDelete(item.id)}>Excluir usuário</button>
                    </ul>
                </div>
            ))}
        </>
    )
}
    