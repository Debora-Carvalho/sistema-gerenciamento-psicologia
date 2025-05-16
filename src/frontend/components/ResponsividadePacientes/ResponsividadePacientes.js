import React from 'react';
import './ResponsividadePacientes.css';
// Using inline SVG components instead of lucide-react
// since you mentioned you prefer not to use hooks or other elements

interface Patient {
    id: string;
    nome: string;
    dataSessao: string;
    idade: string;
}

interface ResponsividadePacientesState {
    searchTerm: string;
    patients: Patient[];
    visiblePatients: number;
}

class ResponsividadePacientes extends React.Component<{}, ResponsividadePacientesState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            searchTerm: '',
            patients: [
                { id: "1", nome: "Andréa Oliveira Justina", dataSessao: "27/09/2025", idade: "42 anos" },
                { id: "2", nome: "Andréa Oliveira Justina", dataSessao: "27/09/2025", idade: "42 anos" },
                { id: "3", nome: "Andréa Oliveira Justina", dataSessao: "27/09/2025", idade: "42 anos" },
                { id: "4", nome: "Andréa Oliveira Justina", dataSessao: "27/09/2025", idade: "42 anos" },
                { id: "5", nome: "Andréa Oliveira Justina", dataSessao: "27/09/2025", idade: "42 anos" },
                { id: "6", nome: "Andréa Oliveira Justina", dataSessao: "27/09/2025", idade: "42 anos" },
                { id: "7", nome: "Andréa Oliveira Justina", dataSessao: "27/09/2025", idade: "42 anos" },
            ],
            visiblePatients: 7
        };
    }

    handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ searchTerm: event.target.value });
    }

    handleEdit = (id: string) => {
        console.log("Editar paciente:", id);
    }

    handleDelete = (id: string) => {
        this.setState({
            patients: this.state.patients.filter(patient => patient.id !== id)
        });
    }

    handleLoadMore = () => {
        this.setState({ visiblePatients: this.state.visiblePatients + 5 });
    }

    render() {
        const { searchTerm, patients, visiblePatients } = this.state;

        const filteredPatients = searchTerm
            ? patients.filter(patient =>
                patient.nome.toLowerCase().includes(searchTerm.toLowerCase()))
            : patients;

        const displayedPatients = filteredPatients.slice(0, visiblePatients);

        return (
            <div className="patient-page">
                {/* Header */}
                <div className="patient-header">
                    <button className="menu-button">
                        {/* Menu icon */}
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1E40AF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="4" y1="6" x2="20" y2="6"></line>
                            <line x1="4" y1="12" x2="20" y2="12"></line>
                            <line x1="4" y1="18" x2="20" y2="18"></line>
                        </svg>
                    </button>

                    <div className="user-profile">
                        <div className="user-avatar">
                            {/* User icon */}
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                        </div>
                        <div className="user-info">
                            <div className="user-name">Ianara Holanda</div>
                            <div className="user-email">email@email.com</div>
                        </div>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="search-container">
                    <div className="search-icon">
                        {/* Search icon */}
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </div>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Pesquisar paciente"
                        value={searchTerm}
                        onChange={this.handleSearch}
                    />
                </div>

                {/* Patient List Header */}
                <div className="patient-list-header">
                    <h1 className="patient-title">Pacientes</h1>
                    <div className="filter-buttons">
                        <button className="filter-button">
                            {/* Filter icon */}
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                            </svg>
                        </button>
                        <button className="filter-button">
                            {/* User icon */}
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Patient List */}
                <div className="patient-list">
                    {displayedPatients.map((patient) => (
                        <div key={patient.id} className="patient-card">
                            <div className="patient-info">
                                <div className="info-row">
                                    <div className="info-label">Nome</div>
                                    <div className="info-value">{patient.nome}</div>
                                </div>
                                <div className="info-row">
                                    <div className="info-label">Data da sessão</div>
                                    <div className="info-value">{patient.dataSessao}</div>
                                </div>
                                <div className="info-row">
                                    <div className="info-label">Idade</div>
                                    <div className="info-value">{patient.idade}</div>
                                </div>

                                <div className="action-buttons">
                                    <button
                                        onClick={() => this.handleEdit(patient.id)}
                                        className="action-button"
                                    >
                                        {/* Edit icon */}
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                        </svg>
                                        <span>Editar</span>
                                    </button>

                                    <button
                                        onClick={() => this.handleDelete(patient.id)}
                                        className="action-button"
                                    >
                                        {/* Delete icon */}
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="3 6 5 6 21 6"></polyline>
                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                        </svg>
                                        <span>Excluir</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {visiblePatients < filteredPatients.length && (
                    <div className="load-more">
                        <button
                            onClick={this.handleLoadMore}
                            className="load-more-button"
                        >
                            Ver mais
                        </button>
                    </div>
                )}
            </div>
        );
    }
}

export default ResponsividadePacientes;


//AMANDA SUA BURRA: AJusta o filtro;Espaço vazio; botões e garante que a foto do user tá aparecendo. pfv.