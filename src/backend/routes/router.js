import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PaginaInicial from "../../frontend/pages/PaginaInicial/PaginaInicial.js";
import Home from "../../frontend/pages/LoginCadastro/LoginCadastro";
import EsqueciSenha from "../../frontend/pages/LoginEsqueciSenha/LoginEsqueciSenha";
import CodigoRecuperarSenha from "../../frontend/pages/LoginCodigoRecuperacaoSenha/LoginCodigoRecuperacaoSenha";
import NovaSenha from "../../frontend/pages/LoginCriarNovaSenha/LoginCriarNovaSenha";
import ProtectedRoute from "./protectedRouteReact.js";
import PaginaPacientes from "../../frontend/pages/PaginaPacientes/PaginaPacientes";
import PaginaPacientesDetalhes from "../../frontend/pages/PaginaPacientesDetalhes/PaginaPacientesDetalhes.js";
import PaginaCalendario from '../../frontend/pages/PaginaCalendario/PaginaCalendario';
import Calendario from '../../frontend/components/Calendario/Calendario';
import Agendamento from '../../frontend/pages/PaginaAgendamento/Agendamentos.jsx';
import AgendamentosConcluidos from '../../frontend/pages/PaginaAgendamentosConcluidos/PaginaAgendamentosConcluidos.js'
import AgendamentosCancelados from '../../frontend/pages/PaginaAgendamentosCancelados/PaginaAgendamentosCancelados.js'
import CriarAgendamentos from '../../frontend/pages/CriarAgendamentos/CriarAgendamentos.js'
import Editar from '../../frontend/components/EditarAgendamentos/Editar.js'


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
                    <Route path="/calendario" element={<PaginaCalendario />} />
                    <Route path="/calendario1" element={<Calendario />} />
                    <Route path="/agendar" element={<CriarAgendamentos />} />
                    <Route path="/editar" element={<Editar />} />
                    <Route path="/agendamentos" element={<Agendamento />} />
                    <Route path="/agendamentos-concluidos" element={<AgendamentosConcluidos/>} />
                    <Route path="/agendamentos-cancelados" element={<AgendamentosCancelados/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;