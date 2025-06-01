import { useState, useEffect } from 'react';
import useAgendamentos from '../../hooks/agendamentos/useAgendamentos';

export default function useMapearAgendamentos() {
    const [agendamentos, setAgendamentos] = useState([]);
    const { buscarAgendamentos } = useAgendamentos(); 

    useEffect(() => {
        const userID = localStorage.getItem("userID");

        if (userID) {
            buscarAgendamentos(userID).then(({ agendamentos, success }) => {
                if (success) {
                    setAgendamentos(agendamentos);
                }
            });
        }
    }, [buscarAgendamentos]);

    return agendamentos;
}
