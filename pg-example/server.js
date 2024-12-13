// server.js
const express = require('express');
const { sequelize } = require('./config/database');
const pokemonRoutes = require('./routes/pokemon.route');
const {
    ErrorHandler,
    RequestLogger,
    NotFoundHandler
} = require('./middleware');

// Inicializamos la aplicación Express
const app = express();

// Configuramos middleware básicos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(RequestLogger.logRequest);

// Configuración de CORS básica
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    next();
});

// Ruta de prueba/salud de la API
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date(),
        uptime: process.uptime()
    });
});

// Configuramos las rutas de la API
app.use('/api/pokemon', pokemonRoutes);

// Manejador para rutas no encontradas
app.use(NotFoundHandler.handleNotFound);

// Manejador de errores global
app.use(ErrorHandler.handleError);

// Función para iniciar el servidor de manera controlada
const startServer = async () => {
    try {
        // Verificamos la conexión a la base de datos
        await sequelize.authenticate();
        console.log('✅ Conexión a la base de datos establecida correctamente');

        // Sincronizamos los modelos con la base de datos (en desarrollo)
        if (process.env.NODE_ENV === 'development') {
            await sequelize.sync({ alter: true });
            console.log('🔄 Modelos sincronizados con la base de datos');
        }

        // Iniciamos el servidor
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`
🚀 Servidor iniciado exitosamente
📍 Puerto: ${PORT}
🌐 URL local: http://localhost:${PORT}
⚡ Ambiente: ${process.env.NODE_ENV || 'development'}
            `);
        });
    } catch (error) {
        console.error('❌ Error al iniciar el servidor:', error);
        process.exit(1);
    }
};

// Iniciamos el servidor
startServer();