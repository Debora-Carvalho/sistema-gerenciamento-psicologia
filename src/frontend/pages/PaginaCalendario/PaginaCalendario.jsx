import React, { useState } from "react";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "moment/locale/pt-br";

import '../../components/ComponentsCalendario/Components-Calendario-css.css';
import '../../components/Menu/Menu.css';

import CustomTollbar from '../../components/ComponentsCalendario/CustomTollbar';

moment.locale('pt-br');
const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar);

function Calendario() {
  const [view, setView] = useState("month");
  const [date, setDate] = useState(new Date());

  // Apenas eventos fictícios para preencher o calendário
  const eventos = [
    {
      id: 1,
      title: "Evento Exemplo",
      start: new Date(),
      end: new Date(new Date().getTime() + 60 * 60 * 1000),
      color: "#3174ad"
    }
  ];

  const eventStyle = (event) => ({
    style: {
      backgroundColor: event.color,
    },
  });

  return (
    <div className="tela">
      <div className="calendario">
        <DragAndDropCalendar
          date={date}
          view={view}
          defaultView="month"
          views={["month", "week", "day", "agenda"]}
          onView={setView}
          onNavigate={setDate}
          events={eventos}
          localizer={localizer}
          resizable
          eventPropGetter={eventStyle}
          components={{ toolbar: CustomTollbar }}
          className="calendar"
          messages={{
            date: "Data",
            time: "Hora",
            event: "Evento",
            allDay: "Dia inteiro",
            noEventsInRange: "Não há eventos para este período",
            showMore: (total) => `+${total} eventos`,
          }}
        />
      </div>
    </div>
  );
}

export default Calendario;
