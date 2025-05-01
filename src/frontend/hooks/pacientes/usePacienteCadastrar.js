import BASE_URL from '../configRota';
export const cadastrarPaciente = async (novoPaciente, pacientes,editandoIndex,setPacientes,resetarFormulario,setErroCadastro) => {
    const userID = localStorage.getItem("userID");

    if (!novoPaciente.nome || !novoPaciente.telefone) {
        setErroCadastro('Por favor, preencha o nome e o telefone do paciente.');
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}/cadastroPaciente`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...novoPaciente, userID }),
        });

        const data = await response.json();

        if (response.ok) {
            setPacientes([...pacientes, data.pacienteCadastrado]);
            resetarFormulario();
        } else {
            setErroCadastro(data.error || 'Erro ao cadastrar paciente.');
        }
    } catch (error) {
        console.error("Erro ao cadastrar paciente:", error);
        setErroCadastro("Erro ao comunicar com o servidor.");
    }
};