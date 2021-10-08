import React from 'react'
import {Link} from 'react-router-dom'
function Admin() {
    return (
        <> 
            <di>
                <h1>Seja bem-vindo ao portal do administrador</h1>
            </di>
            <div>
                <Link><button>Editar Game</button></Link>
            </div>
        </>
    )
}

export default Admin
