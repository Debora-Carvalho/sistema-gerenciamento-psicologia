import React, { useState } from 'react';
import './ChecklistPagamentos.css';

function ChecklistPagamentos() {
    const datasPagamento = ['09/04/2025', '02/04/2025', '26/03/2025', '19/03/2025', '12/03/2025'];

    const [selecionados, setSelecionados] = useState(['12/03/2025']);

    const handleChange = (e) => {
        const { value, checked } = e.target;

        if (checked) {
            setSelecionados((prev) => [...prev, value]);
        } else {
            setSelecionados((prev) => prev.filter((data) => data !== value));
        }
    };

    return (
        <div className='pagamentos-checklist'>
            {datasPagamento.map((data) => (
                <label key={data}>
                    {data}
                    <input
                        type="checkbox"
                        value={data}
                        checked={selecionados.includes(data)}
                        onChange={handleChange}
                    />
                </label>
            ))}
        </div>
    );
}

export default ChecklistPagamentos;