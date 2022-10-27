// function for adding a new employee
const newEmployeeFormHandler = async (event) => {
    event.preventDefault();
    
    const name = document.querySelector('#EmployeeName').value.trim();
    const role = document.querySelector('#EmployeeROLE').value.trim();
    const description = document.querySelector('#JobDescription').value.trim();
    const department_id = document.querySelector('#departmentId').value.trim();

    if (name && role && description && department_id) {
        // post to the api
        const response = await fetch('/api/employees', {
            method: 'POST',
            body: JSON.stringify({name, role, description, department_id }),
            headers: { 'Content-Type': 'application/json'},
        });
        if (response.ok) {
            document.location.replace('/homepage')
        } else {
            alert('Creation of new employee failed, please try again.')
        }
    }
};

document.querySelector('.newemployee').addEventListener('submit', newEmployeeFormHandler);