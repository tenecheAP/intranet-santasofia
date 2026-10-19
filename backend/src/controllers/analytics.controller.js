const pool = require('../db/pool');

// ── Utilidades para parsear User-Agent ──
const parseUserAgent = (ua) => {
    if (!ua) return { navegador: 'Desconocido', sistema_operativo: 'Desconocido', tipo_dispositivo: 'desktop' };

    let navegador = 'Otro';
    if (ua.includes('Edg/')) navegador = 'Edge';
    else if (ua.includes('Chrome/')) navegador = 'Chrome';
    else if (ua.includes('Firefox/')) navegador = 'Firefox';
    else if (ua.includes('Safari/') && !ua.includes('Chrome')) navegador = 'Safari';
    else if (ua.includes('Opera') || ua.includes('OPR/')) navegador = 'Opera';

    let sistema_operativo = 'Otro';
    if (ua.includes('Windows NT 10')) sistema_operativo = 'Windows 10/11';
    else if (ua.includes('Windows NT')) sistema_operativo = 'Windows';
    else if (ua.includes('Mac OS X')) sistema_operativo = 'macOS';
    else if (ua.includes('Android')) sistema_operativo = 'Android';
    else if (ua.includes('iPhone') || ua.includes('iPad')) sistema_operativo = 'iOS';
    else if (ua.includes('Linux')) sistema_operativo = 'Linux';

    let tipo_dispositivo = 'desktop';
    if (ua.includes('Mobile') || ua.includes('Android')) tipo_dispositivo = 'mobile';
    if (ua.includes('iPad') || ua.includes('Tablet')) tipo_dispositivo = 'tablet';

    return { navegador, sistema_operativo, tipo_dispositivo };
};

// ── POST /analytics/track — Registrar una visita ──
const trackVisit = async (req, res) => {
    try {
        const {
            session_id,
            pagina,
            titulo_pagina,
            pagina_origen,
            accion = 'pageview',
            resolucion_pantalla,
            duracion_segundos = 0,
            // Datos de usuario (opcionales, solo si está logueado)
            usuario_id = null,
            usuario_nombre = null
        } = req.body;

        if (!pagina) {
            return res.status(400).json({ error: 'El campo pagina es requerido' });
        }

        // Obtener IP del visitante
        const ip_address = req.headers['x-forwarded-for']?.split(',')[0]?.trim()
            || req.connection?.remoteAddress
            || req.ip
            || 'desconocida';

        const user_agent = req.headers['user-agent'] || '';
        const { navegador, sistema_operativo, tipo_dispositivo } = parseUserAgent(user_agent);

        await pool.query(
            `INSERT INTO visitas 
            (session_id, usuario_id, usuario_nombre, pagina, titulo_pagina, pagina_origen, accion, ip_address, user_agent, navegador, sistema_operativo, tipo_dispositivo, resolucion_pantalla, duracion_segundos) 
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)`,
            [session_id, usuario_id, usuario_nombre, pagina, titulo_pagina, pagina_origen, accion, ip_address, user_agent, navegador, sistema_operativo, tipo_dispositivo, resolucion_pantalla, duracion_segundos]
        );

        // Responder rápido sin cuerpo para no bloquear al cliente
        res.status(204).end();
    } catch (error) {
        console.error('Error tracking visit:', error);
        // No enviar error al cliente para no afectar la experiencia
        res.status(204).end();
    }
};

// ── GET /analytics/overview — Resumen general ──
const getOverview = async (req, res) => {
    try {
        const { desde, hasta } = req.query;
        const dateFilter = buildDateFilter(desde, hasta);

        const queries = await Promise.all([
            // Total visitas
            pool.query(`SELECT COUNT(*) as total FROM visitas WHERE accion = 'pageview' ${dateFilter.where}`, dateFilter.params),
            // Sesiones únicas (visitantes)
            pool.query(`SELECT COUNT(DISTINCT session_id) as total FROM visitas WHERE accion = 'pageview' ${dateFilter.where}`, dateFilter.params),
            // IPs únicas
            pool.query(`SELECT COUNT(DISTINCT ip_address) as total FROM visitas WHERE accion = 'pageview' ${dateFilter.where}`, dateFilter.params),
            // Páginas distintas visitadas
            pool.query(`SELECT COUNT(DISTINCT pagina) as total FROM visitas WHERE accion = 'pageview' ${dateFilter.where}`, dateFilter.params),
            // Tiempo promedio en página
            pool.query(`SELECT COALESCE(ROUND(AVG(duracion_segundos)), 0) as promedio FROM visitas WHERE duracion_segundos > 0 ${dateFilter.where}`, dateFilter.params),
            // Visitas hoy
            pool.query(`SELECT COUNT(*) as total FROM visitas WHERE accion = 'pageview' AND created_at::date = CURRENT_DATE`),
            // Sesiones hoy
            pool.query(`SELECT COUNT(DISTINCT session_id) as total FROM visitas WHERE accion = 'pageview' AND created_at::date = CURRENT_DATE`),
        ]);

        res.json({
            total_visitas: parseInt(queries[0].rows[0].total),
            visitantes_unicos: parseInt(queries[1].rows[0].total),
            ips_unicas: parseInt(queries[2].rows[0].total),
            paginas_distintas: parseInt(queries[3].rows[0].total),
            tiempo_promedio_segundos: parseInt(queries[4].rows[0].promedio),
            visitas_hoy: parseInt(queries[5].rows[0].total),
            visitantes_hoy: parseInt(queries[6].rows[0].total),
        });
    } catch (error) {
        console.error('Error getting overview:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// ── GET /analytics/top-pages — Páginas más visitadas ──
const getTopPages = async (req, res) => {
    try {
        const { desde, hasta, limit = 10 } = req.query;
        const dateFilter = buildDateFilter(desde, hasta);

        const result = await pool.query(
            `SELECT pagina, titulo_pagina, COUNT(*) as visitas, COUNT(DISTINCT session_id) as visitantes_unicos
             FROM visitas 
             WHERE accion = 'pageview' ${dateFilter.where}
             GROUP BY pagina, titulo_pagina
             ORDER BY visitas DESC
             LIMIT $${dateFilter.params.length + 1}`,
            [...dateFilter.params, parseInt(limit)]
        );

        res.json(result.rows);
    } catch (error) {
        console.error('Error getting top pages:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// ── GET /analytics/visits-by-date — Visitas agrupadas por día ──
const getVisitsByDate = async (req, res) => {
    try {
        const { desde, hasta } = req.query;
        const dateFilter = buildDateFilter(desde, hasta);

        const result = await pool.query(
            `SELECT created_at::date as fecha, COUNT(*) as visitas, COUNT(DISTINCT session_id) as visitantes
             FROM visitas 
             WHERE accion = 'pageview' ${dateFilter.where}
             GROUP BY fecha
             ORDER BY fecha ASC`,
            dateFilter.params
        );

        res.json(result.rows);
    } catch (error) {
        console.error('Error getting visits by date:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// ── GET /analytics/visits-by-hour — Distribución por hora del día ──
const getVisitsByHour = async (req, res) => {
    try {
        const { desde, hasta } = req.query;
        const dateFilter = buildDateFilter(desde, hasta);

        const result = await pool.query(
            `SELECT EXTRACT(HOUR FROM created_at) as hora, COUNT(*) as visitas
             FROM visitas 
             WHERE accion = 'pageview' ${dateFilter.where}
             GROUP BY hora
             ORDER BY hora ASC`,
            dateFilter.params
        );

        // Rellenar las 24 horas (las que no tengan datos se ponen en 0)
        const hoursMap = {};
        result.rows.forEach(r => { hoursMap[parseInt(r.hora)] = parseInt(r.visitas); });
        const hours = Array.from({ length: 24 }, (_, i) => ({
            hora: i,
            visitas: hoursMap[i] || 0
        }));

        res.json(hours);
    } catch (error) {
        console.error('Error getting visits by hour:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// ── GET /analytics/devices — Distribución por tipo de dispositivo ──
const getDeviceStats = async (req, res) => {
    try {
        const { desde, hasta } = req.query;
        const dateFilter = buildDateFilter(desde, hasta);

        const result = await pool.query(
            `SELECT tipo_dispositivo, COUNT(*) as total
             FROM visitas 
             WHERE accion = 'pageview' ${dateFilter.where}
             GROUP BY tipo_dispositivo
             ORDER BY total DESC`,
            dateFilter.params
        );

        res.json(result.rows);
    } catch (error) {
        console.error('Error getting device stats:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// ── GET /analytics/browsers — Distribución por navegador ──
const getBrowserStats = async (req, res) => {
    try {
        const { desde, hasta } = req.query;
        const dateFilter = buildDateFilter(desde, hasta);

        const result = await pool.query(
            `SELECT navegador, COUNT(*) as total
             FROM visitas 
             WHERE accion = 'pageview' ${dateFilter.where}
             GROUP BY navegador
             ORDER BY total DESC`,
            dateFilter.params
        );

        res.json(result.rows);
    } catch (error) {
        console.error('Error getting browser stats:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// ── GET /analytics/active-users — Usuarios activos en los últimos 5 minutos ──
const getActiveUsers = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT COUNT(DISTINCT session_id) as activos
             FROM visitas 
             WHERE created_at >= NOW() - INTERVAL '5 minutes'`
        );

        res.json({ activos: parseInt(result.rows[0].activos) });
    } catch (error) {
        console.error('Error getting active users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// ── Utilidad: construir filtro de fechas ──
function buildDateFilter(desde, hasta) {
    const params = [];
    let where = '';

    if (desde) {
        params.push(desde);
        where += ` AND created_at >= $${params.length}::timestamp`;
    }
    if (hasta) {
        params.push(hasta + ' 23:59:59');
        where += ` AND created_at <= $${params.length}::timestamp`;
    }
    return { where, params };
}

// ── GET /analytics/monthly-summary — Resumen por mes (agrupado) ──
const getMonthlySummary = async (req, res) => {
    try {
        const { desde, hasta, mes } = req.query; // optional date range or specific month (YYYY-MM)
        const dateFilter = buildDateFilter(desde, hasta);
        let whereClause = dateFilter.where;
        const params = [...dateFilter.params];
        if (mes) {
            // filter by month using TO_CHAR
            whereClause = ` AND TO_CHAR(created_at, 'YYYY-MM') = $${params.length + 1}`;
            params.push(mes);
        }
        const result = await pool.query(
            `SELECT TO_CHAR(created_at, 'YYYY-MM') as mes,
                    COUNT(*) as visitas,
                    COUNT(DISTINCT session_id) as visitantes_unicos,
                    COUNT(DISTINCT ip_address) as ips_unicas,
                    COUNT(DISTINCT pagina) as paginas_distintas,
                    COALESCE(ROUND(AVG(duracion_segundos)),0) as tiempo_promedio_segundos
             FROM visitas
             WHERE accion = 'pageview' ${whereClause}
             GROUP BY mes
             ORDER BY mes DESC`,
            params
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error getting monthly summary:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
// Duplicate buildDateFilter removed - original implementation retained above

module.exports = {
    trackVisit,
    getOverview,
    getTopPages,
    getVisitsByDate,
    getVisitsByHour,
    getDeviceStats,
    getBrowserStats,
    getActiveUsers,
    getMonthlySummary,
};
