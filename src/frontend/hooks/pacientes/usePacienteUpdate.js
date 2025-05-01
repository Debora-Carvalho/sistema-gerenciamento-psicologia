import BASE_URL from '../configRota';
export const atualizarPaciente = async (novoPaciente, setPacientes, resetarFormulario, setErroCadastro) => {
    const userID = localStorage.getItem("userID");

    try {
        const response = await fetch(`${BASE_URL}/editarPaciente`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...novoPaciente, userID, id: novoPaciente._id }),
        });

        const data = await response.json();

        if (response.ok) {
            setPacientes((prevPacientes) => 
                prevPacientes.map((paciente) => 
                    paciente._id === novoPaciente._id ? data.pacienteAtualizado : paciente
                )
            );
            resetarFormulario();
        } else {
            setErroCadastro(data.error || 'Erro ao editar paciente.');
        }
    } catch (error) {
        console.error("Erro ao editar paciente:", error);
        setErroCadastro("Erro ao comunicar com o servidor.");
    }
};
