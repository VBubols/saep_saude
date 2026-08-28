import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';
import Usuario from './usuario.model.js'
import Atividade from './atividade.model.js'

export const Curtida = sequelize.define(
    'Curtida',
    {
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
        usuario_id : { type: DataTypes.UUID, allowNull: false },
        atividade_id : { type: DataTypes.UUID, allowNull: false }
    },
    {
        tableName: 'curtida',
        timestamps: true,
        indexes: [
            {
                unique: true,
                fields: ['usuario_id', 'atividade_id']
            }
        ]
    }
);

Usuario.hasMany(Curtida, {foreignKey: 'usuario_id'});
Curtida.belongsTo(Usuario, {foreignKey: 'usuario_id'});
Atividade.hasMany(Curtida, {foreignKey: 'atividade_id'});
Curtida.belongsTo(Atividade, {foreignKey: 'atividade_id'});

export default Curtida;