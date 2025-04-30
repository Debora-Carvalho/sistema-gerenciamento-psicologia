import { useNavigate } from 'react-router-dom';

export default function useLogin() {
    const navigate = useNavigate();

    const realizarLogin = async ({ email, senha, lembreDeMim }, setMensagemErro) => {
        try {
            const response = await fetch("/api/authLogin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, senha }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                if (lembreDeMim) {
                    localStorage.setItem('emailSalvo', email);
                }
                localStorage.setItem("userID", data.userID);
                setMensagemErro("Login concluído! Acessando sistema...");
                setTimeout(() => navigate("/pagina-inicial"), 1500);
            } else {
                setMensagemErro(data.message || "Erro ao tentar autenticar!");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            setMensagemErro("Erro na comunicação com o servidor.");
        }
    };

    return { realizarLogin };
}
