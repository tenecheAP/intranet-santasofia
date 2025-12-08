import React from 'react';
import './Plataforma.css';

function Plataforma() {
    return (
        <div className="plataforma-page">
            <div className="page-header">
                <h1>Plataforma Estratégica</h1>
                <p>Nuestra razón de ser y hacia dónde vamos.</p>
            </div>

            <section className="mission-vision-section">
                <div className="mv-card mission">
                    <div className="icon-container">
                        <i className="fas fa-bullseye"></i>
                    </div>
                    <h2>Misión</h2>
                    <p>
                        Somos una Empresa Social del Estado que presta servicios de salud de mediana y alta complejidad,
                        comprometida con la seguridad del paciente, la humanización del servicio, el desarrollo del talento humano,
                        la gestión del conocimiento y la sostenibilidad financiera y social.
                    </p>
                </div>

                <div className="mv-card vision">
                    <div className="icon-container">
                        <i className="fas fa-eye"></i>
                    </div>
                    <h2>Visión</h2>
                    <p>
                        Para el año 2026, seremos reconocidos como el Hospital Universitario referente en la región,
                        líder en la prestación de servicios de salud de alta complejidad, con estándares superiores de calidad,
                        investigación e innovación.
                    </p>
                </div>
            </section>

            <section className="values-section">
                <h2>Valores Corporativos</h2>
                <div className="values-grid">
                    <div className="value-item">
                        <i className="fas fa-heart"></i>
                        <h3>Humanización</h3>
                        <p>Trato digno, cálido y empático.</p>
                    </div>
                    <div className="value-item">
                        <i className="fas fa-hand-holding-heart"></i>
                        <h3>Honestidad</h3>
                        <p>Transparencia en todas nuestras actuaciones.</p>
                    </div>
                    <div className="value-item">
                        <i className="fas fa-users"></i>
                        <h3>Trabajo en Equipo</h3>
                        <p>Sinergia para lograr objetivos comunes.</p>
                    </div>
                    <div className="value-item">
                        <i className="fas fa-shield-alt"></i>
                        <h3>Responsabilidad</h3>
                        <p>Compromiso con nuestras obligaciones.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Plataforma;
