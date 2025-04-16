import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import './Calendario.css';

function Calendario() {
  const [eventos, setEventos] = useState([
    {
      title: 'Sessão com Ana',
      start: '2025-04-15T10:00:00',
      end: '2025-04-15T11:00:00',
    },
    {
      title: 'Sessão com João',
      start: '2025-04-16T15:00:00',
      end: '2025-04-16T16:00:00',
    },
  ]);

  const handleDateSelect = (info) => {
    const paciente = prompt('Nome do paciente:');
    if (paciente) {
      const novoEvento = {
        title: `Sessão com ${paciente}`,
        start: info.startStr,
        end: info.endStr,
      };
      setEventos([...eventos, novoEvento]);
    }
  };

  return (
    <div className="container-calendario">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        editable={true}
        select={handleDateSelect}
        events={eventos}
        locale={ptBrLocale}
        headerToolbar={{
          start: 'prev,next today',
          center: 'title',
          end: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        slotMinTime="08:00:00"
        slotMaxTime="20:00:00"
      />
    </div>
  );
}

export default Calendario;

