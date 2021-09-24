import { Api } from "../Api/Api";
import React from "react";
import { Redirect } from "react-router";

export default function AdicionarPersonagem(props) {


    const handleSubmit = async e => {
        e.preventDefault();

        const nome = e.target.nome.value;
        const sobrenome = e.target.sobrenome.value;
        const cpf = e.target.cpf.value;
        const email = e.target.email.value;
        const senha = e.target.senha.value;

        const payload = {
            nome,
            sobrenome,
            cpf,
            email,
            senha  
        };

        const response = await fetch(Api.createUserUrl, {
            method: "POST",
            headers: new Headers({
                "Content-type": "application/json",
            }),
            body: JSON.stringify(payload),
        }),

        const bodyResult = await response.json();

        props.history.push("/login")

    };

    return (
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
                />
                <br/>
                <input
                    type="submit"
                    value="Criar usuário"
                    className="form__submit button button--success"
                />
            </form>
        </div>
    );
}
