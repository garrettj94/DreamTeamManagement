const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Manager extends Model {}

Manager.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        department: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        total_enrolled: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        team_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'team',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'manager',
    }
);

module.exports = Manager;