import React from 'react';
import ResponsividadePacientes from '../ResponsividadePacientes/ResponsividadePacientes';

export function MobileView({
    pacientes,
    setPacientes,
    onEditar,
    onExcluir,
    onFiltrar,
    mostrarFormulario,
    setMostrarFormulario,
    pacienteEmEdicao,
    setPacienteEmEdicao,
    salvarPaciente,
    fecharFormulario
}) {
    return (
        <ResponsividadePacientes
            pacientes={pacientes}
            setPacientes={setPacientes}
            onFiltrar={onFiltrar}
            onEditar={onEditar}
            onExcluir={onExcluir}
            mostrarFormulario={mostrarFormulario}
            setMostrarFormulario={setMostrarFormulario}
        />

    );
}
