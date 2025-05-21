import BASE_URL from './configRota';

export default function useDeleteUsuario() {
    const deleteUsuario = async () => {
        const id_usuario = localStorage.getItem("userID");
        try {
            const response = await fetch(`${BASE_URL}/excluirUsuarios`, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id_usuario }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                alert("Usuário excluído com sucesso!");
                await localStorage.removeItem("userID")
                window.location.reload();
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error("Erro ao excluir o usuário:", error);
            alert("Erro ao tentar excluir o usuário");
        } 
    };

    return { deleteUsuario };
}
