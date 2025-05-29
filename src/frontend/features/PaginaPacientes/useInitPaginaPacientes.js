import { useEffect } from 'react';

export default function useInitPaginaPacientes({ setIsMobile, setMenuAberto, buscarAgendamentos, userID, setAgendamentos }) {
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    const handleClickOutsideAcoes = (e) => {
      if (!e.target.closest('.acoes')) {
        setMenuAberto(null);
      }
    };
    document.addEventListener('click', handleClickOutsideAcoes);

    buscarAgendamentos(userID).then(({ agendamentos, success }) => {
      if (success) {
        setAgendamentos(agendamentos);
      }
    });

    return () => {
      window.removeEventListener('resize', checkIsMobile);
      document.removeEventListener('click', handleClickOutsideAcoes);
    };
  }, []);
}
