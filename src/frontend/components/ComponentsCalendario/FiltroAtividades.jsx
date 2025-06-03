import React from 'react';
import { Form } from 'react-bootstrap';

function FiltroAtividades({ atividades, onSelecionarAtividades, tiposSelecionados }) {
    const tiposAtividades = [...new Set(atividades.map(a => a.tipo))].filter(t => t);

    const handleCheckboxClick = (tipo, isChecked) => {
        const novosTipos = isChecked
            ? [...tiposSelecionados, tipo]
            : tiposSelecionados.filter(t => t !== tipo);

        const filtrados = 
            novosTipos.length === 0
                ? atividades
                : atividades.filter(a => novosTipos.includes(a.tipo));

        onSelecionarAtividades(filtrados, novosTipos);
    };

    const limparFiltros = () => {
        onSelecionarAtividades(atividades, []);
    };

    return (
        tiposAtividades.length > 0 && (
            <div className="p-3 rounded border border-white mt-3" style={{ color: "#212529", display: "flex", gap: "10px", flexWrap: "wrap"}}>
                <div className='ps-1' style={{ maxHeight: '28vh', overflowY: 'auto', display: "flex", gap: "10px", flexWrap: "wrap"}}>
                    {tiposAtividades.map(tipo => (
                        <Form.Check
                            key={tipo}
                            type="checkbox"
                            id={`filter-${tipo}`}
                            label={tipo}
                            checked={tiposSelecionados.includes(tipo)}
                            onChange={(e) => handleCheckboxClick(tipo, e.target.checked)}
                            className="mb-3"
                        />
                    ))}
                </div>
                <button 
                    className='btn btn-outline-secondary btn-hover-gray' 
                    onClick={limparFiltros}
                    type="button"
                >
                    Limpar Filtro
                </button>
            </div>
        )
    );
}

export default FiltroAtividades;
