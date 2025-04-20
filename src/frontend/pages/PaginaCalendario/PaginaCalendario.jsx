import React, { useState } from "react";
import moment from "moment"; 
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import '../../components/ComponentsCalendario/Components-Calendario-css.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'moment/locale/pt-br';

import eventosPadrao from "../../components/ComponentsCalendario/eventosPadrao";
import EventModal from "../../components/ComponentsCalendario/EventModal";
import Adicionar from '../../components/ComponentsCalendario/Adicionar';
import CustomTollbar from '../../components/ComponentsCalendario/CustomTollbar';
import FiltroAtividades from '../../components/ComponentsCalendario/FiltroAtividades';

moment.locale('pt-br');
const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar);

function Calendario() {
    const [view, setView] = useState('month');
    const [date, setDate] = useState(new Date());
    const [eventos, setEventos] = useState(eventosPadrao);
    const [eventoSelecionado, SeteventoSelecionado] = useState(null);
    const [eventosFiltrados, setEventosFiltrados] = useState(eventosPadrao);

    const eventStyle = (event) => ({
        style: {
            backgroundColor: event.color,
        },
    });

    const moverEventos = ({ event, start, end }) => {
        const updatedEvents = eventos.map((e) => {
            if (e.id === event.id) {
                return { ...e, start, end };
            }
            return e;
        });
        setEventos(updatedEvents);
        setEventosFiltrados(updatedEvents);
    };

    const handleEventClick = (evento) => {
        SeteventoSelecionado(evento);
    };

    const handleEventClose = () => {
        SeteventoSelecionado(null);
    };

    const handleAdicionar = (novoEvento) => {
        const novo = { ...novoEvento, id: eventos.length + 1 };
        const atualizados = [...eventos, novo];
        setEventos(atualizados);
        setEventosFiltrados(atualizados);
    };

    const handleEventDelete = (eventId) => {
        const atualizados = eventos.filter((event) => event.id !== eventId);
        setEventos(atualizados);
        setEventosFiltrados(atualizados);
        SeteventoSelecionado(null);
    };

    const handleEventUpdate = (updatedEvent) => {
        const atualizados = eventos.map((event) => {
            if (event.id === updatedEvent.id) return updatedEvent;
            return event;
        });
        setEventos(atualizados);
        setEventosFiltrados(atualizados);
        SeteventoSelecionado(null);
    };

    const handleSelecionarAtividades = (atividadesSelecionadas) => {
        setEventosFiltrados(atividadesSelecionadas);
    };

    const handleNavigate = (newDate) => {
        setDate(newDate);
    };

    return (
        <div className='tela'>
            <div className='toolbar p-4' style={{ maxHeight: '100vh', overflowY: 'auto' }}>
                <Adicionar onAdicionar={handleAdicionar} />
                <FiltroAtividades atividades={eventos} onSelecionarAtividades={handleSelecionarAtividades} />
            </div>

            <div className='calendario'>
                <DragAndDropCalendar
                    date={date}
                    view={view}
                    defaultView="month"
                    views={['month', 'week', 'day', 'agenda']}
                    onView={(newView) => setView(newView)}
                    onNavigate={(newDate) => handleNavigate(newDate)}
                    events={eventosFiltrados}
                    localizer={localizer}
                    resizable
                    onEventDrop={moverEventos}
                    onEventResize={moverEventos}
                    onSelectEvent={handleEventClick}
                    eventPropGetter={eventStyle}
                    components={{ toolbar: CustomTollbar }}
                    className='calendar'
                />
            </div>

            {eventoSelecionado && (
                <EventModal
                    evento={eventoSelecionado}
                    onClose={handleEventClose}
                    onDelete={handleEventDelete}
                    onUpdate={handleEventUpdate}
                />
            )}
        </div>
    );
}

export default Calendario;
