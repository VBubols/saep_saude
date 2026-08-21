import Usuario from '../models/usuario.model.js';

//id,nome,email,nome_usuario,imagem,senha,createdAt,updatedAt

export async function cadastrar(req, res) {
    try {
        const {nome, email, nome_usuario, senha} = req.body;

        const existing = await Usuario.findOne({where: { email } });
        if(existing) {
            return res.status(409).json({mensagem: 'E-mail já cadastrado'})
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
        
    } catch (error) {
        
    }
}