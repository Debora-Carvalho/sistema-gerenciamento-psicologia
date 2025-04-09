import { useEffect } from 'react';

export default function useDocumentTitle(title) {
    useEffect(() => {
        document.title = title;
    }, [title]);
}

//Função para mudar o titulo da pargina! seguir o padrão que melhor lhes parecer