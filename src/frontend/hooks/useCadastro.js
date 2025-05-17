import BASE_URL from './configRota';

export default function useCadastro() {

    const realizarCadastro = async (userData, setMensagemErro, setMensagemSucesso) => {
        try {
            const response = await fetch(`${BASE_URL}/cadastroUsuario`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setMensagemSucesso("Cadastro concluído! Acessando login...");
                setTimeout(() => window.location.reload(), 1500);
            } else {
                setMensagemErro(data.error || "Erro ao cadastrar!");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            setMensagemErro("Erro na comunicação com o servidor.");
        }
    };

    return { realizarCadastro };
}
