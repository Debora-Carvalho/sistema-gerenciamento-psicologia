import React, { useState, useEffect } from 'react';
import useBuscarHisto from '../../hooks/pacientes/useBuscarHisto';
import useHistoSaudePaciente from '../../hooks/pacientes/useHistoSaudePaciente';

function ModalHistoricoSaude({ mostrarModalSaude, setMostrarModalSaude, setPopupAberto, setMostrarFormulario }) {
  const { buscarHistoricoSaude } = useBuscarHisto();
  const { adicionarHistoricoSaude } = useHistoSaudePaciente();

  const [infoMedica, setInfoMedica] = useState('');
  const [condiMedica, setCondiMedica] = useState('');
  const [trataAnterior, setTrataAnterior] = useState('');

  const [infoOriginal, setInfoOriginal] = useState('');
  const [condiOriginal, setCondiOriginal] = useState('');
  const [trataOriginal, setTrataOriginal] = useState('');

  const [erro, setErro] = useState('');

  useEffect(() => {
    if (!mostrarModalSaude) return;

    async function carregarHistorico() {
      const pacienteID = localStorage.getItem('pacienteID');
      if (pacienteID) {
        const result = await buscarHistoricoSaude(pacienteID);
        if (result.success && result.historicoSaude) {
          const info = result.historicoSaude.infoMedica || '';
          const condi = result.historicoSaude.condiMedica || '';
          const trata = result.historicoSaude.trataAnterior || '';

          setInfoMedica(info);
          setCondiMedica(condi);
          setTrataAnterior(trata);

          setInfoOriginal(info);
          setCondiOriginal(condi);
          setTrataOriginal(trata);
        } else {
          setInfoMedica('');
          setCondiMedica('');
          setTrataAnterior('');
          setInfoOriginal('');
          setCondiOriginal('');
          setTrataOriginal('');
        }
      }
    }

    carregarHistorico();
  }, [mostrarModalSaude]);

  async function handleSalvarHistorico() {
    const info = infoMedica.trim();
    const condi = condiMedica.trim();
    const trata = trataAnterior.trim();

    if (!info && !condi && !trata) {
      setErro('Preencha pelo menos um campo.');
      return;
    }

    if (
      info === infoOriginal.trim() &&
      condi === condiOriginal.trim() &&
      trata === trataOriginal.trim()
    ) {
      setErro('Nenhuma alteração foi feita.');
      return;
    }

    const resultado = await adicionarHistoricoSaude({
      infoMedica: info,
      condiMedica: condi,
      trataAnterior: trata,
      userID: localStorage.getItem('userID'),
      pacienteId: localStorage.getItem('pacienteID'),
    });

    if (resultado.success) {
      setPopupAberto(true);
      setMostrarModalSaude(false);
      setInfoMedica('');
      setCondiMedica('');
      setTrataAnterior('');
      setErro('');
      setMostrarFormulario(false);
    } else {
      alert(resultado.error || 'Erro ao salvar histórico de saúde.');
    }
  }

  if (!mostrarModalSaude) return null;

  return (
    <div className="modal-saude">
      <h3 className="title-saude">Histórico de saúde</h3>

      {erro && <p style={{ color: 'red', marginBottom: '8px' }}>{erro}</p>}

      <input
        type="text"
        className="descricao-saude"
        placeholder="Informações médicas..."
        value={infoMedica}
        onChange={(e) => {
          setInfoMedica(e.target.value);
          if (erro) setErro('');
        }}
      />

      <input
        type="text"
        className="descricao-saude"
        placeholder="Condições médicas..."
        value={condiMedica}
        onChange={(e) => {
          setCondiMedica(e.target.value);
          if (erro) setErro('');
        }}
      />

      <input
        type="text"
        className="descricao-saude"
        placeholder="Tratamentos anteriores..."
        value={trataAnterior}
        onChange={(e) => {
          setTrataAnterior(e.target.value);
          if (erro) setErro('');
        }}
      />

      <div className="form-row buttons">
        <button onClick={() => setMostrarModalSaude(false)}>Cancelar</button>
        <button className="btn salvar" onClick={handleSalvarHistorico}>Salvar</button>
      </div>
    </div>
  );
}

export default ModalHistoricoSaude;
