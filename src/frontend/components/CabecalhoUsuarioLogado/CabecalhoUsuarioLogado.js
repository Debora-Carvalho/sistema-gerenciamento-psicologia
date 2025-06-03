import './CabecalhoUsuarioLogado.css';
import { RiSearchLine } from "react-icons/ri";
import useUsuarios from '../../hooks/useUsuarios';
import FotoPerfil from '../../features/PaginaPerfil/FotoPerfil'
import TelaDeCarregamento from '../CarregamentoTela/TelaDeCarregamento';

function CabecalhoUsuarioLogado({ nomePacienteBusca, setNomePacienteBusca, exibirPesquisa }) {
    const { usuario } = useUsuarios();

    if (!usuario) {
        return <TelaDeCarregamento mensagem="Carregando cabeçalho..." />;
    }

    return (
        <div className={`container-cabecalho-usuario-logado ${!exibirPesquisa ? 'sem-pesquisa' : ''}`}>
            {exibirPesquisa && (
                <div className="container-barra-pesquisa-usuario-logado">
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
            <div className='container-perfil'>
                <div className='foto-perfil'>
                    <FotoPerfil userId={usuario._id} />
                </div>
                <div className='infos-usuario'>
                    <p className="nome-usuario">{usuario.username?.split(' ')[0]}</p>
                    <p>{usuario.email}</p>
                </div>
            </div>
        </div>
    );
}

export default CabecalhoUsuarioLogado;