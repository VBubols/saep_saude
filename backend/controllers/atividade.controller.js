import Atividade from '../models/atividade.model.js';
import Usuario from '../models/usuario.model.js';
import Curtida from '../models/curtida.model.js';
import Comentario from '../models/comentario.model.js';

const tipos_atividade = ['caminhada', 'corrida', 'trilha'];

export async function criar(req, res) {
    try {
        const usuario_id = req.usuario.id;
        const {
            tipo_atividade,
            distancia_percorrida,
            duracao_atividade,
            quantidade_calorias
        } = req.body;

        const campos = { tipo_atividade, distancia_percorrida, duracao_atividade, quantidade_calorias };

        const vazios = Object.keys(campos).filter(campo => campos[campo] === undefined || campos[campo] === '');
        if (vazios.length) {
            return res.status(400).json({ mensagem: 'Campo obrigatório', campos: vazios });
        };

        if (!tipos_atividade.includes(tipo_atividade)) {
            return res.status(400).json({ mensagem: 'Tipo de atividade não listada.', campos: ['tipo_atividade'] });
        };

        const numericos = ['distancia_percorrida', 'duracao_atividade', 'quantidade_calorias'];
        const invalidos = numericos.filter(campo => isNaN(Number(campos[campo])) || Number(campos[campo]) <= 0);
        if (invalidos.length) {
            return res.status(400).json({ mensagem: 'Informe apenas números maiores que zero', campos: invalidos });
        };

        const atividade = await Atividade.create({
            usuario_id,
            tipo_atividade,
            distancia_percorrida: Number(distancia_percorrida),
            duracao_atividade: Number(duracao_atividade),
            quantidade_calorias: Number(quantidade_calorias)
        });

        return res.status(201).json(atividade);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    };
};

export async function listar(req, res) {
    try {
        const pagina = parseInt(req.query.pagina) || 1;
        const limite = parseInt(req.query.limite) || 4;

        const where = {};
        if (tipos_atividade.includes(req.query.tipo)) {
            where.tipo_atividade = req.query.tipo;
        };

        if (req.query.minhas) {
            if (!req.usuario) {
                return res.status(401).json({ mensagem: 'Usuário não autenticado.' });
            };
            where.usuario_id = req.usuario.id;
        };

        const { count, rows } = await Atividade.findAndCountAll({
            where,
            include: [{ model: Usuario, attributes: ['nome', 'nome_usuario', 'imagem'] }],
            limit: limite,
            offset: (pagina - 1) * limite,
            order: [['createdAt', 'DESC']]
        });

        const atividades = [];

        for (const atividade of rows) {
            const qtd_curtidas = await Curtida.count({ where: { atividade_id: atividade.id } });
            const qtd_comentarios = await Comentario.count({ where: { atividade_id: atividade.id } });

            let curtido_por_mim = false;
            if (req.usuario) {
                const minhaCurtida = await Curtida.findOne({
                    where: { atividade_id: atividade.id, usuario_id: req.usuario.id }
                });
                curtido_por_mim = !!minhaCurtida;
            };

            atividades.push({
                ...atividade.toJSON(),
                qtd_curtidas,
                qtd_comentarios,
                curtido_por_mim
            });
        };

        return res.status(200).json({
            atividades,
            pagina_atual: pagina,
            total_paginas: Math.ceil(count / limite) || 1
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    };
};
