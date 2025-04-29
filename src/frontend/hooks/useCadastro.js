export default function useCadastro() {

    const realizarCadastro = async (userData, setMensagemErro) => {
        try {
            const response = await fetch("/api/server/cadastroUsuario", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setMensagemErro("Cadastro concluído! Acessando login...");
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
