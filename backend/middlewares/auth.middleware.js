import Usuario from '../models/usuario.model.js';

export async function identificar(req, res, next) {
    try {
        const id = req.headers['x-usuario-id'];
        if (!id) return res.status(401).json({ mensagem: 'Usuário não autenticado.' });

        const usuario = await Usuario.findByPk(id);
        if (!usuario) return res.status(401).json({ mensagem: 'Usuário não autenticado.' });

        req.usuario = usuario;
        next();
    } catch (error) {
        return res.status(401).json({ mensagem: 'Usuário não autenticado.' });
    }
};

export async function identificarOpcional(req, res, next) {
    try {
        const id = req.headers['x-usuario-id'];
        if (id) {
            const usuario = await Usuario.findByPk(id);
            if (usuario) req.usuario = usuario;
        }
    } catch (error) {
        req.usuario = undefined;
    }
    next();
};
