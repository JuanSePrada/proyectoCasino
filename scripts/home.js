document.getElementById('username').textContent = localStorage.getItem('username');

document.addEventListener('DOMContentLoaded', () => {
    const navButtons = document.querySelectorAll('.nav-btn');

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Acción: Obtener la ruta del atributo data-target
            const page = btn.getAttribute('data-target');

            if (page) {
                window.location.href = page; // Esta es la ejecución del cambio de página
            }
        });
    });

    // Acción para el botón de salida
    const btnLogout = document.getElementById('btnLogout');
    if (btnLogout) {
        btnLogout.addEventListener('click', () => {
            if (confirm('¿Desea cerrar sesión?')) {
                window.location.href = 'index.html';
            }
        });
    }
});