// frontend/src/data/sistemasData.js
// Datos de los Software Propios de la Intranet

export const sistemasData = [
  { 
    id: 1, 
    nombre: 'Sistema de Información Softhia RTI', 
    url: 'http://192.168.40.58:8181/RTI/', 
    descripcion: 'Recepción y administración de medicamentos en Farmacia, basado en norma NTC-ISO 2859-1, con registro de actas y defectos en lotes.',
    interno: false
  },
  { 
    id: 2, 
    nombre: 'Sistema de Información Ssofthia Labind', 
    url: 'http://192.168.40.58:8181/Labind/', 
    descripcion: 'Registro de pacientes e insumos en la toma de muestras de laboratorio clínico; mide tiempos de espera.',
    interno: false
  },
  { 
    id: 3, 
    nombre: 'Sistema de Información Ssofthia Contacto', 
    url: 'http://192.168.40.58:8181/CONTACTO/', 
    descripcion: 'Lista de espera para citas de consulta externa o procedimientos ambulatorios no asignables en Hosvital.',
    interno: false
  },
  { 
    id: 4, 
    nombre: 'Sistema de Información Ssofthia Negación de Citas', 
    url: 'http://192.168.40.58:8181/NegacionCitas/', 
    descripcion: 'Registro de causas y especialidades de negaciones de citas por el centro de contacto.',
    interno: false
  },
  { 
    id: 5, 
    nombre: 'Sistema de Información Ssofthia Registro Único de Transfusiones Sanguíneas', 
    url: 'http://192.168.40.58:8181/SABANA2014/', 
    descripcion: 'Gestión de solicitud, reserva, envío, devolución y facturación de hemocomponentes (Hemovigilancia).',
    interno: false
  },
  { 
    id: 6, 
    nombre: 'Sistema de Información Ssofthia Cambio de Turnos Médicos', 
    url: 'http://192.168.40.101/CAMBIOTURNO/', 
    descripcion: 'Registro de diagnósticos, evolución y procedimientos pendientes para entrega de turno médico.',
    interno: false
  },
  { 
    id: 7, 
    nombre: 'Sistema de Información Ssofthia Sala de Espera: SSOFTHIA QUIRÓFANO', 
    url: 'http://192.168.40.58:8181/ESPERACX/', 
    descripcion: 'Visualización en sala de espera de cirugías con avisos auditivos y visuales del estado de los procedimientos.',
    interno: false
  },
  { 
    id: 8, 
    nombre: 'Sistema de Información de Entrega de Imágenes Diagnósticas', 
    url: 'http://192.168.40.101/ENTREGAIMAGENES/', 
    descripcion: 'Registro de entrega de imágenes diagnósticas a los usuarios.',
    interno: false
  },
  { 
    id: 9, 
    nombre: 'Ssofthia Stock de insumos', 
    url: 'http://192.168.40.101/stock/public/', 
    descripcion: 'Control de insumos por servicio mediante lectura de códigos de barras y gestión de fechas de vencimiento.',
    interno: false
  },
  { 
    id: 10, 
    nombre: 'Abreviaturas y Acrónimos en la Historia Clínica', 
    url: 'http://192.168.40.101/ACRONIMO/', 
    descripcion: 'Manual de uso de abreviaturas y acrónimos en la historia clínica.',
    interno: false
  },
  { 
    id: 11, 
    nombre: 'Sistema de Impresión Cuidados de Enfermería', 
    url: 'http://192.168.40.58:8181/CUIDADOSENF/Vista/logueo.jsp?admin=SI', 
    descripcion: 'Visualización e impresión de planes de cuidados de enfermería por pabellón y cama (programados en Hosvital).',
    interno: false
  },
  { 
    id: 12, 
    nombre: 'Ssofthia Priorización Cirugías', 
    url: 'http://192.168.40.101/HV/', 
    descripcion: 'Registro de documentación para priorizar procedimientos quirúrgicos.',
    interno: false
  },
  { 
    id: 13, 
    nombre: 'Ssofthia Programador Nutriciones Parenterales', 
    url: 'http://192.168.40.58:8081/NPT/index.php', 
    descripcion: 'Generación de nutriciones parenterales en Farmacia según requerimientos del nutricionista.',
    interno: false
  },
  { 
    id: 14, 
    nombre: 'Ssofthia sala espera Consulta Externa', 
    url: 'http://192.168.40.101/SALAESPERACE/', 
    descripcion: 'Llamado visible en pantalla para pacientes en sala de espera de consulta externa.',
    interno: false
  },
  { 
    id: 15, 
    nombre: 'Ssofthia asistencia a capacitaciones', 
    url: 'http://192.168.40.101/ASISTENCIA/', 
    descripcion: 'Registro de asistencia a capacitaciones mediante código de barras del carnet.',
    interno: false
  },
  { 
    id: 16, 
    nombre: 'Ssofthia hojas de vida contratistas', 
    url: 'http://192.168.40.101/HV/', 
    descripcion: 'Registro de datos y documentos de contratistas (certificaciones, vacunas, etc.) con subida de archivos.',
    interno: false
  },
  { 
    id: 17, 
    nombre: 'Ssofthia Comprobantes de Egreso', 
    url: 'http://192.168.40.101/COPEGRESO/', 
    descripcion: 'Envío automático de comprobantes de egreso a correos de proveedores.',
    interno: false
  },
  { 
    id: 18, 
    nombre: 'Ssofthia cobro deudores', 
    url: 'http://192.168.40.101/DEUDORES/', 
    descripcion: 'Cobro automatizado a deudores mediante correos electrónicos.',
    interno: false
  },
  { 
    id: 19, 
    nombre: 'Ssofthia LABWEB', 
    url: 'http://192.168.40.101/LABWEB/', 
    descripcion: 'Consulta, impresión y descarga de resultados de laboratorio; envío de credenciales a pacientes.',
    interno: false
  },
  { 
    id: 20, 
    nombre: 'Llamados de Enfermería', 
    url: 'http://internal.medvision.com.co:9090/CallNurseService/Index.html', 
    descripcion: 'Sistema de llamado con notification en cartelera digital y gestión de indicadores.',
    interno: false
  },
  { 
    id: 21, 
    nombre: 'Carteleras Digitales', 
    url: 'http://192.168.40.17:9090/Medvision/NurseF/', 
    descripcion: 'Plataforma para mostrar turnos, videos, imágenes y publicaciones en carteleras según el área.',
    interno: false
  },
  { 
    id: 22, 
    nombre: 'Softhia Plan Beneficios Contratos', 
    url: 'http://192.168.40.101/contratoPlanBeneficios/view/modules/login.php', 
    descripcion: 'Asocia contratos con planes de beneficios en el sistema Hosvital.',
    interno: false
  },
  { 
    id: 23, 
    nombre: 'Productividad Fonoaudiología y Psicología V.2', 
    url: 'http://192.168.40.101/productividad/', 
    descripcion: 'Sistema de registro de productividad para Fonoaudiología y Psicología.',
    interno: false
  },
  { 
    id: 24, 
    nombre: 'Productividad Fisioterapia V.2', 
    url: 'http://192.168.40.101/htdocs/prodfis/', 
    descripcion: 'Sistema de registro de productividad para Fisioterapia.',
    interno: false
  },
  { 
    id: 98, 
    nombre: 'Gestión del Conocimiento-moodle', 
    url: 'http://181.48.52.2/moodle/', 
    descripcion: 'Plataforma institucional para cursos virtuales, capacitaciones y gestión del aprendizaje del personal.', 
    interno: true 
  },
  { 
    id: 99, 
    nombre: 'Mesa de Ayuda', 
    url: '/mesa-de-ayuda', 
    descripcion: 'Plataforma de soporte y gestión de requerimientos tecnológicos y administrativos.', 
    interno: true 
  },
];
