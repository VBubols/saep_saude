import Atividade from '../models/atividade.model.js'

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
}