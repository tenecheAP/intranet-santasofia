import React, { useState } from 'react';
import './HelpDeskModal.css';
import { X, ExternalLink, Chrome, ChevronDown, ChevronUp, FileText } from 'lucide-react';

const HelpDeskModal = ({ isOpen, onClose }) => {
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

    if (!isOpen) return null;

    const helpDesks = [
        { name: "Mesa de Ayuda Planeación e Información", url: "http://192.168.40.250:8202/index.php?noAUTO=1" },
        { name: "Mesa de Ayuda Comunicación y Mercadeo", url: "http://192.168.40.250:8205/index.php?noAUTO=" },
        { name: "Mesa de Ayuda Ingeniería Biomédica", url: "http://192.168.40.250:8203/index.php?noAUTO=" },
        { name: "Mesa de Ayuda Apoyo Logístico", url: "http://192.168.40.250:8204/index.php?noAUTO=1" },
        { name: "Mesa de Ayuda Control Interno", url: "http://mesacontrolinterno/helpdesk/" },
        { name: "Mesa de Ayuda Jurídica", url: "http://192.168.40.250:8207/index.php?noAUTO=1" },
        { name: "Mesa de Ayuda Talento Humano", url: "http://192.168.40.250:8206/index.php?noAUTO=1" },
    ];

    const manualUrl = "http://intranet/intraweb/documentos/TICS/Paso-a-Paso-Solicitudes-Mesa-de-Ayuda-ese-hdussc.pdf";

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>
                    <X size={24} />
                </button>

                <div className="modal-header">
                    <h2>Mesa de Ayuda del Hospital Santa Sofía</h2>
                </div>

                <div className="modal-body">
                    <div className={`description-container ${isDescriptionExpanded ? 'expanded' : 'collapsed'}`}>
                        <p className="description-text">
                            Es una plataforma de servicio especializado que reúne un grupo de recursos, que a través de uno o varios medios de contacto, ofrece la posibilidad de hacer requerimientos relacionados con Tecnologías de la Información y Comunicación, desde su inicio hasta su cierre, con el objetivo de lograr un máximo nivel de productividad de los integrantes del hospital y el mayor grado de disponibilidad de los recursos informáticos, tecnológicos y de comunicación que éstos emplean en su gestión diaria.
                        </p>

                        <p className="description-text highlight">
                            Una solicitud que antes se realizaba en papel hoy se realiza mediante la Mesa de Ayuda de Planeación e información, Comunicación y Mercadeo e Ingeniería Biomédica y Apoyo Logístico.
                        </p>
                    </div>

                    <button
                        className="toggle-description-btn"
                        onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                    >
                        {isDescriptionExpanded ? (
                            <>Ver menos <ChevronUp size={16} /></>
                        ) : (
                            <>Ver descripción completa <ChevronDown size={16} /></>
                        )}
                    </button>

                    <div className="help-desk-grid">
                        {helpDesks.map((desk, index) => (
                            <a key={index} href={desk.url} className="help-desk-item" target="_blank" rel="noopener noreferrer">
                                <span className="desk-name">{desk.name}</span>
                                <ExternalLink size={16} className="external-icon" />
                            </a>
                        ))}

                        {/* Manual Card - Styled Slightly Differently */}
                        <a href={manualUrl} className="help-desk-item manual-item" target="_blank" rel="noopener noreferrer">
                            <span className="desk-name">Manual de Usuario</span>
                            <FileText size={16} className="external-icon" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HelpDeskModal;
