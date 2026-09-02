import Curtida from '../models/curtida.model.js';
import Atividade from '../models/atividade.model.js';

export async function alternar(req, res) {
  try {
    const usuario_id = req.usuario.id;
    const { atividade_id } = req.params;

    const atividade = await Atividade.findByPk(atividade_id);
    if (!atividade) {
      return res.status(404).json({ mensagem: 'Atividade não encontrada' });
    }

    const curtida = await Curtida.findOne({ where: { usuario_id, atividade_id } });

    if (curtida) {
      await curtida.destroy();
    } else {
      await Curtida.create({ usuario_id, atividade_id });
    }

    const qtd_curtidas = await Curtida.count({ where: { atividade_id } });

    return res.status(200).json({
      curtido: !curtida,
      qtd_curtidas
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
}