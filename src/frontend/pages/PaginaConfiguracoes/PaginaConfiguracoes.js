import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuPrincipal from '../../components/MenuPrincipal/MenuPrincipal';
import "./PaginaConfiguracoes.css"

import useVLibras from '../../features/Vlibras/useVLibras';

function PaginaConfiguracoes() {
  const { ativado, toggleLibras } = useVLibras();

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
                <button className='bt-habilitar'> Habilitar </button>
              </div>
            </div>
            <div className='container-borda-configuracoes'>
              <p className='pA-configuracoes'>Acessibilidade</p>
              <div className='container-habilitar-configuracoes'>
                <p className='pL-configuracoes'>Libras</p>
                <button className='bt-habilitar' onClick={toggleLibras}>
                  {ativado ? 'Desabilitar' : 'Habilitar'}
                </button>

              </div>
            </div>
          </div>

          <div className='container-excluir-configuracoes'>
            <p className='pA-configuracoes'> Excluir Conta</p>
            <div className='container-habilitar-configuracoes'>
              <p className='pL-configuracoes'> Excluir definitivamente minha conta </p>
              <button className='bt-excluir'> Excluir Conta</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default PaginaConfiguracoes