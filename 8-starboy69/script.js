function checkCredentials() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    const messageElement = document.getElementById('message');

    if (username === '' || password === '') {
        messageElement.innerText = "Please fill in both username and password.";
        messageElement.style.display = "block";
        return; // Exit the function if either username or password is empty
    }

    if (username === 'starboy69') {
        window.location.href = 'starboy.html';
    } else {
        messageElement.innerText = "This password is already used by starboy69";
        messageElement.style.display = "block";
    }
}
