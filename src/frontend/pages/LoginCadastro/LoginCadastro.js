import React, { useState } from 'react';
import './LoginCadastro.css';
import { useNavigate } from "react-router-dom";

function LoginCadastro() {
    const [email, setEmail] = useState(""); 
    const [senha, setSenha] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // dados a serem enviados para a loginAutentica
        const userData = {
        email,
        senha
        };

    try {
      // realiza a requisição POST usando fetch
      const response = await fetch("http://localhost:4000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // define o tipo de conteúdo
        },
        body: JSON.stringify(userData), // converte os dados em JSON
      });

      // checa se a resposta foi bem-sucedida 
      if (response.ok) {
        const data = await response.json();

        if (data.success) {
          // se login for bem-sucedido, salva o userID no localStorage
          localStorage.setItem("userID", data.userID);
          navigate("/dashboard"); // redireciona para o dashboard, depois vai ser mudado para a url adequada para a dashboard 
        } else {
          alert(data.message || "Credenciais inválidas");
        }
      } else {
        alert("Erro ao tentar autenticar");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro na comunicação com o servidor.");
    }
  };
    return(
        
        <div className='container'>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                />
                <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Senha"
                />
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
}

export default LoginCadastro;