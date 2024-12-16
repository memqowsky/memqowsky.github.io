window.addEventListener('DOMContentLoaded', () => {
  const loginButton = document.getElementById('login_button');

  loginButton.addEventListener('click', () => {
      login();
  });
});

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('error');
    console.log("Login: ", username, password);
    fetch('https://memqowsky-github-io.onrender.com/login', {
    // fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        window.location.href = '/currencies.html';
      } else {
        errorDiv.textContent = 'Nieprawidłowy login lub hasło!';
      }
    })
    .catch(() => {
      errorDiv.textContent = 'Wystąpił błąd podczas logowania. Spróbuj ponownie.';
    });
  }