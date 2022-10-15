const Department = require('./department');
const Employees = require('./employees');
const Manager = require('./manager');
const User = require('./user');

User.hasMany(Department, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Employees.belongsTo(Department, {
    foreignKey: 'employees_id'
})

Manager.belongsTo(Department, {
    foreignKey: 'manager_id'
});

Department.hasMany(Employees, {
    foreignKey: 'department_id',
    onDelete: 'CASCADE'
})

Department.hasOne(Manager, {
    foreignKey: 'department_id'
})

module.exports = { User, Employees, Manager, Department }