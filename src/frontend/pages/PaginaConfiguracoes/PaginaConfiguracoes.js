import React, { useEffect, useState } from 'react';
import MenuPrincipal from '../../components/MenuPrincipal/MenuPrincipal';
import "./PaginaConfiguracoes.css";
import useLeitorDeTela from '../../features/LeitorTela/useLeitorTela';
import useVLibras from '../../features/Vlibras/useVLibras';
import useDeleteUsuario from '../../hooks/useExcluirUsuario';
import PopUpPadraoNegar from '../../components/PopUpPadraoNegar/PopupPadraoNegar';
import PopUpPadrao from '../../components/PopupPadrao/PopupPadrao';

function PaginaConfiguracoes() {
  const { ativado, toggleLibras } = useVLibras();
  const { leituraAtiva, toggleLeitura, lerSeNaoLido } = useLeitorDeTela();
  const { deleteUsuario } = useDeleteUsuario();
  const librasAtivo = ativado;
  const [popupAberto, setPopupAberto] = useState(false);
  const [popupFinal, setPopupFinalAberto] = useState(false)
  const [acaoConfirmada, setAcaoConfirmada] = useState(false);


  useEffect(() => {
    if (leituraAtiva) {
      lerSeNaoLido(
        'Você está na página de configurações. Aqui você pode ativar leitura de tela, Libras ou excluir sua conta.'
      );
    }
  }, [leituraAtiva, lerSeNaoLido]);

  const handleExcluir = async () => {
    setPopupAberto(true);
  };

  const confirmarExclusao = async () => {
    setPopupAberto(false);
    await deleteUsuario();
    setPopupFinalAberto(true)
  };

  const voltarLogin = () => {
    window.location.reload();
  }

  const cancelarPopup = () => {
    setPopupAberto(false); 
  };

  return (
    <div className='container-pagina-configuracoes'>
      <div className='navbar'>
        <MenuPrincipal />
      </div>

      <div className='container-centro-configuracoes'>
        <div className='titulo-configuracoes'>
          <h1 className='t-configuracoes'>Configurações</h1>
        </div>

        <div className='container-opcoes-configuracoes'>
          <div className='container-acessibilidade-configuracoes'>
            <div className='container-borda-configuracoes'>
              <p className='pA-configuracoes'>Acessibilidade</p>
              <div className='container-habilitar-configuracoes'>
                <p className='pL-configuracoes'>Leitura de Tela</p>
                <button className='bt-habilitar' onClick={toggleLeitura}>
                  {leituraAtiva ? 'Desabilitar' : 'Habilitar'}
                </button>
              </div>
            </div>

            <div className='container-borda-configuracoes'>
              <p className='pA-configuracoes'>Acessibilidade</p>
              <div className='container-habilitar-configuracoes'>
                <p className='pL-configuracoes'>Libras</p>
                <button className='bt-habilitar' onClick={toggleLibras}>
                  {librasAtivo ? 'Desabilitar' : 'Habilitar'}
                </button>
              </div>
            </div>
          </div>

          <div className='container-excluir-configuracoes'>
            <p className='pA-configuracoes'>Excluir Conta</p>
            <div className='container-habilitar-configuracoes'>
              <p className='pL-configuracoes'>Excluir definitivamente minha conta</p>
              <button className='bt-excluir' onClick={handleExcluir}>Excluir Conta</button>
              <PopUpPadraoNegar
                aberto={popupAberto}
                titulo="Confirmação"
                mensagem="Tem certeza que deseja excluir?"
                textoBotao="Confirmar"
                onBotaoClick={confirmarExclusao}
                onCancelar={cancelarPopup}
              />
                <PopUpPadrao
                aberto={popupFinal}
                titulo="Você excluiu sua conta"
                mensagem="Retornar a página de login"
                textoBotao="Logar"
                onBotaoClick={voltarLogin}
              />
          </div>
        </div>
      </div>
    </div>
    </div >
  );
}

export default PaginaConfiguracoes;
