import React, { useState } from 'react';
import './Menu.css';
import { FiUser } from "react-icons/fi";
import { HiOutlineCog8Tooth } from "react-icons/hi2";
import { AiOutlineQuestionCircle, AiOutlineMenu } from "react-icons/ai";
import { IoIosMenu } from "react-icons/io";
import { PiSignOutBold } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';
import useLeitorDeTela from '../../features/LeitorTela/useLeitorTela';

function Menu() {
    const [active, setActive] = useState('perfil');
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const { resetarLeitura, desativarLeitura } = useLeitorDeTela();
    const handleClick = (section) => {
        setActive(section);
        setIsOpen(false); 
        if (section === 'sair') {
            localStorage.removeItem("userID");
            localStorage.setItem("leituraAtiva", "false");
            localStorage.setItem("Vlibras_ativado", "false");
            desativarLeitura(); 
            resetarLeitura();
            navigate("/"); 
        }
    };

    return (
        <>
            <div className="menu-hamburguer" onClick={() => setIsOpen(!isOpen)}>
                <IoIosMenu />
            </div>

            <div className={`container-menu ${isOpen ? 'open' : ''}`}>
                <div className="menu-items">
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

                <div className="menu-footer">
                    <button
                        className={`menu-btn ${active === 'sair' ? 'active' : ''}`}
                        onClick={() => handleClick('sair')}
                    >
                        <PiSignOutBold className="icon" />
                        Sair
                    </button>
                </div>
            </div>
        </>
    );
}

export default Menu;