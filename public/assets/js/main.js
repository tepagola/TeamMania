// Función para reproducir música de fondo
function reproducirMusica() {
    const audio = document.getElementById('background-music');
    audio.volume = 0.3; // Establece el volumen al 50%
    audio.play().catch(error => {
        console.log('Reproducción de audio bloqueada:', error);
        Swal.fire({
            title: 'Reproducir Música',
            text: 'Haz clic en el botón para reproducir la música de fondo.',
            icon: 'info',
            confirmButtonText: 'Aceptar'
        });
    });
}

// Añadir listeners para diferentes tipos de interacción
document.addEventListener('click', reproducirMusica);
document.addEventListener('keydown', reproducirMusica);
document.addEventListener('touchstart', reproducirMusica);