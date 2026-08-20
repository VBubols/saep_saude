import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';

export const Usuario = sequelize.define(
    'Usuario',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: { isEmail: true },
        },
        nome_usuario: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        imagem: {
            type: DataTypes.BLOB,
            allowNull: true
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: 'usuario',
        timestamps: true
    },
);

export default Usuario;

//id,nome,email,nome_usuario,imagem,senha,createdAt,updatedAt