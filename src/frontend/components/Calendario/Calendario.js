import * as React from 'react';
import { Link } from 'react-router-dom';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ptBR } from 'date-fns/locale';
import { FiMaximize2 } from 'react-icons/fi';
import '../../components/Calendario/Calendario.css';

export default function Calendario() {
  const [data, setData] = React.useState(new Date());

  return (
    <div className="calendario-inicial-container">
        <div className="calendario-inicial-topo">
            <div className='calendario-inicial-topo__datahora'>
                {new Intl.DateTimeFormat('pt-BR', {
                weekday: 'short',
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                }).format(new Date())}
            </div>

            {/* inserir o link para a pagina do calendário de agendamento */}
            <Link to="/calendario" className="btn-expandir-calendario"> 
                <FiMaximize2 className="btn-expandir-calendario__icon" />
            </Link>
        </div>

        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
            <DateCalendar
                value={data}
                onChange={(novaData) => setData(novaData)}
                sx={{
                    '& .Mui-selected': {
                    backgroundColor: '#01429E', 
                    color: '#fff',
                    },
                    '& .MuiPickersDay-root.Mui-selected': {
                    backgroundColor: '#01429E',
                    },
                    '& .MuiPickersYear-yearButton.Mui-selected': {
                    backgroundColor: '#01429E',
                    color: '#fff',
                    },
                }}
            />
        </LocalizationProvider>
    </div>
  );
}
