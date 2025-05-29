import React, { useState, useEffect } from 'react';
import useAdicionarAbordagem from '../../hooks/pacientes/useAdicionarAbordagem';
import useBuscarHisto from '../../hooks/pacientes/useBuscarHisto';

function ModalAbordagem({ mostrarModalAbordagem, setMostrarModalAbordagem, setPopupAberto }) {
  const [abordagem, setAbordagem] = useState('');
  const [abordagemOriginal, setAbordagemOriginal] = useState('');
  const [erro, setErro] = useState('');
  const { adicionarAbordagem } = useAdicionarAbordagem();
  const { buscarHistoricoSaude } = useBuscarHisto();

  useEffect(() => {
    async function carregarAbordagem() {
      const pacienteId = localStorage.getItem('pacienteID');
      if (pacienteId && mostrarModalAbordagem) {
        const result = await buscarHistoricoSaude(pacienteId);
        if (result.success && result.historicoSaude) {
          const valor = result.historicoSaude.abordagem || '';
          setAbordagem(valor);
          setAbordagemOriginal(valor);
        } else {
          setAbordagem('');
          setAbordagemOriginal('');
        }
      }
    }

    carregarAbordagem();
  }, [mostrarModalAbordagem]);

  async function handleSalvar() {
    const texto = abordagem.trim();

    if (!texto) {
      setErro('O campo de abordagem não pode estar vazio.');
      return;
    }

    if (texto === abordagemOriginal.trim()) {
      setErro('A abordagem não foi alterada.');
      return;
    }

    const userID = localStorage.getItem('userID');
    const pacienteId = localStorage.getItem('pacienteID');

    const resultado = await adicionarAbordagem({ abordagem: texto, userID, pacienteId });

    if (resultado.success) {
      setPopupAberto(true);
      setMostrarModalAbordagem(false);
      setAbordagem('');
      setAbordagemOriginal('');
      setErro('');
    } else {
      alert(resultado.error || 'Erro ao salvar a abordagem.');
    }
  }

  if (!mostrarModalAbordagem) return null;

  return (
    <div className="modal-abordagem">
      <h3 className="title-abordagem">Abordagem</h3>

      {erro && <p style={{ color: 'red', marginBottom: '8px' }}>{erro}</p>}

      <textarea
        className="descricao-abordagem"
        placeholder="Adicione aqui as principais abordagens utilizadas com o paciente"
        value={abordagem}
        onChange={(e) => {
          setAbordagem(e.target.value);
          if (erro) setErro('');
        }}
        rows={6}
      />

      <div className="form-row buttons">
        <button onClick={() => setMostrarModalAbordagem(false)}>Cancelar</button>
        <button className="btn salvar" onClick={handleSalvar}>Salvar</button>
      </div>
    </div>
  );
}

export default ModalAbordagem;
