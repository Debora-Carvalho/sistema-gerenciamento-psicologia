import { useState, useEffect } from 'react';
import useUsuarios from '../../hooks/useUsuarios';
import useEditarUsuario from '../../hooks/usuario/useUpdateUsuario';
import useNovaSenha from '../../hooks/useNovaSenha';
import useUploadFotoPerfil from '../../hooks/usuario/useUploadFotoPerfil';
import FotoPerfil from '../../features/PaginaPerfil/FotoPerfil';
import { MdOutlineEdit } from "react-icons/md";

function PerfilDados() {
    const { atualizarSenha } = useNovaSenha();
    const [novaSenha, setNovaSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [mensagemErro, setMensagemErro] = useState('');
    const [erroSenhaInvalida, setErroSenhaInvalida] = useState(false);
    const { usuario } = useUsuarios();
    const { atualizarUsuario } = useEditarUsuario();
    const userID = localStorage.getItem("userID");
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarConfirmar, setMostrarConfirmar] = useState(false);
    const [mostrarSucesso, setMostrarSucesso] = useState(false);
    const [mensagemSucesso, setMensagemSucesso] = useState('');

    const [editandoCampo, setEditandoCampo] = useState(null);
    const { uploadFotoPerfil } = useUploadFotoPerfil();

    const [dadosEditados, setDadosEditados] = useState({
        id: userID,
        nome: '',
        email: '',
        telephone: '',
        senha: ''
    });

    useEffect(() => {
        if (mostrarSucesso) {
            const timer = setTimeout(() => {
                setMostrarSucesso(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [mostrarSucesso]);

    const validarSenha = (nova, confirmar) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        if (!regex.test(nova)) {
            return 'Senha inválida. Mínimo 8 caracteres com letra maiúscula, número e símbolo.';
        }
        if (nova !== confirmar) {
            return 'As senhas não coincidem.';
        }
        return '';
    };

    const handleSalvarSenha = () => {
        const erro = validarSenha(novaSenha, confirmarSenha);
        if (erro) {
            setMensagemErro(erro);
            setErroSenhaInvalida(true);
            return;
        }

        atualizarSenha(
            { email: dadosEditados.email, novaSenha },
            setMensagemErro,
            () => {
                setMensagemSucesso("Dados atualizados com sucesso!");
                setMostrarSucesso(true);
                setEditandoCampo(null);
                setNovaSenha('');
                setConfirmarSenha('');
                setErroSenhaInvalida(false);
            },
            setErroSenhaInvalida
        );
    };

    const handleCancelarSenha = () => {
        setEditandoCampo(null);
        setNovaSenha('');
        setConfirmarSenha('');
        setMensagemErro('');
        setErroSenhaInvalida(false);
        setMostrarSenha(false);
        setMostrarConfirmar(false);
    };

    useEffect(() => {
        if (usuario) {
            setDadosEditados({
                id: usuario._id,
                nome: usuario.username,
                email: usuario.email,
                telephone: String(usuario.telephone),
                senha: usuario.senha
            });
        }
    }, [usuario]);

    const handleChange = (campo, valor) => {
        setDadosEditados(prev => ({ ...prev, [campo]: valor }));
    };

    const [imagemPreview, setImagemPreview] = useState(null);

    const handleImagemChange = async (event) => {
        const file = event.target.files[0];

        if (file) {

            const reader = new FileReader();
            reader.onloadend = () => setImagemPreview(reader.result);
            reader.readAsDataURL(file);


            try {
                const userId = localStorage.getItem("userID");
                const fileId = await uploadFotoPerfil(file, userId);

            } catch (error) {
                alert("Erro ao enviar imagem.");
            }
        }
    };



    const handleClick = async (campo) => {
        if (editandoCampo === campo) {
            if (campo === "senha") {
                handleSalvarSenha();
                return;
            }

            try {
                const dadosParaEnviar = {
                    id: dadosEditados.id,
                    nome: dadosEditados.nome,
                    email: dadosEditados.email,
                    telephone: dadosEditados.telephone
                };
                await atualizarUsuario(dadosParaEnviar);
                setMensagemSucesso("Dados atualizados com sucesso!");
                setMostrarSucesso(true);

            } catch (error) {
            }
            setEditandoCampo(null);
        } else {
            setEditandoCampo(campo);
        }
    };

    if (!usuario) return <div>Carregando usuário...</div>;

    return (
        <>
            {/* Imagem */}
            <div className="container-foto-perfil">
                <label htmlFor="upload-foto" className="imagem-perfil" title='Clique para editar a foto de perfil'>
                    {imagemPreview ? (
                        <img src={imagemPreview} alt="Foto de perfil" className="foto-preview" />
                    ) : (
                        <FotoPerfil userId={usuario._id} />
                    )}
                    <div className="overlay-icone">
                        <span role="img" aria-label="editar">
                            <MdOutlineEdit className='btn-editar-foto__icon' />
                        </span>
                    </div>
                </label>
                <input
                    type="file"
                    id="upload-foto"
                    accept="image/*"
                    onChange={handleImagemChange}
                    style={{ display: 'none' }}
                />
            </div>


            {/* Nome */}
            <div className='container-informacoes-perfil'>
                <div className='container-borda-perfil'>
                    <p className='pA-perfil'>Nome</p>
                    <div className='container-editar-perfil'>
                        {editandoCampo === "nome" ? (
                            <>
                                <input
                                    type="text"
                                    value={dadosEditados.nome}
                                    onChange={(e) => handleChange("nome", e.target.value)}
                                />
                                <div className='container-input-botoes'>
                                    <button className="bt-editar" onClick={() => setEditandoCampo(null)}>
                                        <label>Cancelar</label>
                                    </button>
                                    <button className="bt-editar" onClick={() => handleClick("nome")}>
                                        <label>Salvar</label>
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <p className='pL-perfil'>{dadosEditados.nome}</p>
                                <button className='bt-editar auto' onClick={() => handleClick("nome")}>
                                    <label>Editar</label>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Email */}
            <div className='container-informacoes-perfil'>
                <div className='container-borda-perfil'>
                    <p className='pA-perfil'>Email</p>
                    <div className='container-editar-perfil'>
                        {editandoCampo === "email" ? (
                            <>
                                <input
                                    type="text"
                                    value={dadosEditados.email}
                                    onChange={(e) => handleChange("email", e.target.value)}
                                />
                                <div className='container-input-botoes'>
                                    <button className="bt-editar" onClick={() => setEditandoCampo(null)}>
                                        <label>Cancelar</label>
                                    </button>
                                    <button className="bt-editar" onClick={() => handleClick("email")}>
                                        <label>Salvar</label>
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <p className='pL-perfil'>{dadosEditados.email}</p>
                                <button className='bt-editar auto' onClick={() => handleClick("email")}>
                                    <label>Editar</label>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Celular */}
            <div className='container-informacoes-perfil'>
                <div className='container-borda-perfil'>
                    <p className='pA-perfil'>Celular</p>
                    <div className='container-editar-perfil'>
                        {editandoCampo === "telephone" ? (
                            <>
                                <input
                                    type="text"
                                    maxLength={11}
                                    value={dadosEditados.telephone}
                                    onChange={(e) => handleChange("telephone", e.target.value)}
                                />

                                <div className='container-input-botoes'>
                                    <button className="bt-editar" onClick={() => setEditandoCampo(null)}>
                                        <label>Cancelar</label>
                                    </button>
                                    <button className="bt-editar" onClick={() => handleClick("telephone")}>
                                        <label>Salvar</label>
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <p className='pL-perfil'>{dadosEditados.telephone || "Telefone não disponível"}</p>
                                <button className='bt-editar auto' onClick={() => handleClick("telephone")}>
                                    <label>Editar</label>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Senha */}
            <div className='container-informacoes-perfil'>
                <div className='container-borda-perfil'>
                    <p className='pA-perfil'>Senha</p>
                    <div className='container-editar-perfil'>
                        {editandoCampo === "senha" ? (
                            <div className="container-inputs-senha">
                                {mensagemErro && <p className="mensagem-erro-perfil">{mensagemErro}</p>}
                                <div className='container-inputs'>
                                    <div className='container-inputs-label'>
                                        <div className="input-com-icone">
                                            <input
                                                type={mostrarSenha ? "text" : "password"}
                                                placeholder="Nova senha"
                                                value={novaSenha}
                                                className={erroSenhaInvalida ? 'erro' : ''}
                                                onChange={(e) => setNovaSenha(e.target.value)}
                                            />
                                            <button
                                                type="button"
                                                className="olho"
                                                onClick={() => setMostrarSenha(!mostrarSenha)}
                                            >
                                                {mostrarSenha ? "🙈" : "👁️"}
                                            </button>
                                        </div>
                                        <div className="input-com-icone">
                                            <input
                                                type={mostrarConfirmar ? "text" : "password"}
                                                placeholder="Confirmar nova senha"
                                                value={confirmarSenha}
                                                className={erroSenhaInvalida ? 'erro' : ''}
                                                onChange={(e) => setConfirmarSenha(e.target.value)}
                                            />
                                            <button
                                                type="button"
                                                className="olho"
                                                onClick={() => setMostrarConfirmar(!mostrarConfirmar)}
                                            >
                                                {mostrarConfirmar ? "🙈" : "👁️"}
                                            </button>
                                        </div>
                                    </div>
                                    <div className='container-input-botoes'>
                                        <button className="bt-editar" onClick={handleCancelarSenha}>
                                            <label>Cancelar</label>
                                        </button>
                                        <button className="bt-editar" onClick={() => handleClick("senha")}>
                                            <label>Salvar</label>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                <p className='pL-perfil'>********</p>
                                <button className='bt-editar auto' onClick={() => handleClick("senha")}>
                                    <label>Editar</label>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
            {mostrarSucesso && (
                <div className="popup-sucesso-container show">
                    <div className="popup-sucesso">
                        <p>{mensagemSucesso}</p>
                    </div>
                </div>
            )}

        </>
    );
}

export default PerfilDados;