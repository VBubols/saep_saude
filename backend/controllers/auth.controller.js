import Usuario from '../models/usuario.model.js';
import { Op } from 'sequelize';

export async function cadastrar(req, res) {
    try {
        const {nome, email, nome_usuario, senha} = req.body;

        if (!nome || !email || !nome_usuario || !senha) {
            return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' });
        };

        const existing = await Usuario.findOne({
            where: {
                [Op.or]: [{ email }, { nome_usuario }]
            }
        });

        if(existing) {
            const campo = existing.email === email ? 'Email' : 'Nome de usuário';
            return res.status(409).json({mensagem: `${campo} já cadastrado`})
        };

        const usuario = await Usuario.create({nome, email, nome_usuario, senha});
        const usuario_response = usuario.toJSON();
        delete usuario_response.senha;

        return res.status(201).json(usuario_response)

    } catch (error) {
        return res.status(500).json({mensagem: `ERRO: ${error}`})
    };
};

export async function login(req, res) {
    try {
        const {email, senha} = req.body;

        if (!email || !senha) {
            return res.status(401).json({ mensagem: 'Email ou senha obrigatório' });
        }

        const usuario = await Usuario.findOne({where: {email}})

        if(!usuario || usuario.senha !== senha) {
            return res.status(401).json({mensagem: 'Credenciais inválidas!'})
        };

        const usuario_response = usuario.toJSON();
        delete usuario_response.senha;
    
        return res.status(200).json({ mensagem: 'Login concluído!', usuario: usuario_response });
    } catch (error) {
        return res.status(500).json({mensagem: `ERRO: ${error}`});
    };
};