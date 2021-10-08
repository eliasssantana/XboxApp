import React from 'react'
import {Link} from 'react-router-dom'
import "./Home.css"
export default function Homes(){
    return (
        <div>
            <div className="container">
                <h1 className="welcome">Welcome</h1> 
                <div className="block">
                    <Link className="link" to='/login'>LOGIN</Link>
                    <Link className="link" to='/usuario/create'>CADASTRO</Link>
                </div>
            </div>
        </div>
    )
}
