import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUsuarios from '../../hooks/useUsuarios';
import './PaginaInicial.css';
import CabecalhoPaginaInicial from '../../components/CabecalhoPaginaInicial/CabecalhoPaginaInicial.js';
import MenuPrincipal from '../../components/MenuPrincipal/MenuPrincipal.js';
import CardsIndicadores from '../../components/CardsIndicadores/CardsIndicadores.js';
import useDocumentTitle from '../../components/useDocumentTitle';
import imgBtnAgendamentos from '../../assets/images/image-btn-home-agendamentos.png';
import imgBtnPacientes from '../../assets/images/image-btn-home-pacientes.png';
import imgBtnPagamentos from '../../assets/images/image-btn-home-pagamentos.png';
import imgBtnAnotacoes from '../../assets/images/image-btn-home-anotacoes.png';
import imgBtnCalendario from '../../assets/images/image-btn-home-calendario.svg';
import Calendario from '../../components/Calendario/Calendario.js';
import CabecalhoResponsivo from '../../components/CabecalhoResponsivo/CabecalhoResponsivo.js';
import TelaDeCarregamento from '../../components/CarregamentoTela/TelaDeCarregamento.js';

function PaginaInicial() {
    useDocumentTitle("Página Inicial | Seren");// mudando o Title da pagina

    const [saudacao, setSaudacao] = useState('');
    const { usuario } = useUsuarios();
    const [carregando, setCarregando] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (usuario) {
            const horaAtual = new Date().getHours();
            if (horaAtual < 12) {
                setSaudacao('Bom dia');
            } else if (horaAtual < 18) {
                setSaudacao('Boa tarde');
            } else {
                setSaudacao('Boa noite');
            }
        }
    }, [usuario]); // Agora a saudação só vai atualizada quando o usuário carregar.

    if (!usuario) {
        return <TelaDeCarregamento mensagem="Carregando tela inicial de usuário..." />;
    }

    console.log("UserID do localStorage:", localStorage.getItem("userID"));

    const irParaPacientes = () => {
        setCarregando(true);
        setTimeout(() => {
            navigate('/pacientes');
        }, 400); // tempo do carregamento antes de navegar para pacientes
    };

    if (carregando) {
        return <TelaDeCarregamento mensagem="" />;
    }

    return (
        <div className='container-pagina-inicial'>
            <div className='navbar'>
                <MenuPrincipal />
            </div>

            <div className='container-conteudo-pagina-inicial'>
                <div className='pagina-inicial-cabecalho'>
                    <CabecalhoPaginaInicial />
                </div>

                <div className='pagina-inicial-cabecalho-responsivo'>
                    <CabecalhoResponsivo />
                    <div className='container-cumprimentos-inicio-responsivo'>
                        <p className='texto-cumprimentos-inicio-responsivo'>{saudacao}, {usuario.username}</p>
                    </div>
                </div>

                <div className='pagina-inicial-cards-indicadores'>
                    <CardsIndicadores />
                </div>

                <div className='container-botoes-calendario'>
                    <div className='cards-botoes-funcionalidades'>
                        <div className='card-inicio-funcionalidade' onClick={irParaPacientes} style={{ cursor: 'pointer' }}>
                            <img src={imgBtnPacientes} alt='Ilustração' />
                            <a className='btn-pacientes' href='#'>
                                <p>Pacientes</p>
                            </a>
                        </div>

                        <div className='card-inicio-funcionalidade'>
                            <img src={imgBtnAnotacoes} alt='Ilustração' />
                            <a className='btn-anotacoes' href='#'>
                                <p>Anotações</p>
                            </a>
                        </div>

                        <div className='card-inicio-funcionalidade'>
                            <img src={imgBtnAgendamentos} alt='Ilustração' />
                            <a className='btn-agendamentos' href='#'>
                                <p>Agendamentos</p>
                            </a>
                        </div>

                        <div className='card-inicio-funcionalidade'>
                            <img src={imgBtnPagamentos} alt='Ilustração' />
                            <a className='btn-pagamentos' href='#'>
                                <p>Pagamentos</p>
                            </a>
                        </div>
                    </div>

                    <div className='card-calendario-inicio'>
                        <Calendario />
                    </div>

                    <div className='card-calendario-responsivo'>
                        <img src={imgBtnCalendario} alt='Ilustração' />
                        <a className='btn-abrir-calendario-responsivo' href='/calendario'>
                            <p>Abrir calendário</p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaginaInicial;