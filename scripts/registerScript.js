window.addEventListener('DOMContentLoaded', () => {
  const loginButton = document.getElementById('register_button');

  loginButton.addEventListener('click', () => {
    register();
  });
});

function register() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageDiv = document.getElementById('message');

    console.log("Register button")

    if (!username || !password) {
      messageDiv.className = 'error-message';
      messageDiv.textContent = 'Wypełnij wszystkie pola!';
      return;
    }

    fetch('https://memqowsky-github-io.onrender.com/register', {
      // fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        messageDiv.className = 'success-message';
        messageDiv.textContent = 'Konto zostało utworzone! Możesz się teraz zalogować.';
        setTimeout(() => {
          window.location.href = '/login.html';
        }, 2000);
      } else {
        messageDiv.className = 'error-message';
        messageDiv.textContent = data.message || 'Błąd podczas rejestracji!';
      }
    })
    .catch(() => {
      messageDiv.className = 'error-message';
      messageDiv.textContent = 'Wystąpił błąd podczas rejestracji. Spróbuj ponownie.';
    });
  }