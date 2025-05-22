import './PaginaPerfil.css';
import useDocumentTitle from '../../components/useDocumentTitle';
import MenuPrincipal from '../../components/MenuPrincipal/MenuPrincipal.js';
import CabecalhoUsuarioLogado from '../../components/CabecalhoUsuarioLogado/CabecalhoUsuarioLogado.js';
import CabecalhoResponsivo from '../../components/CabecalhoResponsivo/CabecalhoResponsivo.js';
import PerfilDados from '../../components/PerfilUsuario/PerfilDados.js'

function PaginaPerfil() {
    useDocumentTitle("Perfil | Seren"); // mudando o Title da pagina

    return (
        <div className='container-pagina-perfil'>
            <div className='navbar'>
                <MenuPrincipal />
            </div>

            <div className='container-centro-perfil'>
                <div className='perfil-cabecalho'>
                    <CabecalhoUsuarioLogado />
                </div>

                <div className='perfil-cabecalho-responsivo'>
                    <CabecalhoResponsivo />
                </div>

                <div className='titulo-perfil'>
                    <h1 className='t-perfil'>Meu Perfil</h1>
                </div>

                <div className='container-opcoes-perfil'>
                    <PerfilDados />
                </div>
            </div>
        </div>
    );
}

export default PaginaPerfil;