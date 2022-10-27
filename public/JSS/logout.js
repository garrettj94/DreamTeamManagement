// function to logout
const logout = async () => {
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    // send user back to the login page when logout is successfull
    if (response.ok) {
        document.location.replace('/login')
    } else {
        alert(response.statusText);
    }
};

document.querySelector('#logout').addEventListener('click', logout);