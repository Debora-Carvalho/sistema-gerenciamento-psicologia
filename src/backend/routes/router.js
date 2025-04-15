import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../../frontend/pages/LoginCadastro/LoginCadastro";
import EsqueciSenha from "../../frontend/pages/LoginEsqueciSenha/LoginEsqueciSenha";
import CodigoRecuperarSenha from "../../frontend/pages/LoginCodigoRecuperacaoSenha/LoginCodigoRecuperacaoSenha";
import NovaSenha from "../../frontend/pages/LoginCriarNovaSenha/LoginCriarNovaSenha";
import ProtectedRoute from "./protectedroute";


const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/recuperar-senha" element={<EsqueciSenha />} />
                <Route path="/recuperar-senha/codigo" element={<CodigoRecuperarSenha />} />
                <Route path="/recuperar-senha/nova-senha" element={<NovaSenha />} />
                <Route
                path="/dashboard"
                element={
                <ProtectedRoute>
                    <div>Dashboard</div> 
                    {/* aqui será colocado um componente protegido(que só será alcançado caso haja login). Só substituir a div */}
                </ProtectedRoute>
                }
        />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
