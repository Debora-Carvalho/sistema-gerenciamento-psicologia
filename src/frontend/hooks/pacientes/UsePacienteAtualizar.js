export const atualizarPaciente = async (setErroCadastro, novoPaciente, editandoIndex, resetarFormulario, pacientes, setPacientes) => {
    const userID = localStorage.getItem("userID");
    const pacienteID = localStorage.getItem("pacienteID");  // Obtendo o pacienteID do localStorage

    if (pacientes && setPacientes !== undefined) {
        try {
            const response = await fetch("/api/editarPaciente", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...novoPaciente, userID, id: novoPaciente._id }),
            });

            const data = await response.json();

            if (response.ok) {
                const novosPacientes = [...pacientes];
                novosPacientes[editandoIndex] = data.pacienteAtualizado;
                setPacientes(novosPacientes);
                resetarFormulario();
            } else {
                setErroCadastro(data.error || 'Erro ao editar paciente.');
            }
            return true;
        } catch (error) {
            console.error("Erro ao editar paciente:", error);
            setErroCadastro("Erro ao comunicar com o servidor.");
            return false
        }
    } else {
        // Versão simplificada que atualiza os dados com apenas o novoPaciente
        try {
            const response = await fetch("http://localhost:4000/editarPaciente", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...novoPaciente,
                    userID,
                    id: pacienteID,  // Usando o pacienteID do localStorage
                }),
            });

            const data = await response.json();

            if (response.ok) {
                resetarFormulario();
            } else {
                setErroCadastro(data.error || 'Erro ao editar paciente.');
            }
        } catch (error) {
            console.error("Erro ao editar paciente:", error);
            setErroCadastro("Erro ao comunicar com o servidor.");
        }
    }
};


// export const atualizarPaciente = async (novoPaciente, pacientes,editandoIndex,setPacientes,resetarFormulario,setErroCadastro) => {
//     const userID = localStorage.getItem("userID");

//     try {
//         const response = await fetch("http://localhost:4000/editarPaciente", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ ...novoPaciente, userID, id: novoPaciente._id }),
//         });

//         const data = await response.json();

//         if (response.ok) {
//             const novosPacientes = [...pacientes];
//             novosPacientes[editandoIndex] = data.pacienteAtualizado;
//             setPacientes(novosPacientes);
//             resetarFormulario();
//         } else {
//             setErroCadastro(data.error || 'Erro ao editar paciente.');
//         }
//     } catch (error) {
//         console.error("Erro ao editar paciente:", error);
//         setErroCadastro("Erro ao comunicar com o servidor.");
//     }
// };