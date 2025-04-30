export default function useNovaSenha() {
    const atualizarSenha = async ({ email, novaSenha }, setMensagemErro, setPopupAberto, setErroSenhaInvalida) => {
        try {
            const response = await fetch('/api/recuperarNovaSenha', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, novaSenha }),
            });

            const data = await response.json();

            if (response.ok) {
                setMensagemErro('');
                console.log('Senha atualizada com sucesso!');
                setPopupAberto(true);
                setErroSenhaInvalida(false);
            } else {
                setMensagemErro(data.error || 'Erro ao atualizar a senha');
            }
        } catch (err) {
            console.error('Erro ao enviar nova senha', err);
            setMensagemErro('Erro de conexão com o servidor.');
        }
    };

    return { atualizarSenha };
}
