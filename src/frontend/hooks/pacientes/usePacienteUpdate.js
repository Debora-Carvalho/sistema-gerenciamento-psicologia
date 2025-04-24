export const atualizarPaciente = async (novoPaciente, setPacientes, resetarFormulario, setErroCadastro) => {
    const userID = localStorage.getItem("userID");

    try {
        const response = await fetch("http://localhost:4000/editarPaciente", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...novoPaciente, userID, id: novoPaciente._id }),  // Passando o ID do paciente
        });

        const data = await response.json();

        if (response.ok) {
            // A lógica agora lida apenas com os dados atualizados, sem necessidade de pacientes e editandoIndex
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
