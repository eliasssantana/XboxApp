import { Api} from '../Api/Api'
import React from "react";
import { useHistory } from 'react-router';
import "./login.css"
export default function Login(props) {

    const history = useHistory()
    const handleSubmit = async event => {
        event.preventDefault();

        const email = event.target.email.value;
        const senha = event.target.senha.value;

        const payload = {
            email,
            senha
        };
        
        console.log(payload)
        const response = await fetch(Api.loginUrl, {
            method: "POST",
            headers: new Headers({
                "Content-type": "application/json",
            }),
            body: JSON.stringify(payload),
        });

        const bodyResult = await response.json();
        console.log(bodyResult)
        localStorage.setItem("JWT", bodyResult.accessToken);

        props.history.push("/")

    };

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
                />
            </form>
        </div>
    );
}
