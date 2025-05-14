/*import React, { useEffect } from 'react';
import './LinksSessao.css';

const LinksSessao = ({ plataforma, linkSessao, onLinkChange }) => {
    // Função para gerar links automáticos
    const gerarLinkSessao = (plataformaSelecionada) => {
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let codigo = '';
        
        for (let i = 0; i < 10; i++) {
            codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        }

        switch(plataformaSelecionada) {
            case 'Google Meet':
                return `https://meet.google.com/new?hs=${codigo}`;
            case 'Teams':
                return `https://teams.microsoft.com/l/meeting/new?meetingCode=${codigo}`;
            case 'Zoom':
                return `https://zoom.us/j/${codigo}`;
            default:
                return '';
        }
    };

    // Gera link quando a plataforma muda
    useEffect(() => {
        if (plataforma && plataforma !== 'Outros') {
            const novoLink = gerarLinkSessao(plataforma);
            onLinkChange(novoLink);
        } else if (plataforma === 'Outros') {
            onLinkChange('');
        }
    }, [plataforma, onLinkChange]);

    return (
        <div className="link-sessao-container">
            <div className="link-container">
                <input 
                    type="text" 
                    placeholder="Link será gerado automaticamente" 
                    value={linkSessao} 
                    onChange={(e) => onLinkChange(e.target.value)}
                    readOnly={plataforma && plataforma !== 'Outros'}
                    className="link-input"
                />
                {linkSessao && (
                    <a 
                        href={linkSessao} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="test-link"
                    >
                        Testar Link
                    </a>
                )}
            </div>
        </div>
    );
};

export default LinksSessao;
*/