import './CabecalhoResponsivo.css';
import useUsuarios from '../../hooks/useUsuarios';
import MenuResponsivo from "../MenuResponsivo/MenuResponsivo";
import FotoPerfil from "../../features/PaginaPerfil/FotoPerfil";
import { RiSearchLine } from "react-icons/ri";

function CabecalhoResponsivo({ nomePacienteBusca, setNomePacienteBusca, exibirPesquisa }) {
    const { usuario } = useUsuarios();

    if (!usuario) {
        return <div>Carregando usuário...</div>;
    }

    return (
        <div className='container-cabecalho-responsivo'>
            <div className='cabecalho-linha-superior'>
                <div className="container-cabecalho-responsivo-navbar">
                    <MenuResponsivo />
                </div>

                <div className='container-cabecalho-responsivo-perfil'>
                    <div className='cabecalho-responsivo-foto-perfil'>
                        <FotoPerfil userId={usuario._id} />
                    </div>
                    <div className='cabecalho-responsivo-infos-usuario'>
                        <p className="cabecalho-responsivo-nome-usuario">{usuario.username?.split(' ')[0]}</p>
                        <p>{usuario.email}</p>
                    </div>
                </div>
            </div>
            {exibirPesquisa && (
                <div className="container-barra-pesquisa-usuario-logado-responsivo">
                    <RiSearchLine className="icon-lupa" alt="Ícone de lupa" />
                    <input
                        id="pesquisa-input"
                        maxLength="800"
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck="false"
                        placeholder="Pesquisar paciente"
                        value={nomePacienteBusca}
                        onChange={(e) => setNomePacienteBusca(e.target.value)}
                    />
                </div>
            )}
        </div>
    );
}

export default CabecalhoResponsivo;