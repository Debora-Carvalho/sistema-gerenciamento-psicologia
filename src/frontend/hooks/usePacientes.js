import { useState, useEffect } from 'react';

const usePacientes = (userID) => {
    const [pacientes, setPacientes] = useState([]);
    const [erroCadastro, setErroCadastro] = useState('');
    const [editandoIndex, setEditandoIndex] = useState(null);

    const buscarPacientes = async () => {
        try {
            const resposta = await fetch('http://localhost:4000/dadosPacientes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userID }),
            });
            const dados = await resposta.json();
            setPacientes(dados.pacientes || []);
        } catch (erro) {
            console.error('Erro ao buscar pacientes:', erro);
        }
    };

    const cadastrarPaciente = async (paciente, onSuccess) => {
        try {
            const resp = await fetch("http://localhost:4000/cadastroPaciente", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...paciente, userID }),
            });
            const data = await resp.json();
            if (resp.ok) {
                setPacientes(prev => [...prev, data.pacienteCadastrado]);
                onSuccess();
            } else {
                setErroCadastro(data.error || 'Erro ao cadastrar.');
            }
        } catch (error) {
            setErroCadastro("Erro ao comunicar com servidor.");
        }
    };

    const atualizarPaciente = async (paciente, index, onSuccess) => {
        try {
            const resp = await fetch("http://localhost:4000/editarPaciente", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...paciente, userID, id: paciente._id }),
            });
            const data = await resp.json();
            if (resp.ok) {
                setPacientes(prev => {
                    const novos = [...prev];
                    novos[index] = data.pacienteAtualizado;
                    return novos;
                });
                onSuccess();
            } else {
                setErroCadastro(data.error || 'Erro ao editar.');
            }
        } catch (error) {
            setErroCadastro("Erro ao comunicar com servidor.");
        }
    };

    const excluirPaciente = async (id) => {
        try {
            const resp = await fetch("http://localhost:4000/excluirPaciente", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ pacienteID: id }),
            });
            if (resp.ok) {
                setPacientes(prev => prev.filter(p => p._id !== id));
            }
        } catch (erro) {
            console.error("Erro ao excluir:", erro);
        }
    };

    useEffect(() => {
        if (userID) buscarPacientes();
    }, [userID]);

    return {
        pacientes, setPacientes,
        cadastrarPaciente, atualizarPaciente, excluirPaciente,
        erroCadastro, setErroCadastro,
        editandoIndex, setEditandoIndex,
    };
};

export default usePacientes;