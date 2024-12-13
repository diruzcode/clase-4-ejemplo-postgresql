class RequestValidator {
    static validatePokemon(req, res, next) {
        const { number, name, type_pokemon_id } = req.body;

        const errors = [];

        if (!number || typeof number !== 'number' || number < 1) {
            errors.push('El número de Pokémon debe ser un número positivo');
        }

        if (!name || typeof name !== 'string' || name.trim().length === 0) {
            errors.push('El nombre del Pokémon es requerido');
        }

        if (!type_pokemon_id || typeof type_pokemon_id !== 'number') {
            errors.push('El ID del tipo de Pokémon es requerido y debe ser un número');
        }

        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                error: {
                    message: 'Error de validación',
                    details: errors
                }
            });
        }

        next();
    }
}

module.exports = RequestValidator;
