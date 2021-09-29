import React from 'react'
import {Link} from 'react-router-dom'

export default function Homes(){
    return (
        <div>
            <div className="container">
                <div>
                    <Link className="link" to='/login'>LOGIN</Link>
                </div>
                <div>
                    <Link className="link" to='/addUser'>CADASTRO</Link>
                </div>
            </div>
        </div>
    )
}
