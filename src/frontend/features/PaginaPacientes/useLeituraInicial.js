import { useEffect } from 'react';

export default function useLeituraInicial({ leituraAtiva, lerSeNaoLido, texto }) {
  useEffect(() => {
    if (leituraAtiva) {
      lerSeNaoLido(texto);
    }
  }, [leituraAtiva, lerSeNaoLido, texto]);
}
