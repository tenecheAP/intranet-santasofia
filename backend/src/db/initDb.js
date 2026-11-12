const fs = require('fs');
const path = require('path');
const pool = require('./pool');

const APPS_INITIAL = [
    { id: 1, name: 'Sistema de Información Softhia RTI', url: 'http://192.168.40.58:8181/RTI/', description: 'Recepción y administración de medicamentos en Farmacia, basado en norma NTC-ISO 2859-1, con registro de actas y defectos en lotes.' },
    { id: 2, name: 'Sistema de Información Ssofthia Labind', url: 'http://192.168.40.58:8181/Labind/', description: 'Registro de pacientes e insumos en la toma de muestras de laboratorio clínico; mide tiempos de espera.' },
    { id: 3, name: 'Sistema de Información Ssofthia Contacto', url: 'http://192.168.40.58:8181/CONTACTO/', description: 'Lista de espera para citas de consulta externa o procedimientos ambulatorios no asignables en Hosvital.' },
    { id: 4, name: 'Sistema de Información Ssofthia Negación de Citas', url: 'http://192.168.40.58:8181/NegacionCitas/', description: 'Registro de causas y especialidades de negaciones de citas por el centro de contacto.' },
    { id: 5, name: 'Sistema de Información Ssofthia Registro Único de Transfusiones Sanguíneas', url: 'http://192.168.40.58:8181/SABANA2014/', description: 'Gestión de solicitud, reserva, envío, devolución y facturación de hemocomponentes (Hemovigilancia).' },
    { id: 6, name: 'Sistema de Información Ssofthia Cambio de Turnos Médicos', url: 'http://192.168.40.101/CAMBIOTURNO/', description: 'Registro de diagnósticos, evolución y procedimientos pendientes para entrega de turno médico.' },
    { id: 7, name: 'Sistema de Información Ssofthia Sala de Espera: SSOFTHIA QUIRÓFANO', url: 'http://192.168.40.58:8181/ESPERACX/', description: 'Visualización en sala de espera de cirugías con avisos auditivos y visuales del estado de los procedimientos.' },
    { id: 8, name: 'Sistema de Información de Entrega de Imágenes Diagnósticas', url: 'http://192.168.40.101/ENTREGAIMAGENES/', description: 'Registro de entrega de imágenes diagnósticas a los usuarios.' },
    { id: 9, name: 'Ssofthia Stock de insumos', url: 'http://192.168.40.101/stock/public/', description: 'Control de insumos por servicio mediante lectura de códigos de barras y gestión de fechas de vencimiento.' },
    { id: 10, name: 'Abreviaturas y Acrónimos en la Historia Clínica', url: 'http://192.168.40.101/ACRONIMO/', description: 'Manual de uso de abreviaturas y acrónimos en la historia clínica.' },
    { id: 11, name: 'Sistema de Impresión Cuidados de Enfermería', url: 'http://192.168.40.58:8181/CUIDADOSENF/Vista/logueo.jsp?admin=SI', description: 'Visualización e impresión de planes de cuidados de enfermería por pabellón y cama (programados en Hosvital).' },
    { id: 12, name: 'Ssofthia Priorización Cirugías', url: 'http://192.168.40.101/HV/', description: 'Registro de documentación para priorizar procedimientos quirúrgicos.' },
    { id: 13, name: 'Ssofthia Programador Nutriciones Parenterales', url: 'http://192.168.40.58:8081/NPT/index.php', description: 'Generación de nutriciones parenterales en Farmacia según requerimientos del nutricionista.' },
    { id: 14, name: 'Ssofthia sala espera Consulta Externa', url: 'http://192.168.40.101/SALAESPERACE/', description: 'Llamado visible en pantalla para pacientes en sala de espera de consulta externa.' },
    { id: 15, name: 'Ssofthia asistencia a capacitaciones', url: 'http://192.168.40.101/ASISTENCIA/', description: 'Registro de asistencia a capacitaciones mediante código de barras del carnet.' },
    { id: 16, name: 'Ssofthia hojas de vida contratistas', url: 'http://192.168.40.101/HV/', description: 'Registro de datos y documentos de contratistas (certificaciones, vacunas, etc.) con subida de archivos.' },
    { id: 17, name: 'Ssofthia Comprobantes de Egreso', url: 'http://192.168.40.101/COPEGRESO/', description: 'Envío automático de comprobantes de egreso a correos de proveedores.' },
    { id: 18, name: 'Ssofthia cobro deudores', url: 'http://192.168.40.101/DEUDORES/', description: 'Cobro automatizado a deudores mediante correos electrónicos.' },
    { id: 19, name: 'Ssofthia LABWEB', url: 'http://192.168.40.101/LABWEB/', description: 'Consulta, impresión y descarga de resultados de laboratorio; envío de credenciales a pacientes.' },
    { id: 20, name: 'Llamados de Enfermería', url: 'http://internal.medvision.com.co:9090/CallNurseService/Index.html', description: 'Sistema de llamado con notificación en cartelera digital y gestión de indicadores.' },
    { id: 21, name: 'Carteleras Digitales', url: 'http://192.168.40.17:9090/Medvision/NurseF/', description: 'Plataforma para mostrar turnos, videos, imágenes y publicaciones en carteleras según el área.' },
    { id: 22, name: 'Softhia Plan Beneficios Contratos', url: 'http://192.168.40.101/contratoPlanBeneficios/view/modules/login.php', description: 'Asocia contratos con planes de beneficios en el sistema Hosvital.' },
    { id: 23, name: 'Productividad Fonoaudiología y Psicología V.2', url: 'http://192.168.40.101/productividad/', description: 'Sistema de registro de productividad para Fonoaudiología y Psicología.' },
    { id: 24, name: 'Productividad Fisioterapia V.2', url: 'http://192.168.40.101/htdocs/prodfis/', description: 'Sistema de registro de productividad para Fisioterapia.' },
    { id: 98, name: 'Gestión del Conocimiento-moodle', url: 'http://181.48.52.2/moodle/', description: 'Plataforma institucional para cursos virtuales, capacitaciones y gestión del aprendizaje del personal.', internalLink: true },
    { id: 99, name: 'Mesa de Ayuda', url: '/mesa-de-ayuda', description: 'Plataforma de soporte y gestión de requerimientos tecnológicos y administrativos.', internalLink: true },
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function initDb(maxRetries = 10, delayMs = 3000) {
    let attempts = 0;

    while (attempts < maxRetries) {
        attempts++;
        try {
            console.log(`[DB Auto-Init] Intentando conectar a la base de datos (Intento ${attempts}/${maxRetries})...`);
            const client = await pool.connect();

            try {
                // 1. Ejecutar schema.sql (crea todas las tablas si no existen)
                const schemaPath = path.join(__dirname, 'schema.sql');
                if (fs.existsSync(schemaPath)) {
                    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
                    await client.query(schemaSql);
                    console.log('[DB Auto-Init] Estructura de tablas e índices verificada (schema.sql).');
                }

                // 2. Asegurar usuario admin
                await client.query(`
                    INSERT INTO usuarios (username, password, nombre, rol)
                    VALUES ('admin', 'admin123', 'Administrador', 'admin')
                    ON CONFLICT (username) DO NOTHING;
                `);

                // 3. Asegurar categorías de documentos
                await client.query(`
                    INSERT INTO categorias_documentos (nombre) VALUES
                    ('Gestión de Calidad'),
                    ('Talento Humano'),
                    ('Jurídica'),
                    ('Contratación')
                    ON CONFLICT (nombre) DO NOTHING;
                `);

                // 4. Asegurar notificaciones iniciales si la tabla está vacía
                const notifCount = await client.query('SELECT COUNT(*) FROM notificaciones');
                if (parseInt(notifCount.rows[0].count, 10) === 0) {
                    console.log('[DB Auto-Init] Inicializando notificaciones por defecto...');
                    await client.query(`
                        INSERT INTO notificaciones (titulo, mensaje, tipo, activa, duracion, fecha_inicio, fecha_fin) VALUES
                        ('Bienvenida', '¡Bienvenido a la nueva Intranet de Santa Sofía!', 'success', true, 8000, '2025-01-01 00:00:00', '2026-12-31 23:59:59'),
                        ('Mantenimiento', 'Mantenimiento programado: El próximo domingo a las 02:00 AM se realizarán ajustes en el servidor.', 'warning', true, 0, '2025-04-07 00:00:00', '2026-12-31 23:59:59');
                    `);
                    console.log('[DB Auto-Init] Notificaciones iniciales creadas.');
                }

                // 5. Asegurar sistemas iniciales si la tabla está vacía
                const sistemasCount = await client.query('SELECT COUNT(*) FROM sistemas');
                if (parseInt(sistemasCount.rows[0].count, 10) === 0) {
                    console.log('[DB Auto-Init] Inicializando aplicativos del sistema...');
                    for (const app of APPS_INITIAL) {
                        await client.query(
                            'INSERT INTO sistemas (id, nombre, descripcion, url, interno, orden) VALUES ($1, $2, $3, $4, $5, $6)',
                            [app.id, app.name, app.description, app.url, app.internalLink || false, app.id]
                        );
                    }
                    await client.query("SELECT setval('sistemas_id_seq', (SELECT MAX(id) FROM sistemas))");
                    console.log('[DB Auto-Init] Aplicativos iniciales registrados.');
                }

                console.log('[DB Auto-Init] ✅ Base de datos completamente inicializada y lista para producción.');
                return; // Éxito
            } finally {
                client.release();
            }
        } catch (err) {
            console.warn(`[DB Auto-Init] Base de datos no disponible aún (${err.message}). Reintentando en ${delayMs / 1000}s...`);
            if (attempts >= maxRetries) {
                console.error('[DB Auto-Init] ❌ No fue posible inicializar la base de datos tras múltiples intentos.', err);
                return;
            }
            await sleep(delayMs);
        }
    }
}

module.exports = initDb;

