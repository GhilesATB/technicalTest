const {DataTypes, Model} = require('sequelize');
const sequelize = require('../../../config/database/sequilize');

class Role extends Model {}

Role.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull:false
        }
},{
    sequelize,
    modelName: 'role',
    tableName:'roles'
});

module.exports = Role;