import Atividade from '../models/atividade.model.js'
import Usuario from '../models/usuario.model.js';

export async function criar(req, res) {
    try {
        const usuario = req.usuario.id;
        const { 
            tipo_atividade,
            distancia_percorrida,
            duracao_atividade,
            quantidade_calorias
         } = req.body;

         const tipos_atividade = [ 'caminhada', 'corrida', 'trilha' ];
         if (!tipos_atividade.includes(tipo_atividade)) {
             return res.status(400).json({mensagem: 'Tipo de atividade não listada.'})
         };

         const atividade = await Atividade.create({
            usuario,
            tipo_atividade,
            distancia_percorrida,
            duracao_atividade,
            quantidade_calorias
         });

         return res.status(201).json(atividade);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' }); 
    }
};

export async function listar(req, res) {
    try {
        const pagina = parseInt(req.query.pagina) || 1;
        const limite = 4;

        const where = {};
        if (req.query.tipo) {
            where.tipo_atividade = req.query.tipo;
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
            atividades.push({
                ...atividade.toJSON()
            })
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