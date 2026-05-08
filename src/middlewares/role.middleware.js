function authorize(...rolesPermitidos) {

    return (req, res, next) => {

        if (!rolesPermitidos.includes(req.user.rol)) {

            return res.status(403).json({
                error: 'No tiene autorizacion'
            });

        }

        next();
    };
}

module.exports = authorize;