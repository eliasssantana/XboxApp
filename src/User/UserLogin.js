import { Api } from "../Api/Api";
import React, {useRef, useState}from "react";
import {Link} from 'react-router-dom'

export default function UserLogin(props) {
    const [erro, setErro] = useState(false)
    // const validate = (e)=>{
    //     if(e.target.senha.value === 68854){
    //         continue
    //     }
    // }

    const ref = useRef();
    const handleBlur = (event) => {
        if (event.target.validity.patternMismatch) {
            ref.current.focus()
            setErro(true)                          
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const nome = e.target.nome.value;
        const sobrenome = e.target.sobrenome.value;
        const cpf = e.target.cpf.value;
        const email = e.target.email.value;
        const senha = e.target.senha.value;
        const isAdmin = false

        const payload = {
            nome: nome,
            sobrenome: sobrenome,
            cpf: cpf,
            email: email,
            senha: senha,
            isAdmin: isAdmin
        };
    
        const response = await fetch("http://localhost:5000/users", {
            method: "POST",
            headers: new Headers({
                "Content-type": "application/json",
            }),
            body: JSON.stringify(payload),
        }),

        bodyResult = await response.json();
        console.log(bodyResult)
        if(response.status === 201){
            props.history.push("/login");
        }else{
            
        }
    }

    return(
            <>  
                <Link to="/usuarios"><button>Visualizar usuários</button></Link>
                <div className="adicionar">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="nome">
                            Nome:
                        </label>
                        <br />

                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            required
                        />

                        <br />

                        <label htmlFor="sobrenome">
                            Sobrenome:
                        </label>
                        <br />

                        <input
                            type="text"
                            id="sobrenome"
                            name="sobrenome"
                            required
                        />

                        <br />
                        <label htmlFor="cpf">
                            CPF:
                        </label>
                        <br />
                        <input
                            type="string"
                            id="cpf"
                            name="cpf"
                            required
                        />

                        <br />
                        <label htmlFor="email">
                            E-mail:
                        </label>
                        <br />
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                        />
                        <br/>
                        <label htmlFor="senha">
                            Senha:
                        </label>
                        <br />

                        <input
                            type="password"
                            id="senha"
                            name="senha"
                            onBlur={handleBlur}
                            ref={ref}
                            minLength={4}
                            maxLength={20}
                            pattern="([A-Z])\w+"
                            onChange={() => setErro(false)}
                            required
                        />
                        <br/>
                        <input
                            type="submit"
                            value="Criar usuário"
                        />
                        {erro && (
                        <p role="alert" style={{ color: "rgb(255, 0, 0)" }}>
                            vocẽ precisa informar um senha mais forte
                        </p>
                        )}
                    </form>
                </div>
            </>
    );
}
