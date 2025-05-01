import { useState, useEffect } from 'react';
import BASE_URL from '../configRota';

export default function usePacienteDetalhes() {
    const [paciente, setPaciente] = useState(null);

    useEffect(() => {
        async function buscarPaciente() {
            const pacienteID = localStorage.getItem("pacienteID");

            if (!pacienteID) return;

            try {
                const response = await fetch(`${BASE_URL}/dadosPaciente`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ pacienteID }),
                });

                const data = await response.json();
                if (response.ok) {
                    setPaciente(data.paciente);
                } else {
                    console.error(data.error);
                }
            } catch (error) {
                console.error("Erro ao buscar Paciente:", error);
            }
        }

        buscarPaciente();
    }, []);

    return { paciente };
}

