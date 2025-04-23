export const excluirPaciente = async (pacienteID, setPacientes) => {
    try {
        const resposta = await fetch("http://localhost:4000/excluirPaciente", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ pacienteID })
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            console.error("Erro ao excluir paciente:", dados.error);
            return;
        }

        // Remove o paciente da lista local
        setPacientes(prevPacientes => prevPacientes.filter(p => p._id !== pacienteID));
    } catch (erro) {
        console.error("Erro ao se comunicar com o servidor:", erro);
    }
};