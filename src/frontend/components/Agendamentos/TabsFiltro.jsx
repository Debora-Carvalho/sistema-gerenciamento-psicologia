import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Componentes-agendamento.css';

function TabsFiltro() {
    const [abaAtiva, setAbaAtiva] = useState("hoje");
    const navigate = useNavigate();

    useEffect(() => {
        const abaSalva = localStorage.getItem("abaAtiva");
        if (abaSalva) {
            setAbaAtiva(abaSalva);
        }
    }, []);

    const mudarAba = (aba, rota) => {
        setAbaAtiva(aba);
        localStorage.setItem("abaAtiva", aba);
        if (rota) navigate(rota);
    };

    return (
        <div className="tabs-filtro">
            <button
                className={abaAtiva === "hoje" ? "ativo" : ""}
                onClick={() => mudarAba("hoje", "/agendamentos")}
            >
                Hoje
            </button>

            <button
                className={abaAtiva === "proximos" ? "ativo" : ""}
                onClick={() => mudarAba("proximos")}
            >
                Próximos dias
            </button>

            <button
                className={abaAtiva === "concluidos" ? "ativo" : ""}
                onClick={() => mudarAba("concluidos", "/agendamentos-concluidos")}
            >
                Concluídos
            </button>

            <button
                className={abaAtiva === "cancelados" ? "ativo" : ""}
                onClick={() => mudarAba("cancelados", "/agendamentos-cancelados")}
            >
                Cancelados
            </button>
        </div>
    );
}

export default TabsFiltro;
