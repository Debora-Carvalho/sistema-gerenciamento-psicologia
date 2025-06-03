import React, { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import SearchBar from "../SearchBar/SeachBar";
import PacientesList from "../PacientesList/PacientesList";
import PacientesActions from "../PacientesActions/PacientesActions";
import FiltroDropdown from "../FiltroDropdown/FiltroDropdown";
import ConfirmExport from "../ConfirmExport/ConfirmExport";
import ConfirmDelete from "../ConfirmDelete/ConfirmDelete";
import Form from "../PacientesFormulario/Form";

export default function ResponsividadePacientes({
    pacientes,
    setPacientes,
    onFiltrar,
    onEditar,
    onExcluir,
    mostrarFormulario,
    setMostrarFormulario
}) {
    const [search, setSearch] = useState("");
    const [visible, setVisible] = useState(4);
    const [showFilter, setShowFilter] = useState(false);
    const [showExportConfirm, setShowExportConfirm] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [pacienteEmEdicao, setPacienteEmEdicao] = useState(null);
    const [pacienteParaExcluir, setPacienteParaExcluir] = useState(null);

    // Estado que controla quais colunas são visíveis
    const [colunasVisiveis, setColunasVisiveis] = useState({
        nome: true,
        data: true,
        idade: true,
    });

    // Filtra pacientes pela busca no nome e limita pela visibilidade
    const filtrados = pacientes
        .filter((p) => p.nome.toLowerCase().includes(search.toLowerCase()))
        .slice(0, visible);

    // Função para salvar ou editar paciente
    const salvarPaciente = (p) => {
        if (pacienteEmEdicao) {
            onEditar(pacienteEmEdicao._id, p);
        } else {
            setPacientes((prev) => [...prev, { ...p, id: Date.now() }]);
        }
        setPacienteEmEdicao(null);
        setMostrarFormulario(false);
    };

    // Exportar PDF com lista de pacientes
    const exportarPDF = () => {
        const doc = new jsPDF();
        doc.text("Pacientes", 14, 15);
        const body = pacientes.map((p) => [p.nome, p.idade, p.dataSessao]);
        autoTable(doc, {
            head: [["Nome", "Idade", "Próxima Sessão"]],
            body,
            startY: 25,
        });
        doc.save("pacientes.pdf");
        setShowExportConfirm(false);
    };

    // Pede confirmação para excluir paciente
    const pedirExclusao = (pac) => {
        setPacienteParaExcluir(pac);
        setShowDeleteConfirm(true);
    };

    // Excluir paciente confirmado
    const excluirPaciente = () => {
        onExcluir(pacienteParaExcluir._id);
        setShowDeleteConfirm(false);
        setPacienteParaExcluir(null);
    };

    return (
        <main style={{ background: "#fff6f8", minHeight: "100vh" }}>

            <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
            <h2 style={{ margin: "0 1rem", color: "#0047b3" }}>Pacientes</h2>

            <PacientesActions
                onFilter={() => setShowFilter(true)}
                onExport={() => setShowExportConfirm(true)}
                onAddPaciente={() => {
                    setPacienteEmEdicao(null);
                    setMostrarFormulario(true);
                }}
            />


            {showFilter && (
                <FiltroDropdown
                    filtrosAtuais={colunasVisiveis}
                    onClose={() => setShowFilter(false)}
                    onApply={(novosFiltros) => {
                        setColunasVisiveis(novosFiltros);
                    }}
                />
            )}


            <PacientesList
                pacientes={filtrados}
                onEdit={onEditar}
                onDelete={pedirExclusao}
                colunasVisiveis={colunasVisiveis}
            />

            {visible < pacientes.length && (
                <button
                    className="ver-mais"
                    onClick={() => setVisible((v) => v + 4)}
                    style={{ display: "block", margin: "1rem auto" }}
                >
                    Ver mais
                </button>
            )}

            {showExportConfirm && (
                <ConfirmExport
                    onClose={() => setShowExportConfirm(false)}
                    onConfirm={exportarPDF}
                />
            )}

            {showDeleteConfirm && (
                <ConfirmDelete
                    onClose={() => setShowDeleteConfirm(false)}
                    onConfirm={excluirPaciente}
                />
            )}

            {/* Se usar formulário para adicionar/editar */}
            {mostrarFormulario && (
                <Form
                    paciente={pacienteEmEdicao}
                    onSave={salvarPaciente}
                    onCancel={() => setMostrarFormulario(false)}
                />
            )}
        </main>
    );
}
