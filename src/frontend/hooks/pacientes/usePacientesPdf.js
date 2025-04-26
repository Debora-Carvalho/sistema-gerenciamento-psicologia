import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import calcularIdade from './utilCalcularIdade.js';

export function exportarPDF(pacientes, colunasVisiveis) {
    const doc = new jsPDF();
    doc.text('Lista de Pacientes', 14, 16);

    const colunas = [], linhas = [];
    if (colunasVisiveis.nome) colunas.push('Nome');
    if (colunasVisiveis.data) colunas.push('Data');
    if (colunasVisiveis.idade) colunas.push('Idade');

    pacientes.forEach(p => {
        const linha = [];
        if (colunasVisiveis.nome) linha.push(p.nome);
        if (colunasVisiveis.data) linha.push(p.data);
        if (colunasVisiveis.idade) linha.push(calcularIdade(p.dataNascimento));
        linhas.push(linha);
    });

    autoTable(doc, { startY: 20, head: [colunas], body: linhas });
    doc.save('pacientes.pdf');
}
