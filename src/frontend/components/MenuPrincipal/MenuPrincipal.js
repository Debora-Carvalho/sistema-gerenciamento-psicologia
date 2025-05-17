import React, { useState } from 'react';
import './MenuPrincipal.css';
import { FiUser } from "react-icons/fi";
import { HiOutlineCog8Tooth } from "react-icons/hi2";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { PiSignOutBold } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';
import MenuResponsivo from '../MenuResponsivo/MenuResponsivo';

function MenuPrincipal() {
  const [active, setActive] = useState('perfil');
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const handleClick = (section) => {
    setActive(section);
    setIsOpen(false);
    if (section === 'sair') {
      localStorage.removeItem("userID");
      navigate("/");
    }
  };

  return (
    <>
      <div className='caixa-menu-responsivo'>
        <MenuResponsivo />    {/* este menu só estará visivel no mobile */}
      </div>

      <div className='container-menu-principal'>
        <div className='container-logo-menu-principal' style={{ cursor: "pointer" }} onClick={() => navigate("/pagina-inicial")}>
          Seren
        </div>

        <div className='menu-principal'>
          <div className={`container-menu-principal-items ${isOpen ? 'open' : ''}`}>
            <div className="menu-principal-items">
              <button
                className={`menu-btn ${active === 'perfil' ? 'active' : ''}`}
                onClick={() => handleClick('perfil')}
              >
                <FiUser className="icon" />
                Meu perfil
              </button>

              <button
                className={`menu-btn ${active === 'config' ? 'active' : ''}`}
                onClick={() => handleClick('config')}
              >
                <HiOutlineCog8Tooth className="icon" />
                Configurações
              </button>

              <button
                className={`menu-btn ${active === 'ajuda' ? 'active' : ''}`}
                onClick={() => handleClick('ajuda')}
              >
                <AiOutlineQuestionCircle className="icon" />
                Ajuda
              </button>
            </div>

            <div className="menu-principal-footer">
              <button
                className={`menu-btn-sair ${active === 'sair' ? 'active' : ''}`}
                onClick={() => handleClick('sair')}
              >
                <PiSignOutBold className="icon-sair" />
                Sair
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MenuPrincipal;