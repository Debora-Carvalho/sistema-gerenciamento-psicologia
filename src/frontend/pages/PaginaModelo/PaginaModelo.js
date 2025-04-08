import React from 'react';
import './PaginaModelo.css';
import imgMulherLogin from '../../assets/images/image-mulher-login.png';

function PaginaModelo() {
    return(
        <div className='container'>
            <h1>Esta é uma página modelo</h1>
            <p className='logo-seren'>Seren</p>
            <p>Verifique o css desta página para entender o funcionamento de variaveis css e estrutura React</p>
            <img src={imgMulherLogin} alt="Ilustração de mulher mexendo no notebook" />
        </div>
    );
}

export default PaginaModelo;