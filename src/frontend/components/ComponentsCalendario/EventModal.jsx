import React, { useState } from "react";
import { 
  Modal,
  Button,
  Form,
  Collapse
} from 'react-bootstrap';
import './Components-Calendario-css.css';
import useDeleteAgendamento from "../../hooks/useExcluirAgendamentos";
import useAlterarAgendamento from "../../hooks/useAlterarAgendamentos";

const EventModal = ({evento, onClose, onDelete, onUpdate}) =>{
    const [editedEvent, setEditedEvent] = useState({
        ...evento,
        titulo: evento.titulo || "",
        dataInicio: evento.dataInicio || new Date(),
        dataFim: evento.dataFim || new Date(),
        desc: evento.desc || "",
        color: evento.color || "#3174ad",
        tipo: evento.tipo || null
        });
    const [collapsed, setCollapsed] = useState(true);
    const { deleteAgendamento } = useDeleteAgendamento();
    const { alterarAgendamento } = useAlterarAgendamento();

    const handleInputChange = (e)=>{
        const {name,value} = e.target;
        setEditedEvent({...editedEvent, [name]:value});
    }

    const handleColorChange = (e)=>{
        setEditedEvent({...editedEvent, color:e.target.value});
    }

    const handleStartDateChange = (e)=>{
        const startDate = new Date(e.target.value);
        if(startDate <= editedEvent.end){
            setEditedEvent({...editedEvent, start:startDate});
        }
    }

    const handleEndDateChange = (e)=>{
        const endDate = new Date(e.target.value);
        if(endDate >= editedEvent.start){
            setEditedEvent({...editedEvent, end:endDate});
        }
    }
    const handleDelete = () =>{
        deleteAgendamento(evento.id, onDelete);
    }
    const handleUpdate = async () => {
        const eventData = {
            titulo: editedEvent.title,
            dataInicio: editedEvent.start.toISOString(), 
            dataFim: editedEvent.end.toISOString(),      
            desc: editedEvent.desc,
            color: editedEvent.color,
            tipo: editedEvent.tipo
        };
    
        await new Promise((resolve) => {
            alterarAgendamento(editedEvent.id, eventData, () => {
                onUpdate({ ...editedEvent, ...eventData });
                onClose();
                resolve(); 
            });
        });
    
        window.location.reload(); 
    };
    
    
    const adjustDate = (date) =>{
        const adjustedDate = new Date(date);
        adjustedDate.setHours(adjustedDate.getHours() - 3);
        return adjustedDate.toISOString().slice(0,-8);
    };


    return(
        <Modal show={true} onHide={onClose}>
            <Modal.Header>
                <Modal.Title>{editedEvent.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formTitle">
                        <Form.Label>Título</Form.Label>
                        <Form.Control type="text" name='title' value={editedEvent.title} onChange={handleInputChange}/>
                    </Form.Group>
                    <Form.Group controlId="formDesc">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control as="textarea" rows={3} name='desc' value={editedEvent.desc} onChange={handleInputChange}/>
                    </Form.Group>

                    <Collapse in={!collapsed}>
                        <div>
                        <Form.Group controlId="formInicio">
                            <Form.Label>Início</Form.Label>
                            <Form.Control type="datetime-local" name='start' value={adjustDate(editedEvent.start)} onChange={handleStartDateChange}/>
                        </Form.Group>
                        
                        <Form.Group controlId="formEnd">
                            <Form.Label>Fim</Form.Label>
                            <Form.Control type="datetime-local" name='end' value={adjustDate(editedEvent.end)} onChange={handleEndDateChange}/>
                        </Form.Group>
                        
                        <Form.Group controlId="formColor">
                            <Form.Label>Cor</Form.Label>
                            <Form.Control type="color" name='color' value={editedEvent.color} onChange={handleColorChange}/>
                        </Form.Group>

                        <Form.Group controlId="formTipo">
                            <Form.Label>Tipo</Form.Label>
                            <Form.Control type="text" name='tipo' value={editedEvent.tipo} onChange={handleInputChange}/>
                        </Form.Group>
                        </div>
                    </Collapse>
                </Form>
            </Modal.Body>
            <Modal.Footer className='justify-content-between'>
                <Button variant='secondary' onClick={()=> setCollapsed(!collapsed)}>
                    {!collapsed ? 'Ocultar Detalhes' : 'Mostrar Detalhes'}
                </Button>
                <Button variant='danger' onClick={handleDelete}>
                    Apagar
                </Button>
                <Button variant='primary' onClick={handleUpdate}>
                    Salvar Alterações
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EventModal;