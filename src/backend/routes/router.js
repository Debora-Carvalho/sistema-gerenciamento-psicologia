import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../../frontend/pages/Login/Login";
import Cadastro from "../../frontend/pages/Cadastro/Cadastro";
import EsqueciSenha from "../../frontend/pages/LoginEsqueciSenha/LoginEsqueciSenha";
import CodigoRecuperarSenha from "../../frontend/pages/LoginCodigoRecuperacaoSenha/LoginCodigoRecuperacaoSenha";
import NovaSenha from "../../frontend/pages/LoginCriarNovaSenha/LoginCriarNovaSenha";


const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Cadastro" element={<Cadastro />} />
                <Route path="/recuperar-senha" element={<EsqueciSenha />} />
                <Route path="/recuperar-senha/codigo" element={<CodigoRecuperarSenha />} />
                <Route path="/recuperar-senha/nova-senha" element={<NovaSenha />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
