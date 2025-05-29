import { useState } from 'react';
import './MenuPrincipal.css';
import { FiUser } from "react-icons/fi";
import { HiOutlineCog8Tooth } from "react-icons/hi2";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { PiSignOutBold } from "react-icons/pi";
import { useNavigate, useLocation } from 'react-router-dom';

function MenuPrincipal() {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false); /* removi const [active, setActive] = useState('perfil'); #Amanda*/
    const navigate = useNavigate();

    const handleClick = (section) => {
        setIsOpen(false);
        if (section === 'sair') {
            localStorage.removeItem("userID");
            navigate("/");
        }
        if (section === 'config') {
            navigate('/configuracoes');
        }
        if (section === 'perfil') {
            navigate('/perfil');
        }
    }

    return (
        <>
            <div className='container-menu-principal'>
                <div className='container-logo-menu-principal' style={{ cursor: "pointer" }} onClick={() => navigate("/pagina-inicial")}>
                    Seren
                </div>

                <div className='menu-principal'>
                    <div className={`container-menu-principal-items ${isOpen ? 'open' : ''}`}>
                        <div className="menu-principal-items">
                            <button
                                className={`menu-btn ${location.pathname === '/perfil' ? 'active' : ''}`}
                                onClick={() => handleClick('perfil')}
                            >
                                <FiUser className="icon" />
                                Meu perfil
                            </button>

                            <button
                                className={`menu-btn ${location.pathname === '/configuracoes' ? 'active' : ''}`}
                                onClick={() => handleClick('config')}
                            >
                                <HiOutlineCog8Tooth className="icon" />
                                Configurações
                            </button>

                            <button
                                className={`menu-btn ${location.pathname === '/ajuda' ? 'active' : ''}`}
                                onClick={() => handleClick('ajuda')}
                            >
                                <AiOutlineQuestionCircle className="icon" />
                                Ajuda
                            </button>
                        </div>

                        <div className="menu-principal-footer">
                            <button
                                className={`menu-btn-sair ${location.pathname === '/' ? 'active' : ''}`}
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