import React, { useState } from "react";
import './MenuResponsivo.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { HiOutlineBars3 } from "react-icons/hi2"
import { FiUser } from "react-icons/fi";
import { HiOutlineCog8Tooth } from "react-icons/hi2";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { PiSignOutBold } from "react-icons/pi";
import { VscGraph } from "react-icons/vsc";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";

function MenuResponsivo() {
    const location = useLocation();
    const [openMenu, setOpenMenu] = useState(false);
    const [active, setActive] = useState('perfil');
    const [isOpen, setIsOpen] = useState(false);
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
        if (section === 'analise') {
            navigate('/analise-resultados');
        }
        if (section === 'perfil') {
            navigate('/perfil');
        }
    };

    return (
        <>
            <div className="menu-responsivo-hamburguer">
                <HiOutlineBars3 className="menu-responsivo-hamburguer__icon" onClick={() => setOpenMenu(true)} />
            </div>

            <nav className="container-menu-responsivo">
                <Drawer open={openMenu} onClose={(() => setOpenMenu(false))} anchor="left">
                    <Box
                        sx={{ width: 250 }}
                        role="presentation"
                        onClick={() => setOpenMenu(false)}
                        onKeyDown={() => setOpenMenu(false)}
                        className="container-menu-responsivo-aberto"
                    >

                        <div className='container-logo-menu-responsivo' style={{ cursor: "pointer" }} onClick={() => navigate("/pagina-inicial")}>
                            Seren
                        </div>

                        <div className='menu-responsivo'>
                            <div className={`container-menu-responsivo-items ${isOpen ? 'open' : ''}`}>
                                <div className="menu-responsivo-items">
                                    <button
                                        className={`menu-btn-responsivo ${location.pathname === '/perfil' ? 'active' : ''}`}
                                        onClick={() => handleClick('perfil')}
                                    >
                                        <FiUser className="icon-menu-responsivo" />
                                        Meu perfil
                                    </button>

                                    <button
                                        className={`menu-btn-responsivo ${location.pathname === '/configuracoes' ? 'active' : ''}`}
                                        onClick={() => handleClick('config')}
                                    >
                                        <HiOutlineCog8Tooth className="icon-menu-responsivo" />
                                        Configurações
                                    </button>

                                    <button
                                        className={`menu-btn-responsivo ${location.pathname === '/analise-resultados' ? 'active' : ''}`}
                                        onClick={() => handleClick('analise')}
                                    >
                                        <VscGraph  className="icon-menu-responsivo" />
                                        Análises
                                    </button>

                                    <button
                                        className={`menu-btn-responsivo ${location.pathname === '/ajuda' ? 'active' : ''}`}
                                        onClick={() => handleClick('ajuda')}
                                    >
                                        <AiOutlineQuestionCircle className="icon-menu-responsivo" />
                                        Ajuda
                                    </button>

                                </div>

                                <div className="menu-responsivo-footer">
                                    <button
                                        className={`menu-btn-responsivo-sair ${location.pathname === '/' ? 'active' : ''}`}
                                        onClick={() => handleClick('sair')}
                                    >
                                        <PiSignOutBold className="icon-menu-responsivo-sair" />
                                        Sair
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Box>
                </Drawer>
            </nav>
        </>
    );
}

export default MenuResponsivo;