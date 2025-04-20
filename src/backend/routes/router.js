import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PaginaInicial from "../../frontend/pages/PaginaInicial/PaginaInicial.js";
import Home from "../../frontend/pages/LoginCadastro/LoginCadastro";
import EsqueciSenha from "../../frontend/pages/LoginEsqueciSenha/LoginEsqueciSenha";
import CodigoRecuperarSenha from "../../frontend/pages/LoginCodigoRecuperacaoSenha/LoginCodigoRecuperacaoSenha";
import NovaSenha from "../../frontend/pages/LoginCriarNovaSenha/LoginCriarNovaSenha";
import ProtectedRoute from "./protectedroute";
import PaginaPacientes from "../../frontend/pages/PaginaPacientes/PaginaPacientes";
import PaginaPacientesDetalhes from "../../frontend/pages/PaginaPacientesDetalhes/PaginaPacientesDetalhes.js";
import PaginaCalendario from '../../frontend/pages/PaginaCalendario/PaginaCalendario';




const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/recuperar-senha" element={<EsqueciSenha />} />
                <Route path="/recuperar-senha/codigo" element={<CodigoRecuperarSenha />} />
                <Route path="/recuperar-senha/nova-senha" element={<NovaSenha />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/pagina-inicial" element={<PaginaInicial />} />
                    <Route path="/pacientes" element={<PaginaPacientes />} />
                    <Route path="/pacientes-detalhes" element={<PaginaPacientesDetalhes />} />
                </Route>
                <Route path="/calendario" element={<PaginaCalendario />} />
            </Routes>

        </BrowserRouter>
    );
}

export default AppRoutes;