const newDepartmentFormHandler = async (event) => {
    event.preventDefault();

    const department = document.querySelector('#DepartmentName').value.trim();
    const manager = document.querySelector('#ManagerName').value.trim();

    if (department && manager) {
        const response = await fetch('/api/department', {
            method: 'POST',
            body: JSON.stringify({ name, manager}),
            headers: { 'Content-Type': 'application/json'},
        });

        if (response.ok) {
            document.location.replace('/homepage');
        } else {
            alert('Creation of new department failed, please try again');
        }
    }
};

document.querySelector('.newdept').addEventListener('submit', newDepartmentFormHandler);