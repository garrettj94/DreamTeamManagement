const newEmployeeFormHandler = async (event) => {
    event.preventDefault();

    const employeeName = document.querySelector('#EmployeeName').value.trim();
    const employeeRole = document.querySelector('#EmployeeROLE').value.trim();
    const employeeDescription = document.querySelector('#JobDescription').value.trim();

    if (employeeName && employeeRole && employeeDescription) {
        const response = await fetch('/api/employees', {
            method: 'POST',
            body: JSON.stringify({name, role, description }),
            headers: { 'Content-Type': 'application/json'},
        });
        if (response.ok) {
            document.location.replace('/')
        } else {
            alert('Creation of new employee failed, please try again.')
        }
    }
};

document.querySelector('.newemployee').addEventListener('submit', newEmployeeFormHandler);