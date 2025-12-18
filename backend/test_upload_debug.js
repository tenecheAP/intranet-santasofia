const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

async function testUpload() {
    try {
        // Crear un archivo de prueba temporal
        const testFilePath = path.join(__dirname, 'test_file.txt');
        fs.writeFileSync(testFilePath, 'Contenido de prueba para subida de archivos.');

        const form = new FormData();
        form.append('titulo', 'Documento de Prueba Script');
        form.append('categoria', 'Gestión de Calidad');
        form.append('tipo', 'PDF'); // Simulamos que es PDF aunque sea txt
        form.append('fecha', new Date().toISOString().split('T')[0]);
        form.append('archivo', fs.createReadStream(testFilePath));

        const response = await axios.post('http://localhost:3001/documents', form, {
            headers: {
                ...form.getHeaders()
            }
        });

        console.log('Respuesta del servidor:', response.status);
        console.log('Datos del documento creado:', response.data);

        // Limpiar archivo de prueba
        fs.unlinkSync(testFilePath);

    } catch (error) {
        console.error('Error en la prueba de subida:', error.response ? error.response.data : error.message);
    }
}

testUpload();
