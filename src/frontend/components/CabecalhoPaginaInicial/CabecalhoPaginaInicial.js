import React, { useEffect, useState } from 'react';
import useUsuarios from '../../hooks/useUsuarios';
import './CabecalhoPaginaInicial.css';

function CabecalhoPaginaInicial() {
    const totalAgendamentos = 15;
    const [saudacao, setSaudacao] = useState('');
    const { usuario } = useUsuarios();

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
        return <div>Carregando usuário...</div>;
    }

    return (
        <div className='container-cabecalho'>
            {/* <div className='container-logo'>
                Seren
            </div> */}

            <div className='container-cumprimentos'>
                <p className='texto-cumprimentos'>{saudacao}, {usuario.username}</p>
            </div>

            <div className='container-agendamentos'>
                <p className='texto-agendamentos'>
                    Faltam <span>{totalAgendamentos}</span> atendimentos
                </p>
            </div>
        </div>
    );
}

export default CabecalhoPaginaInicial;


// import React, { useEffect, useState } from 'react';
// import './CabecalhoPaginaInicial.css';

// function CabecalhoPaginaInicial() {
//     const totalAgendamentos = 15;

//     const [saudacao, setSaudacao] = useState('');
//     const [usuario, setUsuario] = useState(null);

//     // Define antes de usar
//     const atualizarSaudacao = () => {
//         const horaAtual = new Date().getHours();
//         if (horaAtual < 12) {
//             setSaudacao('Bom dia');
//         } else if (horaAtual < 18) {
//             setSaudacao('Boa tarde');
//         } else {
//             setSaudacao('Boa noite');
//         }
//     };

//     useEffect(() => {
//         async function buscarUsuario() {
//             try {
//                 const userID = localStorage.getItem("userID");

//                 if (!userID) {
//                     console.error("userID não encontrado no localStorage.");
//                     return;
//                 }

//                 const response = await fetch("http://localhost:4000/dadosUsuario", {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify({ userID })
//                 });


//                 const data = await response.json();

//                 if (response.ok) {
//                     setUsuario(data.usuario);
//                 } else {
//                     console.error(data.error);
//                 }
//             } catch (error) {
//                 console.error("Erro ao buscar usuário:", error);
//             }
//         }

//         buscarUsuario();
//         atualizarSaudacao();

//         const intervalo = setInterval(() => {
//             atualizarSaudacao();
//         }, 60000);

//         return () => clearInterval(intervalo);
//     }, []);

//     if (!usuario) {
//         return <div>Carregando usuário...</div>;
//     }

//     return (
//         <div className='container-cabecalho'>
//             <div className='container-logo'>
//                 Seren
//             </div>

//             <div className='container-cumprimentos'>
//                 <p className='texto-cumprimentos'>{saudacao}, {usuario.username}</p>
//             </div>

//             <div className='container-agendamentos'>
//                 <p className='texto-agendamentos'>
//                     Faltam <span>{totalAgendamentos}</span> atendimentos
//                 </p>
//             </div>
//         </div>
//     );
// }

// export default CabecalhoPaginaInicial;
