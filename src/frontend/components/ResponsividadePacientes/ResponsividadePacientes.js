import React from 'react';
import { FiMenu, FiUser, FiSearch, FiFilter, FiEdit, FiTrash2, FiX, FiSave, FiDownload } from 'react-icons/fi';
import './ResponsividadePacientes.css';

class ResponsividadePacientes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            patients: [
                {
                    id: "1",
                    nome: "Andréa Oliveira Justina",
                    profissao: "Psicóloga",
                    genero: "Feminino",
                    estadoCivil: "Casada",
                    telefone: "(11) 98765-4321",
                    email: "andrea@email.com",
                    preferenciaContato: "WhatsApp",
                    dataNascimento: "15/05/1980",
                    idade: "42 anos"
                },
                {
                    id: "2",
                    nome: "Carlos Silva",
                    profissao: "Engenheiro",
                    genero: "Masculino",
                    estadoCivil: "Solteiro",
                    telefone: "(21) 99876-5432",
                    email: "carlos@email.com",
                    preferenciaContato: "Telefone",
                    dataNascimento: "22/10/1987",
                    idade: "35 anos"
                },
                {
                    id: "3",
                    nome: "Mariana Costa",
                    profissao: "Advogada",
                    genero: "Feminino",
                    estadoCivil: "Divorciada",
                    telefone: "(31) 98765-1234",
                    email: "mariana@email.com",
                    preferenciaContato: "Email",
                    dataNascimento: "03/07/1993",
                    idade: "28 anos"
                },
            ],
            visiblePatients: 5,
            showForm: false,
            showExportConfirm: false,
            showDeleteConfirm: false,
            showFilterOptions: false,
            filterBy: 'nome',
            patientToDelete: null,
            formData: {
                id: '',
                nome: '',
                profissao: '',
                genero: '',
                estadoCivil: '',
                telefone: '',
                email: '',
                preferenciaContato: '',
                dataNascimento: '',
                idade: ''
            },
            formErrors: {
                nome: '',
                email: '',
                dataNascimento: ''
            },
            isEditing: false
        };
    }

    toggleFilterOptions = () => {
        this.setState(prevState => ({
            showFilterOptions: !prevState.showFilterOptions
        }));
    };

    handleFilterChange = (type) => {
        this.setState({
            filterBy: type,
            showFilterOptions: false
        });
    };

    handleSearch = (event) => {
        this.setState({ searchTerm: event.target.value });
    }

    handleEdit = (patient) => {
        this.setState({
            formData: {
                id: patient.id,
                nome: patient.nome,
                profissao: patient.profissao,
                genero: patient.genero,
                estadoCivil: patient.estadoCivil,
                telefone: patient.telefone,
                email: patient.email,
                preferenciaContato: patient.preferenciaContato,
                dataNascimento: patient.dataNascimento,
                idade: patient.idade
            },
            isEditing: true,
            showForm: true,
            formErrors: {
                nome: '',
                email: '',
                dataNascimento: ''
            }
        });
    }

    handleDeleteClick = (id) => {
        this.setState({
            showDeleteConfirm: true,
            patientToDelete: id
        });
    }

    handleDeleteConfirm = () => {
        this.setState(prevState => ({
            patients: prevState.patients.filter(patient => patient.id !== prevState.patientToDelete),
            showDeleteConfirm: false,
            patientToDelete: null
        }));
    }

    handleDeleteCancel = () => {
        this.setState({
            showDeleteConfirm: false,
            patientToDelete: null
        });
    }

    handleLoadMore = () => {
        this.setState(prevState => ({
            visiblePatients: prevState.visiblePatients + 5
        }));
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;

        let error = '';
        if (name === 'nome') {
            if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(value) && value !== '') {
                error = 'Nome deve conter apenas letras';
            }
        } else if (name === 'telefone') {
            const numericValue = value.replace(/\D/g, '');
            let formattedValue = numericValue;

            if (numericValue.length > 2) {
                formattedValue = `(${numericValue.substring(0, 2)}) ${numericValue.substring(2)}`;
            }
            if (numericValue.length > 7) {
                formattedValue = formattedValue.substring(0, 10) + '-' + formattedValue.substring(10);
            }

            this.setState(prevState => ({
                formData: {
                    ...prevState.formData,
                    [name]: formattedValue.substring(0, 15)
                }
            }));
            return;
        } else if (name === 'dataNascimento') {
            const numericValue = value.replace(/\D/g, '');
            let formattedValue = numericValue;

            if (numericValue.length > 2) {
                formattedValue = `${numericValue.substring(0, 2)}/${numericValue.substring(2)}`;
            }
            if (numericValue.length > 4) {
                formattedValue = `${formattedValue.substring(0, 5)}/${formattedValue.substring(5)}`;
            }

            this.setState(prevState => ({
                formData: {
                    ...prevState.formData,
                    [name]: formattedValue.substring(0, 10)
                }
            }));
            return;
        } else if (name === 'email' && value) {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                error = 'Email inválido';
            }
        }

        this.setState(prevState => ({
            formData: {
                ...prevState.formData,
                [name]: value
            },
            formErrors: {
                ...prevState.formErrors,
                [name]: error
            }
        }));
    }

    validateForm = () => {
        const { formData } = this.state;
        const errors = {};
        let isValid = true;

        if (!formData.nome.trim()) {
            errors.nome = 'Nome é obrigatório';
            isValid = false;
        } else if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(formData.nome)) {
            errors.nome = 'Nome deve conter apenas letras';
            isValid = false;
        }

        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = 'Email inválido';
            isValid = false;
        }

        if (formData.dataNascimento) {
            const today = new Date();
            const birthDate = new Date(
                parseInt(formData.dataNascimento.substring(6, 10)),
                parseInt(formData.dataNascimento.substring(3, 5)) - 1,
                parseInt(formData.dataNascimento.substring(0, 2))
            );

            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();

            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }

            if (age < 18) {
                errors.dataNascimento = 'Paciente deve ter mais de 18 anos';
                isValid = false;
            }
        } else {
            errors.dataNascimento = 'Data de nascimento é obrigatória';
            isValid = false;
        }

        this.setState({ formErrors: errors });
        return isValid;
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if (!this.validateForm()) {
            return;
        }

        const { patients, formData, isEditing } = this.state;

        const birthDate = new Date(
            parseInt(formData.dataNascimento.substring(6, 10)),
            parseInt(formData.dataNascimento.substring(3, 5)) - 1,
            parseInt(formData.dataNascimento.substring(0, 2))
        );
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        const updatedFormData = {
            ...formData,
            idade: `${age} anos`
        };

        if (isEditing) {
            const updatedPatients = patients.map(patient =>
                patient.id === formData.id ? updatedFormData : patient
            );
            this.setState({
                patients: updatedPatients,
                showForm: false,
                isEditing: false,
                formData: {
                    id: '',
                    nome: '',
                    profissao: '',
                    genero: '',
                    estadoCivil: '',
                    telefone: '',
                    email: '',
                    preferenciaContato: '',
                    dataNascimento: '',
                    idade: ''
                },
                formErrors: {
                    nome: '',
                    email: '',
                    dataNascimento: ''
                }
            });
        } else {
            const newPatient = {
                ...updatedFormData,
                id: Date.now().toString()
            };
            this.setState({
                patients: [...patients, newPatient],
                showForm: false,
                formData: {
                    id: '',
                    nome: '',
                    profissao: '',
                    genero: '',
                    estadoCivil: '',
                    telefone: '',
                    email: '',
                    preferenciaContato: '',
                    dataNascimento: '',
                    idade: ''
                },
                formErrors: {
                    nome: '',
                    email: '',
                    dataNascimento: ''
                }
            });
        }
    }

    openNewPatientForm = () => {
        this.setState({
            showForm: true,
            isEditing: false,
            formData: {
                id: '',
                nome: '',
                profissao: '',
                genero: '',
                estadoCivil: '',
                telefone: '',
                email: '',
                preferenciaContato: '',
                dataNascimento: '',
                idade: ''
            },
            formErrors: {
                nome: '',
                email: '',
                dataNascimento: ''
            }
        });
    }

    closeForm = () => {
        this.setState({
            showForm: false,
            isEditing: false,
            formData: {
                id: '',
                nome: '',
                profissao: '',
                genero: '',
                estadoCivil: '',
                telefone: '',
                email: '',
                preferenciaContato: '',
                dataNascimento: '',
                idade: ''
            },
            formErrors: {
                nome: '',
                email: '',
                dataNascimento: ''
            }
        });
    }

    handleExportClick = () => {
        this.setState({ showExportConfirm: true });
    }

    handleExportConfirm = () => {
        this.exportToPDF();
        this.setState({ showExportConfirm: false });
    }

    handleExportCancel = () => {
        this.setState({ showExportConfirm: false });
    }

    exportToPDF = () => {
        const { patients } = this.state;
        const content = patients.map(patient =>
            `Nome: ${patient.nome}\nProfissão: ${patient.profissao}\nGênero: ${patient.genero}\n` +
            `Estado Civil: ${patient.estadoCivil}\nTelefone: ${patient.telefone}\nEmail: ${patient.email}\n` +
            `Preferência de Contato: ${patient.preferenciaContato}\nData Nascimento: ${patient.dataNascimento}\n` +
            `Idade: ${patient.idade}\n\n`
        ).join('');

        const blob = new Blob([content], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'lista_pacientes.pdf';
        link.click();
    }

    getFilteredPatients = () => {
        const { patients, searchTerm, filterBy } = this.state;
        
        if (!searchTerm) return patients;

        switch(filterBy) {
            case 'nome':
                return patients.filter(patient =>
                    patient.nome.toLowerCase().includes(searchTerm.toLowerCase())
                );
            case 'dataNascimento':
                return patients.filter(patient =>
                    patient.dataNascimento.includes(searchTerm)
                );
            case 'idade':
                return patients.filter(patient => {
                    const patientAge = parseInt(patient.idade.split(' ')[0]);
                    const searchAge = parseInt(searchTerm);
                    return !isNaN(searchAge) && patientAge === searchAge;
                });
            default:
                return patients;
        }
    };

    render() {
        const {
            searchTerm,
            visiblePatients,
            showForm,
            showExportConfirm,
            showDeleteConfirm,
            showFilterOptions,
            filterBy,
            formData,
            formErrors,
            isEditing
        } = this.state;

        const filteredPatients = this.getFilteredPatients();
        const displayedPatients = filteredPatients.slice(0, visiblePatients);

        return (
            <div className="patient-page">
                
                <div className="patient-header">
                    <button className="menu-button">
                        <FiMenu size={24} color="#1E40AF" />
                    </button>

                    <div className="user-profile">
                        <div className="user-avatar">
                            <FiUser size={20} />
                        </div>
                        <div className="user-info">
                            <div className="user-name">Ianara Holanda</div>
                            <div className="user-email">email@email.com</div>
                        </div>
                    </div>
                </div>

                <div className="search-container">
                    <div className="search-icon">
                        <FiSearch size={20} color="#9CA3AF" />
                    </div>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Pesquisar paciente"
                        value={searchTerm}
                        onChange={this.handleSearch}
                    />
                </div>

                <div className="patient-list-header">
                    <h1 className="patient-title">Pacientes</h1>
                    <div className="filter-buttons">
                        <div className="filter-container">
                            <button 
                                className="filter-button" 
                                onClick={this.toggleFilterOptions}
                            >
                                <FiFilter size={20} />
                            </button>
                            {showFilterOptions && (
                                <div className="filter-options">
                                    <div 
                                        className={`filter-option ${filterBy === 'nome' ? 'filter-active' : ''}`}
                                        onClick={() => this.handleFilterChange('nome')}
                                    >
                                        Por Nome
                                    </div>
                                    <div 
                                        className={`filter-option ${filterBy === 'dataNascimento' ? 'filter-active' : ''}`}
                                        onClick={() => this.handleFilterChange('dataNascimento')}
                                    >
                                        Por Data
                                    </div>
                                    <div 
                                        className={`filter-option ${filterBy === 'idade' ? 'filter-active' : ''}`}
                                        onClick={() => this.handleFilterChange('idade')}
                                    >
                                        Por Idade
                                    </div>
                                </div>
                            )}
                        </div>
                        <button className="filter-button" onClick={this.handleExportClick}>
                            <FiDownload size={20} />
                        </button>
                        <button className="filter-button" onClick={this.openNewPatientForm}>
                            <FiUser size={20} />
                        </button>
                    </div>
                </div>

                {showExportConfirm && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h2>Exportar Lista de Pacientes</h2>
                                <button onClick={this.handleExportCancel} className="close-button">
                                    <FiX size={24} />
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Deseja exportar a lista de pacientes para PDF?</p>
                            </div>
                            <div className="form-actions">
                                <button type="button" onClick={this.handleExportCancel} className="cancel-button">
                                    Cancelar
                                </button>
                                <button type="button" onClick={this.handleExportConfirm} className="save-button">
                                    <FiDownload size={18} />
                                    Confirmar
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {showDeleteConfirm && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h2>Confirmar Exclusão</h2>
                                <button onClick={this.handleDeleteCancel} className="close-button">
                                    <FiX size={24} />
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Tem certeza que deseja excluir este paciente?</p>
                            </div>
                            <div className="form-actions">
                                <button type="button" onClick={this.handleDeleteCancel} className="cancel-button">
                                    Cancelar
                                </button>
                                <button type="button" onClick={this.handleDeleteConfirm} className="save-button">
                                    <FiTrash2 size={18} />
                                    Confirmar
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {showForm && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h2>{isEditing ? 'Editar Paciente' : 'Novo Paciente'}</h2>
                                <button onClick={this.closeForm} className="close-button">
                                    <FiX size={24} />
                                </button>
                            </div>
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label>Nome Completo*</label>
                                    <input
                                        type="text"
                                        name="nome"
                                        value={formData.nome}
                                        onChange={this.handleInputChange}
                                        required
                                        pattern="[a-zA-ZÀ-ÿ\s]+"
                                        title="Apenas letras são permitidas"
                                    />
                                    {formErrors.nome && <span className="error-message">{formErrors.nome}</span>}
                                </div>

                                <div className="form-group">
                                    <label>Profissão</label>
                                    <input
                                        type="text"
                                        name="profissao"
                                        value={formData.profissao}
                                        onChange={this.handleInputChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Gênero*</label>
                                    <select
                                        name="genero"
                                        value={formData.genero}
                                        onChange={this.handleInputChange}
                                        required
                                    >
                                        <option value="">Selecione</option>
                                        <option value="Feminino">Feminino</option>
                                        <option value="Masculino">Masculino</option>
                                        <option value="Não binário">Não binário</option>
                                        <option value="Outro">Outro</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Estado Civil*</label>
                                    <select
                                        name="estadoCivil"
                                        value={formData.estadoCivil}
                                        onChange={this.handleInputChange}
                                        required
                                    >
                                        <option value="">Selecione</option>
                                        <option value="Solteiro(a)">Solteiro(a)</option>
                                        <option value="Casado(a)">Casado(a)</option>
                                        <option value="Divorciado(a)">Divorciado(a)</option>
                                        <option value="Viúvo(a)">Viúvo(a)</option>
                                        <option value="Separado(a)">Separado(a)</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Telefone*</label>
                                    <input
                                        type="text"
                                        name="telefone"
                                        value={formData.telefone}
                                        onChange={this.handleInputChange}
                                        placeholder="(00) 00000-0000"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={this.handleInputChange}
                                    />
                                    {formErrors.email && <span className="error-message">{formErrors.email}</span>}
                                </div>

                                <div className="form-group">
                                    <label>Preferência de Contato*</label>
                                    <select
                                        name="preferenciaContato"
                                        value={formData.preferenciaContato}
                                        onChange={this.handleInputChange}
                                        required
                                    >
                                        <option value="">Selecione</option>
                                        <option value="Telefone">Telefone</option>
                                        <option value="Email">Email</option>
                                        <option value="WhatsApp">WhatsApp</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Data de Nascimento*</label>
                                    <input
                                        type="text"
                                        name="dataNascimento"
                                        value={formData.dataNascimento}
                                        onChange={this.handleInputChange}
                                        placeholder="DD/MM/AAAA"
                                        required
                                    />
                                    {formErrors.dataNascimento && <span className="error-message">{formErrors.dataNascimento}</span>}
                                </div>

                                <div className="form-actions">
                                    <button type="button" onClick={this.closeForm} className="cancel-button">
                                        Cancelar
                                    </button>
                                    <button type="submit" className="save-button">
                                        <FiSave size={18} />
                                        {isEditing ? 'Atualizar' : 'Salvar'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                <div className="patient-list">
                    {displayedPatients.map((patient) => (
                        <div key={patient.id} className="patient-card">
                            <div className="patient-info">
                                <div className="info-row">
                                    <div className="info-label">Nome</div>
                                    <div className="info-value">{patient.nome}</div>
                                </div>
                                <div className="info-row">
                                    <div className="info-label">Profissão</div>
                                    <div className="info-value">{patient.profissao}</div>
                                </div>
                                <div className="info-row">
                                    <div className="info-label">Telefone</div>
                                    <div className="info-value">{patient.telefone}</div>
                                </div>
                                <div className="info-row">
                                    <div className="info-label">Idade</div>
                                    <div className="info-value">{patient.idade}</div>
                                </div>

                                <div className="action-buttons">
                                    <button
                                        onClick={() => this.handleEdit(patient)}
                                        className="action-button"
                                    >
                                        <FiEdit size={20} />
                                        <span>Editar</span>
                                    </button>

                                    <button
                                        onClick={() => this.handleDeleteClick(patient.id)}
                                        className="action-button"
                                    >
                                        <FiTrash2 size={20} />
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