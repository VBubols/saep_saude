import Usuario from '../models/usuario.model.js';
import Atividade from '../models/atividade.model.js';

export async function mostrarEmpresa(req, res) {
    try {
        const empresa = await Usuario.findOne({
            where: { tipo_usuario: 'empresa' },
            attributes: { exclude: ['senha'] }
        });
        if (!empresa) {
            return res.status(404).json({ mensagem: 'Empresa não encontrada' });
        };

        const qtd_atividade = await Atividade.count({ where: { usuario_id: empresa.id } });
        const qtd_calorias = await Atividade.sum('quantidade_calorias', { where: { usuario_id: empresa.id } }) || 0;

        return res.status(200).json({ ...empresa.toJSON(), qtd_atividade, qtd_calorias });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    };
};
