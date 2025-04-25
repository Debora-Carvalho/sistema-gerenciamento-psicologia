
### 📁 `frontend/hooks/README.md`


# 📌 Pasta: hooks

Este diretório contém **React Hooks personalizados** utilizados no projeto **Sistema de Gerenciamento para Psicólogos**.

## 🎯 Objetivo

Organizar e centralizar **lógicas reutilizáveis** relacionadas a estados, efeitos colaterais e interações com APIs, facilitando a manutenção e reutilização no frontend.

---

## 🧩 Estrutura Recomendada

Cada hook deve ser definido em um arquivo separado com o prefixo `use` seguido de seu propósito.

**Exemplo:**
useUsuario.js         -> Responsável por buscar os dados do usuário logado.
useAgendamentos.js    -> (Exemplo futuro) Buscar e filtrar agendamentos.
```

---

## 🛠️ Como Criar um Hook

1. Nomeie o arquivo como `useNomeDoHook.js`.
2. Exporte o hook como `default`.
3. Use boas práticas de encapsulamento e comentários explicativos quando necessário.
4. Caso dependa de APIs, centralize o fetch dentro do hook.

**Exemplo básico de hook:**

```js
import { useEffect, useState } from 'react';

export default function useUsuario() {
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        // Lógica para buscar dados do usuário
    }, []);

    return usuario;
}
```

---

## ✅ Como Utilizar

No componente onde você quiser usar o hook:

```js
import useUsuario from '../hooks/useUsuario';

const usuario = useUsuario();
```

---

## 🧼 Boas Práticas

- Mantenha os hooks simples e específicos.
- Evite lógica desnecessária nos componentes, prefira delegar aos hooks.
- Documente dentro do próprio hook se houver regras específicas de uso.

---

💡 **Dica:** Caso o hook dependa de contextos ou configurações globais, considere explicar isso no início do arquivo para facilitar o uso por outros devs.

```
