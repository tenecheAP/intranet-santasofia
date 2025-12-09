-- Insertar usuario admin por defecto (Password: admin123)
-- Nota: En producción las contraseñas deben estar hasheadas (bcrypt). 
-- Este es un ejemplo simplificado o requiere que el backend maneje el hash al login.
INSERT INTO usuarios (username, password, nombre, rol)
VALUES ('admin', 'admin123', 'Administrador', 'admin')
ON CONFLICT (username) DO NOTHING;

-- Insertar documentos de ejemplo (basados en Documental.js)
INSERT INTO documentos (titulo, categoria, tipo, fecha, url) VALUES
('Política de Calidad Institucional', 'Gestión de Calidad', 'PDF', '2023-10-01', ''),
('Manual de Procesos y Procedimientos', 'Gestión de Calidad', 'PDF', '2023-09-15', ''),
('Mapa de Procesos 2024', 'Gestión de Calidad', 'IMG', '2023-11-20', ''),
('Reglamento Interno de Trabajo', 'Talento Humano', 'PDF', '2022-05-10', ''),
('Formato de Solicitud de Permisos', 'Talento Humano', 'DOCX', '2023-01-20', ''),
('Cronograma de Capacitaciones 2024', 'Talento Humano', 'XLSX', '2023-12-05', ''),
('Circular Normativa 001', 'Jurídica', 'PDF', '2024-01-15', ''),
('Resolución de Nombramientos', 'Jurídica', 'PDF', '2023-11-30', ''),
('Manual de Contratación', 'Contratación', 'PDF', '2023-08-10', ''),
('Formatos de Minutas', 'Contratación', 'ZIP', '2023-08-12', '');
