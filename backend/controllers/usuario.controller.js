import Usuario from '../models/usuario.model.js';
import Atividade from '../models/atividade.model.js'

export async function perfil(req, res) {
    try {
        const usuario = await Usuario.findByPk(req.usuario.id, { attributes: { exclude: ['senha'] } });
        if(!usuario) {
            return res.status(404).json({mensagem: 'Usuário não encontrado'});
        }

        const qtd_atividade = await Atividade.count({where: { usuario_id: req.usuario.id }});
        const qtd_calorias = await Atividade.sum('quantidade_calorias', { where: { usuario_id: req.usuario.id } }) || 0;

        return res.status(200).json({ ...usuario.toJSON(), qtd_atividade, qtd_calorias });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' }); 
    }
};