const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class teamMembers extends Model {}

teamMembers.init(
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
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
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
        modelName: 'teamMembers',
      }
    );
    
    module.exports = teamMembers;
