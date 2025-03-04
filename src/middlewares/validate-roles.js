export const hasRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.usuario) {
            return res.status(500).json({
                success: false,
                message: "Usuario no encontrado"
            });
        }

        if (!roles.includes(req.usuario.role)) {
            return res.status(500).json({
                success: false,
                message: `El servicio requiere de uno de estos roles ${roles}`
            });
        }
        next();
    }
}
