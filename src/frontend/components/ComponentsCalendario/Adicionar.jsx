import React, { useState } from 'react';
import { Button, Form, Row, Col, Collapse } from 'react-bootstrap';

import useCriarAgendamentos from "../../hooks/agendamentos/useCriarAgendamentos";

function Adicionar({ onAdicionar }) {
  const [novoEvento, setNovoEvento] = useState({
    title: '',
    start: '',
    end: '',
    desc: '',
    color: '#3174ad',
    tipo: '',
    nomePaciente: '',
    linkSessao: ''
  });
  const [expanded, setExpanded] = useState(false);
  const { adicionarAgendamento } = useCriarAgendamentos();
  const [botaoDesativado, setBotaoDesativado] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovoEvento({ ...novoEvento, [name]: value });
  }

  const handleToggleExpanded = (e) => {
    e.stopPropagation();
    setExpanded(!expanded);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (novoEvento.title && novoEvento.start && novoEvento.end) {
      const startDate = new Date(novoEvento.start);
      const endDate = new Date(novoEvento.end);

      if (startDate >= endDate) {
        alert('A data início deve ser anterior à data de término');
        return;
      }

      if (botaoDesativado) return;

      setBotaoDesativado(true);
    
      setTimeout(() => {
        setBotaoDesativado(false); 
      }, 10000); 

      const userID = localStorage.getItem("userID");
      const agendamentoId = await adicionarAgendamento(userID, novoEvento.title, novoEvento.start, novoEvento.end, novoEvento.desc, novoEvento.color, novoEvento.tipo, novoEvento.nomePaciente, novoEvento.linkSessao);

      if (agendamentoId) {
        setNovoEvento({
          titulo: '',
          dataInicio: '',
          dataFim: '',
          desc: '',
          color: '#3174ad',
          tipo: '',
          nomePaciente: '',
          linkSessao: ''
        });
        window.location.reload();
      }
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  };


  return (
    <div className="adicionar p-3 rounded border border-white" style={{ backgroundColor: '#e9ecef', color: '#212529' }}>
      <h3>Adicionar Agendamento</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='formBasicTitle'>
          <Form.Label>Título do Evento</Form.Label>
          <Form.Control type="text" placeholder="Digite o Título" name="title" value={novoEvento.title} onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId='formBasicTitle'>
          <Form.Label>Nome do Paciente</Form.Label>
          <Form.Control type="text" placeholder="Digite o nome do Paciente" name="nomePaciente" value={novoEvento.nomePaciente} onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="formBasicStart">
          <Form.Label>Início</Form.Label>
          <Form.Control type="datetime-local" name="start" value={novoEvento.start} onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="formBasicEnd">
          <Form.Label>Término</Form.Label>
          <Form.Control type="datetime-local" name="end" value={novoEvento.end} onChange={handleChange} />
        </Form.Group>

        <Collapse in={expanded}>
          <div>
            <div>
              <Form.Group controlId='formBasicDesc'>
                <Form.Label>Descrição</Form.Label>
                <Form.Control type='text' placeholder='Descrição do evento' name='desc' value={novoEvento.desc} onChange={handleChange} />
              </Form.Group>
            </div>
            <Row>
              <Col xs={3}>
                <Form.Group controlId='formBasicColor'>
                  <Form.Label>Cor</Form.Label>
                  <Form.Control type='color' name='color' value={novoEvento.color} onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col xs={9}>
                <Form.Group controlId='formBasicTipo'>
                  <Form.Label>Tipo</Form.Label>
                  <Form.Control type='text' placeholder='Digite o tipo de evento' name='tipo' value={novoEvento.tipo} onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId='formBasicTipo'>
                  <Form.Label>Link da sessão</Form.Label>
                  <Form.Control type='text' placeholder='Digite o link da sessão' name='linkSessao' value={novoEvento.linkSessao} onChange={handleChange} />
                </Form.Group>
              </Col>
            </Row>
          </div>
        </Collapse>

        <button
          type="button"
          className="adicionar-evento-plus"
          onClick={handleToggleExpanded}
          aria-label="Expandir para adicionar mais descrições">
          {expanded ? '-' : '+'}
        </button>
        <Button
          variant='success'
          type='submit'
          style={{ marginTop: '10px', marginLeft: 'auto', display: 'block' }}
          disabled={!novoEvento.title || !novoEvento.start || !novoEvento.end || !novoEvento.nomePaciente}
        >
          {botaoDesativado ? 'Aguarde' : 'Salvar'}
        </Button>
      </Form>
    </div>
  );
}

export default Adicionar;
