import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUsuarios from '../../hooks/useUsuarios';
import './PaginaInicial.css';
import useLeitorDeTela from '../../features/LeitorTela/useLeitorTela.js';
import CardsIndicadores from '../../components/CardsIndicadores/CardsIndicadores.js';
import useDocumentTitle from '../../components/useDocumentTitle';
import imgBtnAgendamentos from '../../assets/images/image-btn-home-agendamentos.png';
import imgBtnPacientes from '../../assets/images/image-btn-home-pacientes.png';
import imgBtnAnaliseResultados from '../../assets/images/image-btn-home-analises.png';
// import imgBtnPagamentos from '../../assets/images/image-btn-home-pagamentos.png';
import imgBtnAnotacoes from '../../assets/images/image-btn-home-registros.png';
import imgBtnCalendario from '../../assets/images/image-btn-home-calendario.png';
import Calendario from '../../components/Calendario/Calendario.js';

import CabecalhoResponsivo from '../../components/CabecalhoResponsivo/CabecalhoResponsivo.js';
import TelaDeCarregamento from '../../components/CarregamentoTela/TelaDeCarregamento.js';
import CabecalhoPaginaInicial from '../../components/CabecalhoPaginaInicial/CabecalhoPaginaInicial.js';
import MenuPrincipal from '../../components/MenuPrincipal/MenuPrincipal.js';

function PaginaInicial() {
    useDocumentTitle("Página Inicial | Seren");// mudando o Title da pagina

    const [saudacao, setSaudacao] = useState('');
    const { usuario } = useUsuarios();
    const [carregando, setCarregando] = useState(false);
    const navigate = useNavigate();
    const { leituraAtiva, lerSeNaoLido } = useLeitorDeTela();

    useEffect(() => {
        const textoDeLeitura = 'Bem-vindo à página inicial. Aqui estão as opções principais, pacientes, anotações, agendamentos e pagamentos. Também temos um calendário com seus agendamentos.';

        if (leituraAtiva) {
            lerSeNaoLido(textoDeLeitura);
        }
    }, [leituraAtiva, lerSeNaoLido]);

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

    return (
        <div className='container-pagina-inicial'>
            <div className='navbar'>
                <MenuPrincipal />
            </div>

            <div className='container-conteudo-pagina-inicial'>

                <div className="visualizar-agendamentos-cabecalho-responsivo">
                    <CabecalhoResponsivo nomePacienteBusca={false}
                        setNomePacienteBusca={false}
                        exibirPesquisa={false} />
                </div>
                <div className='pagina-inicial-cabecalho'>
                    <CabecalhoPaginaInicial />
                </div>
                <div className='container-conteudo-clicavel-pagina-inicial'>
                    <div className='pagina-inicial-cards-indicadores'>
                        <CardsIndicadores />
                    </div>

                    <div className='container-botoes-calendario'>
                        <div className='container-para-flex-botoes'>
                            <div className='cards-botoes-funcionalidades'>
                                <div className='card-inicio-funcionalidade'>
                                    <img src={imgBtnPacientes} alt='Ilustração' />
                                    <a className='btn-pacientes' href='/pacientes'>
                                        <p>Pacientes</p>
                                    </a>
                                </div>

                        <div className='card-inicio-funcionalidade'>
                            <img src={imgBtnAnotacoes} alt='Ilustração' />
                            <a className='btn-anotacoes' href='/visualizar-registros'>
                                <p>Registros</p>
                            </a>
                        </div>

                                <div className='card-inicio-funcionalidade'>
                                    <img src={imgBtnAgendamentos} alt='Ilustração' />
                                    <a className='btn-agendamentos' href='/visualizar-agendamentos'>
                                        <p>Agendamentos</p>
                                    </a>
                                </div>

                                <div className='card-inicio-funcionalidade'>
                                    <img src={imgBtnAnaliseResultados} alt='Ilustração' />
                                    <a className='btn-analise-resultados' href='/analise-resultados'>
                                        <p>Análise de Resultados</p>
                                    </a>
                                </div>

                                <div className='card-calendario-responsivo'>
                                    <img src={imgBtnCalendario} alt='Ilustração' />
                                    <a className='btn-abrir-calendario-responsivo' href='/calendario'>
                                        <p>Abrir calendário</p>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className='card-calendario-inicio'>
                            <Calendario />
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaginaInicial;
