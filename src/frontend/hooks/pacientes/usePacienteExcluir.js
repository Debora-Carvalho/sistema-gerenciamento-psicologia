import BASE_URL from '../configRota';
export const excluirPaciente = async (pacienteID, setPacientes) => {
    // Se pacienteID não for passado, tenta buscar do localStorage
    const idParaExcluir = pacienteID || localStorage.getItem("pacienteID");

    if (!idParaExcluir) {
        console.error("ID do paciente não fornecido nem encontrado no localStorage.");
        return;
    }

    try {
        const resposta = await fetch(`${BASE_URL}/excluirPaciente`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ pacienteID: idParaExcluir })
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            console.error("Erro ao excluir paciente:", dados.error);
            return;
        }

        console.log("Paciente excluído com sucesso:", dados.message);

        // Se setPacientes foi passado, remove da lista local
        if (setPacientes) {
            setPacientes(prevPacientes =>
                prevPacientes.filter(p => p._id !== idParaExcluir)
            );
        }

    } catch (erro) {
        console.error("Erro ao se comunicar com o servidor:", erro);
    }
};
