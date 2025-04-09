import './styles/App.css';
import Cadastro from './pages/Cadastro/Cadastro.js';
//import LoginEsqueciSenha from './pages/LoginEsqueciSenha/LoginEsqueciSenha.js';
//import LoginCodigoRecuperacao from './pages/LoginCodigoRecuperacaoSenha/LoginCodigoRecuperacaoSenha.js';

function App() {
    return (
        <div className="App">
            <Cadastro /> 
            {/* <LoginEsqueciSenha />  */}
            {/* <LoginCodigoRecuperacao />  */}
        </div>
    );
}

export default App;
