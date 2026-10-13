import Comentario from '../models/comentario.model.js';
import Atividade from '../models/atividade.model.js';
import Usuario from '../models/usuario.model.js';

export async function criar(req, res) {
    try {
        const usuario_id = req.usuario.id;
        const { atividade_id } = req.params;
        const { texto } = req.body;

        if (!texto || texto.trim().length <= 2) {
            return res.status(400).json({ mensagem: 'não é possível enviar um comentário vazio' });
        };

        const atividade = await Atividade.findByPk(atividade_id);
        if (!atividade) {
            return res.status(404).json({ mensagem: 'Atividade não encontrada' });
        };

        const comentario = await Comentario.create({
            usuario_id,
            atividade_id,
            texto: texto.trim()
        });

        const qtd_comentarios = await Comentario.count({ where: { atividade_id } });

        return res.status(201).json({ comentario, qtd_comentarios });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    };
};

export async function listar(req, res) {
    try {
        const { atividade_id } = req.params;

        const comentarios = await Comentario.findAll({
            where: { atividade_id },
            include: [{ model: Usuario, attributes: ['nome', 'nome_usuario', 'imagem'] }],
            order: [['createdAt', 'ASC']]
        });

        return res.status(200).json({ comentarios });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    };
};
