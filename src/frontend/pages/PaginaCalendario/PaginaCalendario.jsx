import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import useAlterarAgendamento from "../../hooks/useAlterarAgendamentos";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "moment/locale/pt-br";

import '../../components/ComponentsCalendario/Components-Calendario-css.css';
import '../../components/Menu/Menu.css';

import Menu from '../../components/Menu/Menu';
import eventosPadrao from "../../components/ComponentsCalendario/eventosPadrao";
import EventModal from "../../components/ComponentsCalendario/EventModal";
import Adicionar from '../../components/ComponentsCalendario/Adicionar';
import CustomTollbar from '../../components/ComponentsCalendario/CustomTollbar';
import FiltroAtividades from '../../components/ComponentsCalendario/FiltroAtividades';
import useAgendamentos from "../../hooks/useAgendamentos";

moment.locale('pt-br');
const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar);

function Calendario() {
    const [view, setView] = useState('month');
    const [date, setDate] = useState(new Date());
    const [eventos, setEventos] = useState(eventosPadrao);
    const [eventoSelecionado, setEventoSelecionado] = useState(null);
    const [eventosFiltrados, setEventosFiltrados] = useState(eventosPadrao);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { buscarAgendamentos } = useAgendamentos();
    const { alterarAgendamento } = useAlterarAgendamento();
    const eventosRef = useRef([]);

    useEffect(() => {
        const userID = localStorage.getItem("userID");
        
        if (!userID) return;
    
        buscarAgendamentos(userID).then(({ agendamentos }) => {
            if (!Array.isArray(agendamentos)) return;
    
            const eventosFormatados = agendamentos.map((ag, idx) => ({
                id: ag._id || idx,
                title: ag.titulo,
                start: new Date(ag.dataInicio),
                end: new Date(ag.dataFim),
                desc: ag.desc,
                color: ag.color || "#3174ad",
                ...ag,
            }));
    
            eventosRef.current = eventosFormatados;
            setEventos(eventosFormatados);
            setEventosFiltrados(eventosFormatados);
        });
    }, []);

    const eventStyle = (event) => ({
        style: {
            backgroundColor: event.color,
        },
    });

    const moverEventos = ({ event, start, end }) => {
        const updatedEvents = eventos.map((e) =>
            e.id === event.id ? { ...e, start, end } : e
        );
        setEventos(updatedEvents);
        setEventosFiltrados(updatedEvents);

        const novosDados = {
            titulo: event.title,
            dataInicio: start.toISOString(),
            dataFim: end.toISOString(),
            desc: event.desc,
            color: event.color,
            tipo: event.tipo,
        };

        alterarAgendamento(event.id, novosDados, () => {
        });
    };


    const handleEventClick = (evento) => setEventoSelecionado(evento);
    const handleEventClose = () => setEventoSelecionado(null);

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
        setEventoSelecionado(null);
    };

    const handleEventUpdate = (updatedEvent) => {
        const atualizados = eventos.map((event) =>
            event.id === updatedEvent.id ? updatedEvent : event
        );
        setEventos(atualizados);
        setEventosFiltrados(atualizados);
        setEventoSelecionado(null);
    };

    const handleSelecionarAtividades = (atividadesSelecionadas) => {
        setEventosFiltrados(atividadesSelecionadas);
    };

    const handleNavigate = (newDate) => setDate(newDate);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <div className="tela">
            <div className="top-bar">
                <h1 className="seren-logo">Seren</h1>
                <div className="hamburger-menu" onClick={toggleMenu}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
            </div>

            <div className={`menu-container ${isMenuOpen ? "open" : ""}`}>
                <Menu />
            </div>

            <div className="toolbar">
                <Adicionar onAdicionar={handleAdicionar} />
                <FiltroAtividades
                    atividades={eventos}
                    onSelecionarAtividades={handleSelecionarAtividades}
                />
            </div>

            <div className="calendario">
                <DragAndDropCalendar
                    date={date}
                    view={view}
                    defaultView="month"
                    views={['month', 'week', 'day', 'agenda']}
                    onView={setView}
                    onNavigate={handleNavigate}
                    events={eventosFiltrados}
                    localizer={localizer}
                    resizable
                    onEventDrop={moverEventos}
                    onEventResize={moverEventos}
                    onSelectEvent={handleEventClick}
                    eventPropGetter={eventStyle}
                    components={{ toolbar: CustomTollbar }}
                    className="calendar"
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
