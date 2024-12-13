class ErrorHandler {
    static async handleError(err, req, res, next) {
        console.error('Error:', err);

        // Determinamos el tipo de error y establecemos el código de estado apropiado
        const statusCode = err.statusCode || 500;
        const message = err.message || 'Error interno del servidor';

        const errorResponse = {
            success: false,
            error: {
                message,
                status: statusCode,
                // Solo incluimos detalles técnicos en desarrollo
                ...(process.env.NODE_ENV === 'development' && {
                    stack: err.stack,
                    detail: err.detail
                })
            }
        };

        res.status(statusCode).json(errorResponse);
    }

    // Wrapper para manejar errores en rutas asíncronas
    static catchAsync(fn) {
        return (req, res, next) => {
            Promise.resolve(fn(req, res, next)).catch(next);
        };
    }
}

module.exports = ErrorHandler;
