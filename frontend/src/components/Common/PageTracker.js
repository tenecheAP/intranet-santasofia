// src/components/Common/PageTracker.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackVisit } from '../../services/api/analytics.service';

// Helper to generate a UUID (v4) for anonymous session tracking
const generateSessionId = () => {
  // Simple implementation – sufficient for demo purposes
  return 'xxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const PageTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Retrieve or create session ID (persisted in localStorage)
    let sessionId = localStorage.getItem('analyticsSessionId');
    if (!sessionId) {
      sessionId = generateSessionId();
      localStorage.setItem('analyticsSessionId', sessionId);
    }

    // Prepare payload – keep it lightweight for the public endpoint
    const payload = {
      session_id: sessionId,
      pagina: location.pathname,
      titulo_pagina: document.title,
      pagina_origen: document.referrer || undefined,
      resolucion_pantalla: `${window.innerWidth}x${window.innerHeight}`,
    };

    // Fire‑and‑forget – the endpoint returns 204 quickly
    trackVisit(payload).catch((err) => {
      // Silently ignore errors to avoid affecting user experience
      console.warn('Analytics tracking error (ignored):', err);
    });
  }, [location]); // Re‑run on every navigation change

  return null; // No UI – this component purely triggers side‑effects
};

export default PageTracker;
