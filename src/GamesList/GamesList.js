import React, {useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import { Carousel, CarouseL } from 'react-bootstrap';
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
            <Carousel>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={item.capa}
                    alt="First slide"
                    />
                    <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={item.capa}
                    alt="Second slide"
                    />

                    <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={item.capa}
                    alt="Third slide"
                    />

                    <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                </Carousel>
            {/* <ul key={item.id}>
                <Link to={`game/${item.id}`}>
                    <li><img src={item.capa}/></li>
                    <li>{item.descricao}</li>
                    <li>{item.ano}</li>
                    <li>{item.nota_imdb}</li>
                </Link>
                <Link to={`gameUpdate/${item.id}`}><button>Update</button></Link>
            </ul> */}
        </div> 
    )))

}