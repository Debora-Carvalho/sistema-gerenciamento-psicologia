import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import MobileHeader from "../MobileHeader/MobileHeader";
import SearchBar from "../SearchBar/SeachBar";
import PacientesList from "../PacientesList/PacientesList";
import PacientesActions from "../PacientesActions/PacientesActions";
import FiltroDropdown from "../FiltroDropdown/FiltroDropdown";
import ConfirmExport from "../ConfirmExport/ConfirmExport";
import ConfirmDelete from "../ConfirmDelete/ConfirmDelete";   // << novo
import Form from "../PacientesFormulario/Form";

export default function ResponsividadePacientes() {
    /* ------------ estado geral ------------ */
    const [search, setSearch] = useState("");
    const [pacientes, setPacientes] = useState([]);
    const [visible, setVisible] = useState(4);

    /* ------------ pop‑ups ------------ */
    const [showFilter, setShowFilter] = useState(false);
    const [showExportConfirm, setShowExportConfirm] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showForm, setShowForm] = useState(false);

    /* ------------ auxiliares ------------ */
    const [pacienteEmEdicao, setPacienteEmEdicao] = useState(null);
    const [pacienteParaExcluir, setPacienteParaExcluir] = useState(null);

    /* ------------ lista fake inicial ------------ */
    useEffect(() => {
        const fake = Array.from({ length: 12 }).map((_, i) => ({
            id: i,
            nome: "Andreia Oliveira Justina",
            dataSessao: "27/09/2025",
            idade: 42,
        }));
        setPacientes(fake);
    }, []);

    /* ------------ filtragem + paginação ------------ */
    const filtrados = pacientes
        .filter((p) => p.nome.toLowerCase().includes(search.toLowerCase()))
        .slice(0, visible);

    /* ------------ salvar (novo ou editar) ------------ */
    const salvarPaciente = (p) => {
        if (pacienteEmEdicao) {
            setPacientes((prev) =>
                prev.map((item) =>
                    item.id === pacienteEmEdicao.id ? { ...p, id: item.id } : item
                )
            );
        } else {
            setPacientes((prev) => [...prev, { ...p, id: Date.now() }]);
        }
        setPacienteEmEdicao(null);
    };

    /* ------------ exportar PDF ------------ */
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

    /* ------------ excluir (abre popup) ------------ */
    const pedirExclusao = (pac) => {
        setPacienteParaExcluir(pac);
        setShowDeleteConfirm(true);
    };

    /* ------------ confirmar exclusão ------------ */
    const excluirPaciente = () => {
        setPacientes((prev) => prev.filter((x) => x.id !== pacienteParaExcluir.id));
        setShowDeleteConfirm(false);
        setPacienteParaExcluir(null);
    };

    return (
        <main style={{ background: "#fff6f8", minHeight: "100vh" }}>
            <MobileHeader />

            <SearchBar
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <h2 style={{ margin: "0 1rem", color: "#0047b3" }}>Pacientes</h2>

            <PacientesActions
                onFilter={() => setShowFilter(true)}
                onExport={() => setShowExportConfirm(true)}
                onAddPaciente={() => {
                    setPacienteEmEdicao(null);   // novo
                    setShowForm(true);
                }}
            />

            <PacientesList
                pacientes={filtrados}
                onEdit={(pac) => {
                    setPacienteEmEdicao(pac);    // edição
                    setShowForm(true);
                }}
                onDelete={pedirExclusao}       // abrir popup de exclusão
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

            {showFilter && (
                <FiltroDropdown onClose={() => setShowFilter(false)} />
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

            {showForm && (
                <Form
                    onClose={() => {
                        setShowForm(false);
                        setPacienteEmEdicao(null);
                    }}
                    onSave={salvarPaciente}
                    paciente={pacienteEmEdicao}
                />
            )}
        </main>
    );
}
