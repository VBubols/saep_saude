import fs from 'fs';
import { parse } from 'csv-parse/sync';
import sequelize from './config/database.js';
import Usuario from './models/usuario.model.js';
import Atividade from './models/atividade.model.js';
import './models/curtida.model.js';
import './models/comentario.model.js';

function lerCsv(caminho) {
    const texto = fs.readFileSync(caminho, 'utf-8');
    return parse(texto, { columns: true, skip_empty_lines: true, trim: true });
};

await sequelize.sync({ force: true });

const usuarios = lerCsv('dados/usuario.csv');
const novosIds = {};

for (const linha of usuarios) {
    const usuario = await Usuario.create({
        nome: linha.nome,
        email: linha.email,
        nome_usuario: linha.nome_usuario,
        imagem: linha.imagem,
        senha: linha.senha,
        tipo_usuario: linha.nome_usuario === 'saepsaude' ? 'empresa' : 'funcionario',
        createdAt: new Date(linha.createdAt),
        updatedAt: new Date(linha.updatedAt)
    }, { silent: true });

    novosIds[linha.id] = usuario.id;
};

const atividades = lerCsv('dados/atividade.csv');

for (const linha of atividades) {
    await Atividade.create({
        usuario_id: novosIds[linha.usuario_id],
        tipo_atividade: linha.tipo_atividade,
        distancia_percorrida: Number(linha.distancia_percorrida),
        duracao_atividade: Number(linha.duracao_atividade),
        quantidade_calorias: Number(linha.quantidade_calorias),
        createdAt: new Date(linha.createdAt),
        updatedAt: new Date(linha.updatedAt)
    }, { silent: true });
};

console.log(`Importados: ${usuarios.length} usuários e ${atividades.length} atividades`);

await sequelize.close();
