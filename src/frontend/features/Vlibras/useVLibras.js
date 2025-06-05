import { useState, useEffect } from 'react';

export default function useVLibras() {
    const [ativado, setAtivado] = useState(() => {
        return localStorage.getItem('Vlibras_ativado') === 'true';
    });

    const aplicarEstadoVLibras = (isAtivado) => {
        if (isAtivado) {
            mostrarBotaoVLibras();
        } else {
            esconderBotaoVLibras();
        }
    };

    useEffect(() => {

        aplicarEstadoVLibras(ativado);

        const observer = new MutationObserver(() => {
            const botao = document.getElementById('vw-access-button');
            if (botao) {
                aplicarEstadoVLibras(ativado);
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });

        return () => observer.disconnect();
    }, [ativado]);

    const esconderBotaoVLibras = () => {
        const botao = document.getElementById('vw-access-button');
        if (botao) {
            botao.style.display = 'none';
        }
    };

    const mostrarBotaoVLibras = () => {
        const botao = document.getElementById('vw-access-button');
        if (botao) {
            botao.style.display = 'flex';
        }
    };

    const toggleLibras = () => {
        const novoEstado = !ativado;
        localStorage.setItem('Vlibras_ativado', novoEstado.toString());
        setAtivado(novoEstado);

        aplicarEstadoVLibras(novoEstado);
    };

    return { ativado, toggleLibras };
}
