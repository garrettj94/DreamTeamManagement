const newEmployeeFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#EmployeeName').value.trim();
    const role = document.querySelector('#EmployeeROLE').value.trim();
    const description = document.querySelector('#JobDescription').value.trim();

    if (name && role && description) {
        const response = await fetch('/api/employees', {
            method: 'POST',
            body: JSON.stringify({name, role, description }),
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