// Login logic
document.getElementById('btnIngresar').addEventListener('click', function () {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const resultados = document.getElementById('resultados');

    if (username === 'casinoappadmin' && password === '123456') {
        resultados.innerHTML = '<p>Login exitoso. Bienvenido!</p>';
        setTimeout(() => {
            localStorage.setItem('username', username);
            window.location.href = 'home.html';
        }, 2000);
    } else {
        resultados.innerHTML = '<p>Credenciales incorrectas. Intente de nuevo.</p>';
    }
});
