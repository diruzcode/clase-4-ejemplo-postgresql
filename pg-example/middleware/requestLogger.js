class RequestLogger {
    static logRequest(req, res, next) {
        const start = Date.now();
        console.log(`📝 ${new Date().toISOString()} - ${req.method} ${req.url}`);

        // Cuando la respuesta termine, registramos el tiempo total
        res.on('finish', () => {
            const duration = Date.now() - start;
            console.log(`✅ ${req.method} ${req.url} - ${res.statusCode} - ${duration}ms`);
        });

        next();
    }
}

module.exports = RequestLogger;
