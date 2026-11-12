const dotenv = require('dotenv');
dotenv.config();
const app = require('./src/app');
const initDb = require('./src/db/initDb');

const port = process.env.PORT || 3001;

const startServer = async () => {
    try {
        // Inicializar y verificar tablas automáticamente en la base de datos
        await initDb();
    } catch (error) {
        console.error('Error durante la inicialización automática de la base de datos:', error);
    }

    app.listen(port, () => {
        console.log(`🚀 Servidor backend de Intranet Santa Sofía escuchando en el puerto ${port}`);
    });
};

startServer();
