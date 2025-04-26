import { useEffect, useState } from 'react';

const usePacientes = () => {
    const [pacientes, setPacientes] = useState([]);
    const [erro, setErro] = useState(null);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        const buscarPacientes = async () => {
            const userID = localStorage.getItem("userID");
            try {
                const resposta = await fetch('http://localhost:4000/dadosPacientes', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userID })
                });
                const textoResposta = await resposta.text();
                const dados = JSON.parse(textoResposta);
                if (!resposta.ok) throw new Error(dados.error);

                const pacientesFormatados = dados.pacientes.map(p => ({
                    _id: p._id,
                    nome: p.nome,
                    profissao: p.profissao,
                    data: p.ultima_sessao || 'Data não informada',
                    genero: p.genero,
                    estadoCivil: p.estadoCivil,
                    telefone: p.telefone,
                    email: p.email,
                    preferenciaContato: p.preferenciaContato,
                    dataNascimento: p.dataNascimento
                }));

                setPacientes(pacientesFormatados);
                setCarregando(false);
            } catch (erro) {
                console.error('Erro de conexão com o servidor:', erro);
                setErro(erro.message || 'Erro ao buscar pacientes');
                setCarregando(false);
            }
        };

        buscarPacientes();
    }, []);

    return { pacientes, setPacientes, erro, carregando };
};

export default usePacientes;