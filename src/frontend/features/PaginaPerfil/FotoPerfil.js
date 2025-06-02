import React, { useEffect, useState } from "react";

import BASE_URL from "../../hooks/configRota";

function FotoPerfil({ userId }) {
    const [fotoUrl, setFotoUrl] = useState(null);

    useEffect(() => {
        if (!userId) return;

        let urlCriado = null;

        fetch(`${BASE_URL}/foto/${userId}`)
            .then(res => {
                if (!res.ok) throw new Error("Erro ao buscar foto");
                return res.blob();
            })
            .then(blob => {
                urlCriado = URL.createObjectURL(blob);
                setFotoUrl(urlCriado);
            })
            .catch(err => {
                console.error(err);
                setFotoUrl(null);
            });

        return () => {
            if (urlCriado) URL.revokeObjectURL(urlCriado);
        };
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
