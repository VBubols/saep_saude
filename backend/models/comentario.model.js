import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';
import Usuario from './usuario.model.js'
import Atividade from './atividade.model.js'

export const Comentario = sequelize.define(
    'Comentario',
    {
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
        usuario_id : { type: DataTypes.UUID, allowNull: false },
        atividade_id : { type: DataTypes.UUID, allowNull: false },
        texto : { type: DataTypes.STRING, allowNull: false }
    },
    {
        tableName: 'comentario',
        timestamps: true,
    }
);

Usuario.hasMany(Comentario, {foreignKey: 'usuario_id'});
Comentario.belongsTo(Usuario, {foreignKey: 'usuario_id'});
Atividade.hasMany(Comentario, {foreignKey: 'atividade_id'});
Comentario.belongsTo(Atividade, {foreignKey: 'atividade_id'});

export default Comentario;