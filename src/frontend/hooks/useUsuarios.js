import { useState, useEffect } from 'react';

export default function useUsuarios() {
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        async function buscarUsuario() {
            const userID = localStorage.getItem("userID");

            if (!userID) return;

            try {
                const response = await fetch("/api/dadosUsuarios", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userID }),
                });

                const data = await response.json();
                if (response.ok) {
                    setUsuario(data.usuario);
                } else {
                    console.error(data.error);
                }
            } catch (error) {
                console.error("Erro ao buscar usuário:", error);
            }
        }

        buscarUsuario();
    }, []);

    return { usuario };
}

