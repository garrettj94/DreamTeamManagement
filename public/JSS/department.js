// function to add a new department
console.log("GET CONNECTED FOR FREE")
const newDepartmentFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#departmentName').value.trim();
    const manager = document.querySelector('#managerName').value.trim();
console.log(name, manager)
    if (name && manager) {
        // post to the api 
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

document.querySelector('#newdept').addEventListener('submit', newDepartmentFormHandler);