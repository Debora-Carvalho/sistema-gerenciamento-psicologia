import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function useLeitorDeTela() {
  const location = useLocation();
  const [leituraAtiva, setLeituraAtiva] = useState(() => {
    const savedLeitura = localStorage.getItem('leituraAtiva');
    return savedLeitura === 'true';
  });

  const falarTexto = (texto) => {
    if (!leituraAtiva || !texto) return;
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(texto);
    synth.speak(utterance);
  };

  const limparPaginasLidas = () => {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('paginaLida:')) {
        localStorage.removeItem(key);
      }
    });
  };

  const ativarLeitura = () => {
    setLeituraAtiva(true);
    localStorage.setItem('leituraAtiva', 'true');

    limparPaginasLidas();

    const textoDeBoasVindas = 'A leitura de tela foi ativada. Você está na página de configurações.';
    falarTexto(textoDeBoasVindas);
  };

  const desativarLeitura = () => {
    setLeituraAtiva(false);
    localStorage.setItem('leituraAtiva', 'false');
    window.speechSynthesis.cancel();
  };

  const toggleLeitura = () => {
    if (leituraAtiva) {
      desativarLeitura();
    } else {
      ativarLeitura();
    }
  };


  const lerSeNaoLido = (texto) => {
    const chavePagina = `paginaLida:${location.pathname}`;
    const jaLido = localStorage.getItem(chavePagina);
    if (!jaLido && texto) {
      falarTexto(texto);
      localStorage.setItem(chavePagina, 'true');
    }
  };

  const resetarPaginaLida = () => {
    const chavePagina = `paginaLida:${location.pathname}`;
    localStorage.removeItem(chavePagina);
  };

  useEffect(() => {
    const savedLeitura = localStorage.getItem('leituraAtiva');
    setLeituraAtiva(savedLeitura === 'true');
  }, []);

  return {
    leituraAtiva,
    ativarLeitura,
    desativarLeitura,
    toggleLeitura,
    falarTexto,
    lerSeNaoLido,
    resetarPaginaLida,
  };
}

export default useLeitorDeTela;
