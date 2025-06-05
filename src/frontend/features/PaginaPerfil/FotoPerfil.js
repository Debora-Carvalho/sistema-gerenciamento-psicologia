import React, { useEffect, useState } from "react";
import BASE_URL from "../../hooks/configRota";

function FotoPerfil({ userId }) {
    const [fotoUrl, setFotoUrl] = useState(null);

    useEffect(() => {
        if (!userId) return;

        fetch(`${BASE_URL}/dadosUsuario`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userID: userId })
        })
            .then(res => res.json())
            .then(data => {
                if (data.usuario && data.usuario.fotoPerfilUrl) {
                    setFotoUrl(data.usuario.fotoPerfilUrl);
                } else {
                    setFotoUrl(null);
                }
            })
            .catch(err => {
                console.error("Erro ao buscar usuário:", err);
                setFotoUrl(null);
            });

    }, [userId]);

    if (!fotoUrl) {
        return <div className="foto-perfil">Sem foto</div>;
    }

    return (
        <img
            className="foto-perfil"
            src={fotoUrl}
            alt="Foto de perfil"
            style={{ width: "100%", height: "100%", borderRadius: "50%" }}
        />
    );
}

export default FotoPerfil;
