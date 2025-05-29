import './RegistrosPacientesDetalhes.css';
import { useNavigate } from 'react-router-dom';
import imgBtnNovoRegistro from '../../assets/images/image-btn-home-registros.png';
import { LuNotebookPen } from "react-icons/lu";

function BtnNovoRegistro () {
    const navigate = useNavigate();

    return (
        <div className='card-btn-novo-registro'>
            <img src={imgBtnNovoRegistro} alt='Ilustração' />
            <button 
                className='btn-novo-registro' 
                /* adicionar navegacao para modal de novo registro */
            > 
                <LuNotebookPen />                
                Adicionar registro
            </button>
        </div>
    );
}

export default BtnNovoRegistro;