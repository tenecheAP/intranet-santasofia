import React from 'react';
import { useLocation } from 'react-router-dom';

function PlaceholderPage() {
    const location = useLocation();

    // Extract the section name from the path for display
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const title = pathSegments.length > 0
        ? pathSegments[pathSegments.length - 1].replace(/-/g, ' ').toUpperCase()
        : 'PÁGINA EN CONSTRUCCIÓN';

    return (
        <div style={{ textAlign: 'center', padding: '4rem 2rem', color: '#555' }}>
            <i className="fas fa-hard-hat" style={{ fontSize: '4rem', color: '#e0e0e0', marginBottom: '1.5rem' }}></i>
            <h1 style={{ color: 'var(--color-primary)', marginBottom: '1rem' }}>{title}</h1>
            <p style={{ fontSize: '1.2rem' }}>
                Esta sección se encuentra actualmente en desarrollo.
                <br />
                Pronto encontrarás aquí toda la información relacionada.
            </p>
        </div>
    );
}

export default PlaceholderPage;
