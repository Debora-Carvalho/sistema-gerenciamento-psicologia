import './RegistrosPacientesDetalhes.css';
import { useNavigate } from 'react-router-dom';

function RegistrosPacientesDetalhes () {
    const navigate = useNavigate();

    return (
        <div className='container-registros-pacientes-detalhes'>
            <h1 className='registros-pacientes-detalhes__titulo'>
                Registros de sessões
            </h1>

            <div className='registros-pacientes-detalhes__listagem'>
                <p>registro 1</p>
                <p>registro 2</p>
                <p>registro 3</p>
            </div>
        </div>
    );
}

export default RegistrosPacientesDetalhes;