class NotFoundHandler {
    static handleNotFound(req, res) {
        res.status(404).json({
            success: false,
            error: {
                message: `Ruta no encontrada: ${req.method} ${req.originalUrl}`,
                status: 404
            }
        });
    }
}

module.exports = NotFoundHandler;
