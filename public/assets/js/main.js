document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('background-music');
    audio.play().catch(error => {
        console.log('Reproducción de audio bloqueada:', error);
        Swal.fire({
            title: 'Reproducir Música',
            text: 'Haz clic en el botón para reproducir la música de fondo.',
            icon: 'info',
            confirmButtonText: 'Aceptar'
        });
    });
});