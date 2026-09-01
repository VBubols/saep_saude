import Usuario from '../models/usuario.model.js';

export async function identificar(req, res, next) {
    const id = req.headers['x-usuario-id'];
    if (!id) return res.status(401).json({mensagem: 'Usuário não autenticado.'});

    const usuario = await Usuario.findByPk(id);
    if (!usuario) return res.status(401).json({mensagem: 'Usuário não autenticado.'});

    req.usuario = usuario;
    next();
};