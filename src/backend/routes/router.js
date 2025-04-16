import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PaginaInicial from "../../frontend/pages/PaginaInicial/PaginaInicial.js";
import Home from "../../frontend/pages/LoginCadastro/LoginCadastro";
import EsqueciSenha from "../../frontend/pages/LoginEsqueciSenha/LoginEsqueciSenha";
import CodigoRecuperarSenha from "../../frontend/pages/LoginCodigoRecuperacaoSenha/LoginCodigoRecuperacaoSenha";
import NovaSenha from "../../frontend/pages/LoginCriarNovaSenha/LoginCriarNovaSenha";
import PaginaPacientesDetalhes from "../../frontend/pages/PaginaPacientesDetalhes/PaginaPacientesDetalhes.js";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/pagina-inicial" element={<PaginaInicial />} />
                <Route path="/recuperar-senha" element={<EsqueciSenha />} />
                <Route path="/recuperar-senha/codigo" element={<CodigoRecuperarSenha />} />
                <Route path="/recuperar-senha/nova-senha" element={<NovaSenha />} />
                <Route path="/pacientes-detalhes" element={<PaginaPacientesDetalhes />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
