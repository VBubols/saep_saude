import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';
import Usuario from './usuario.model.js'

export const Atividade = sequelize.define(
    'Atividade',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        usuario_id: {
            type: DataTypes.UUID,
            allowNull: false
            
        },
        tipo_atividade: {
            type: DataTypes.ENUM('caminhada', 'corrida', 'trilha'),
            allowNull: false
        },
        distancia_percorrida: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        duracao_atividade: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        quantidade_calorias: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    },
    {
        tableName: 'atividade',
        timestamps: true
    }
);

Usuario.hasMany(Atividade, {foreignKey: 'usuario_id'});
Atividade.belongsTo(Usuario, {foreignKey: 'usuario_id'});

export default Atividade;

//id,tipo_atividade,distancia_percorrida,duracao_atividade,quantidade_calorias,createdAt,updatedAt,usuario_id