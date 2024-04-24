const {DataTypes, Model} = require('sequelize');
const sequelize = require('../../../config/database/sequilize');
const db = require("../../../config/database/sequilize");

class User extends Model {}

User.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    role_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
},{
    sequelize,
    modelName: 'user',
    tableName: 'users'
});

User.prototype.getPermissions = async (userId) => {
    const [results, metadata] = await db.query(`
        select permissions.name as permission_name
        from permissions,
        roles_permissions,
        roles,
        users
        where
        roles_permissions.role_id = roles.id
        and
        roles_permissions.permission_id = permissions.id
        and
        roles.id = users.role_id
        and 
        users.id = :userId`, {
                    replacements: { userId: userId }
    });

    return results;
}

module.exports = User;