// function to login
const loginFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
        // post to the api
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        console.log(response)
        if (response.ok) {
            document.location.replace('/homepage');
        } else {
            alert('Login failed, please try again.');;
        }
    }
};

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);

// function to signup
const signupFormHandler = async (event) => {
    event.preventDefault();

    const signupEmail = document.querySelector('#email-signup').value.trim();
    const signupPassword = document.querySelector('#password-signup').value.trim();

    console.log(signupEmail, signupPassword)
    
    if (signupEmail && signupPassword) {
        // post to the api, creates a new user account
        const signupResponse = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ signupEmail, signupPassword }),
            headers: { 'Content-Type': 'application/json' }
        });
        console.log(signupResponse)

        if (signupResponse.ok) {
            document.location.replace('/');
    
        } else {
            alert('Signup failed, please try again');
        }
    } 
    
}

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
