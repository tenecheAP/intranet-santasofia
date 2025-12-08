import React from 'react';
import './NewsSidebar.css';

const sidebarNews = [
    {
        id: 1,
        title: 'El Almacén estrena nuevo espacio',
        date: '29 Oct',
        link: '#'
    },
    {
        id: 2,
        title: 'Consulta de Acuerdos del Consejo Superior',
        date: '28 Oct',
        link: '#'
    },
    {
        id: 3,
        title: 'Convocatoria asistentes jurídicos 2026',
        date: '27 Oct',
        link: '#'
    },
    {
        id: 4,
        title: 'Boletín Pedagógico N.° 04',
        date: '26 Oct',
        link: '#'
    }
];

function NewsSidebar() {
    return (
        <aside className="news-sidebar">
            <div className="news-sidebar-header">
                <h3>Últimas Noticias</h3>
                <a href="#" className="view-all">Ver todas</a>
            </div>
            <div className="news-list">
                {sidebarNews.map((item) => (
                    <div className="news-item" key={item.id}>
                        <span className="news-date">{item.date}</span>
                        <a href={item.link} className="news-title">{item.title}</a>
                    </div>
                ))}
            </div>
            <div className="quick-links">
                <h4>Enlaces de Interés</h4>
                <ul>
                    <li><a href="#">Hoy en la U</a></li>
                    <li><a href="#">Al día</a></li>
                    <li><a href="#">Fotos</a></li>
                    <li><a href="#">Participe</a></li>
                </ul>
            </div>
        </aside>
    );
}

export default NewsSidebar;
