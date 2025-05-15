import './TelaDeCarregamento.css';

export default function TelaDeCarregamento({ mensagem = "Carregando, por favor aguarde..." }) {
    return (
        <div className="tela-carregamento">
            <div className="spinner"></div>
            <p>{mensagem}</p>
        </div>
    );
}
