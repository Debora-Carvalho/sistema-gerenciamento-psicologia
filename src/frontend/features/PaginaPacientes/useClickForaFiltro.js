import { useEffect } from 'react';

export default function useClickForaFiltro({ mostrarFiltrosVisuais, setMostrarFiltrosVisuais }) {
    useEffect(() => {
        const handleClickOutsideFiltro = (event) => {
            if (mostrarFiltrosVisuais && event.target.closest('.container-filtro') === null) {
                setMostrarFiltrosVisuais(false);
            }
        };

        document.addEventListener('click', handleClickOutsideFiltro);
        return () => {
            document.removeEventListener('click', handleClickOutsideFiltro);
        };
    }, [mostrarFiltrosVisuais, setMostrarFiltrosVisuais]);
}
