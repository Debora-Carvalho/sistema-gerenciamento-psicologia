import BASE_URL from '../configRota';

const useUpdateUsuario = () => {
    const atualizarUsuario = async (dadosAtualizados) => {

        try {
            const response = await fetch(`${BASE_URL}/updateUsuario`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dadosAtualizados),
            });

            const data = await response.json();
            if (!response.ok || !data.success) {
                throw new Error(data.error || 'Erro ao atualizar usuário');
            }

            return data.usuarioAtualizado;
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            throw error;
        }
    };

    return { atualizarUsuario };
};

export default useUpdateUsuario;
