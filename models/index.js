const Department = require('./department');
const Employees = require('./employees');
const User = require('./user');

User.hasMany(Department, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Employees.belongsTo(Department, {
    foreignKey: 'employees_id'
})

Department.hasMany(Employees, {
    foreignKey: 'department_id',
    onDelete: 'CASCADE'
})


module.exports = { User, Employees, Department }
