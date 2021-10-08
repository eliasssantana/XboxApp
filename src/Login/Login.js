import React, {useState, createContext} from "react";
import "./login.css"
export const Contexto = createContext();
export default function Login(props) {
    const [notFound, setNotFound] = useState(false)
    const [result, setResult] = useState([])
    const handleSubmit = async(event) => {
        event.preventDefault();

        const email = event.target.email.value;
        const senha = event.target.senha.value;

        const payload = {
            email,
            senha
        };
        
        console.log(payload)
        const response = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: new Headers({
                "Content-type": "application/json",
            }),
            body: JSON.stringify(payload),
        });

        const bodyResult = await response.json();
        setResult(bodyResult);
        console.log(bodyResult)
        if(bodyResult.accessToken){
            localStorage.setItem("JWT", bodyResult.accessToken);
            props.history.push("/perfis")
        }
        else{
            setNotFound(true)
            setTimeout(() => {
                props.history.push("/login")
                setNotFound(false)
            }, 3000)
        }

    };
    if(notFound){
        return<h1>User Not Found</h1>
    }

    return (
        <div className="adicionar">
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">
                    E-mail:
                </label>
                <br />
        
                <input
                    type="text"
                    id="email"
                    name="email"
                    className="form__input"
                />

                <br />

                <label htmlFor="senha">
                    Senha:
                </label>
                <br />

                <input
                    type="password"
                    id="senha"
                    name="senha"
                />

                <br />

                <input
                    type="submit"
                    value="Login"
                    // onClick={clicked}
                />
            </form>
        </div>
    );
}
