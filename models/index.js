const Department = require('./department');
const Employee = require('./employee');
const User = require('./user');

User.hasMany(Department, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Employee.belongsTo(Department, {
    foreignKey: 'employee_id'
})

Department.hasMany(Employee, {
    foreignKey: 'department_id',
    onDelete: 'CASCADE'
})


module.exports = { User, Employee, Department }
