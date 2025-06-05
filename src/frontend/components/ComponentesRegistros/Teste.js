// import React, { useState } from 'react';
// import NovoRegistro from './NovoRegistro'; // Caminho relativo na mesma pasta
// import EditarRegistro from './EditarRegistro'; // Caminho relativo na mesma pasta
// import PopupExcluir from './PopupExcluir'; // Caminho relativo na mesma pasta
// import './Registro.css'; // O CSS compartilhado para todos os componentes

// /**
//  * Componente Teste.js
//  * Este componente serve como um contêiner para demonstrar a funcionalidade
//  * de criar, editar e excluir registros usando os modais e popups.
//  */
// const Teste = () => {
//     // Estado para controlar a visibilidade do modal de Novo Registro
//     const [isNovoRegistroOpen, setIsNovoRegistroOpen] = useState(false);
//     // Estado para controlar a visibilidade do modal de Edição de Registro
//     const [isEditarRegistroOpen, setIsEditarRegistroOpen] = useState(false);
//     // Estado para controlar a visibilidade do popup de Excluir Registro
//     const [isPopupExcluirOpen, setIsPopupExcluirOpen] = useState(false);

//     // Estado para armazenar a lista de registros
//     // Cada registro terá um id e o texto do registro
//     const [records, setRecords] = useState([]);
//     // Estado para armazenar o registro atual que está sendo editado (o objeto completo)
//     const [currentRecordToEdit, setCurrentRecordToEdit] = useState(null);
//     // Estado para armazenar o ID do registro que está prestes a ser excluído
//     const [recordIdToDelete, setRecordIdToDelete] = useState(null);

//     // --- Funções para Novo Registro ---

//     /**
//      * Abre o modal de Novo Registro.
//      */
//     const handleOpenNovoRegistro = () => {
//         setIsNovoRegistroOpen(true);
//     };

//     /**
//      * Fecha o modal de Novo Registro.
//      */
//     const handleCloseNovoRegistro = () => {
//         setIsNovoRegistroOpen(false);
//     };

//     /**
//      * Lida com o salvamento de um novo registro.
//      * Adiciona o novo registro à lista de records.
//      * @param {object} newRecordData - Os dados do novo registro (paciente, data, registro).
//      */
//     const handleSaveNovoRegistro = (newRecordData) => {
//         const newRecord = {
//             id: Date.now(), // Gera um ID único baseado no timestamp
//             paciente: newRecordData.paciente,
//             data: newRecordData.data,
//             registro: newRecordData.registro,
//         };
//         setRecords((prevRecords) => [...prevRecords, newRecord]);
//         console.log('Novo Registro Salvo:', newRecord);
//     };

//     // --- Funções para Editar Registro ---

//     /**
//      * Abre o modal de Edição de Registro com os dados do registro selecionado.
//      * @param {object} record - O objeto do registro a ser editado.
//      */
//     const handleOpenEditarRegistro = (record) => {
//         setCurrentRecordToEdit(record);
//         setIsEditarRegistroOpen(true);
//     };

//     /**
//      * Fecha o modal de Edição de Registro.
//      */
//     const handleCloseEditarRegistro = () => {
//         setIsEditarRegistroOpen(false);
//         setCurrentRecordToEdit(null); // Limpa o registro em edição
//     };

//     /**
//      * Lida com o salvamento de um registro editado.
//      * Atualiza o registro na lista de records.
//      * @param {string} editedText - O novo texto do registro.
//      */
//     const handleSaveEditedRegistro = (editedText) => {
//         setRecords((prevRecords) =>
//             prevRecords.map((record) =>
//                 record.id === currentRecordToEdit.id
//                     ? { ...record, registro: editedText }
//                     : record
//             )
//         );
//         console.log('Registro Editado e Salvo:', editedText);
//         // O modal de edição é fechado pelo próprio EditarRegistro após a notificação
//     };

//     // --- Funções para Excluir Registro ---

//     /**
//      * Abre o popup de Excluir Registro.
//      * @param {number} recordId - O ID do registro a ser excluído.
//      */
//     const handleOpenPopupExcluir = (recordId) => {
//         setRecordIdToDelete(recordId);
//         setIsPopupExcluirOpen(true);
//     };

//     /**
//      * Fecha o popup de Excluir Registro.
//      */
//     const handleClosePopupExcluir = () => {
//         setIsPopupExcluirOpen(false);
//         setRecordIdToDelete(null); // Limpa o ID do registro a ser excluído
//     };

//     /**
//      * Lida com a confirmação da exclusão do registro.
//      * Remove o registro da lista de records.
//      */
//     const handleConfirmExclusion = () => {
//         setRecords((prevRecords) =>
//             prevRecords.filter((record) => record.id !== recordIdToDelete)
//         );
//         console.log(`Registro com ID ${recordIdToDelete} excluído.`);
//         // O PopupExcluir cuida de fechar a si mesmo e exibir a notificação de sucesso
//     };

//     return (
//         <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'Inter, sans-serif' }}>
//             <h1>Página de Teste de Registros</h1>
//             <p>Utilize os botões abaixo para gerenciar os registros.</p>

//             {/* Botão para abrir o modal de Novo Registro */}
//             <button
//                 onClick={handleOpenNovoRegistro}
//                 style={{
//                     backgroundColor: '#28a745',
//                     color: 'white',
//                     padding: '12px 25px',
//                     border: 'none',
//                     borderRadius: '8px',
//                     cursor: 'pointer',
//                     fontSize: '1.1rem',
//                     fontWeight: 'bold',
//                     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//                     transition: 'background-color 0.3s ease',
//                     marginBottom: '30px',
//                 }}
//             >
//                 Criar Novo Registro
//             </button>

//             {/* Lista de Registros */}
//             <div style={{ marginTop: '30px', textAlign: 'left', maxWidth: '800px', margin: '0 auto' }}>
//                 <h2>Meus Registros:</h2>
//                 {records.length === 0 ? (
//                     <p style={{ textAlign: 'center', color: '#666' }}>Nenhum registro ainda. Clique em "Criar Novo Registro" para adicionar um.</p>
//                 ) : (
//                     records.map((record) => (
//                         <div
//                             key={record.id}
//                             style={{
//                                 border: '1px solid #ddd',
//                                 borderRadius: '10px',
//                                 padding: '20px',
//                                 marginBottom: '15px',
//                                 backgroundColor: '#fefefe',
//                                 boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
//                                 display: 'flex',
//                                 flexDirection: 'column',
//                                 gap: '10px',
//                                 alignItems: 'flex-start'
//                             }}
//                         >
//                             <p><strong>Paciente:</strong> {record.paciente}</p>
//                             <p><strong>Data:</strong> {record.data}</p>
//                             <p><strong>Registro:</strong> {record.registro}</p>
//                             <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
//                                 <button
//                                     onClick={() => handleOpenEditarRegistro(record)}
//                                     style={{
//                                         backgroundColor: '#007bff',
//                                         color: 'white',
//                                         padding: '8px 15px',
//                                         border: 'none',
//                                         borderRadius: '5px',
//                                         cursor: 'pointer',
//                                         fontSize: '0.9rem',
//                                         transition: 'background-color 0.3s ease'
//                                     }}
//                                 >
//                                     Editar
//                                 </button>
//                                 <button
//                                     onClick={() => handleOpenPopupExcluir(record.id)}
//                                     style={{
//                                         backgroundColor: '#dc3545',
//                                         color: 'white',
//                                         padding: '8px 15px',
//                                         border: 'none',
//                                         borderRadius: '5px',
//                                         cursor: 'pointer',
//                                         fontSize: '0.9rem',
//                                         transition: 'background-color 0.3s ease'
//                                     }}
//                                 >
//                                     Excluir
//                                 </button>
//                             </div>
//                         </div>
//                     ))
//                 )}
//             </div>

//             {/* Renderiza o componente NovoRegistro */}
//             <NovoRegistro
//                 isOpen={isNovoRegistroOpen}
//                 onClose={handleCloseNovoRegistro}
//                 onSave={handleSaveNovoRegistro}
//             />

//             {/* Renderiza o componente EditarRegistro */}
//             {currentRecordToEdit && ( // Renderiza apenas se houver um registro para editar
//                 <EditarRegistro
//                     isOpen={isEditarRegistroOpen}
//                     onClose={handleCloseEditarRegistro}
//                     onSave={handleSaveEditedRegistro}
//                     initialRecord={currentRecordToEdit.registro} // Passa apenas o texto do registro
//                 />
//             )}

//             {/* Renderiza o componente PopupExcluir */}
//             <PopupExcluir
//                 isOpen={isPopupExcluirOpen}
//                 onClose={handleClosePopupExcluir}
//                 onConfirm={handleConfirmExclusion}
//             />
//         </div>
//     );
// };

// export default Teste;