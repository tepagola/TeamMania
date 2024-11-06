// script.js

// Listas ampliadas de adjetivos y sustantivos para nombres de equipos
const adjetivos = [
    "Rápidos", "Valientes", "Furiosos", "Brillantes", "Ágiles",
    "Intrépidos", "Legendarios", "Poderosos", "Energéticos", "Magníficos",
    "Imparables", "Fantasmas", "Veloz", "Estrategas", "Intrepidos",
    "Audaces", "Destemidos", "Vibrantes", "Titánicos", "Electrizantes",
    "Soberbios", "Galácticos", "Infalibles", "Majestuosos", "Eternos",
    "Radiales", "Impactantes", "Dinámicos", "Impresionantes", "Enérgicos",
    "Radiosos", "Explosivos", "Vanguardistas", "Místicos",
    "Vigorosos", "Trueno", "Luz", "Fulgor", "Feroz", "Resplandecientes",
    "Centelleantes", "Brillantes", "Luminosos", "Imponentes", "Radiante",
    "Fulgurantes", "Exploradores", "Espíritus", "Destellos", "Huracanes"
];

const sustantivos = [
    "Vergas", "Torres", "Dragones", "Coños", "Tigres",
    "Panteras", "Pepitas", "Águilas", "Piratas", "Chorizos",
    "Centauros", "Fantasmas", "Bubis", "Cazadores", "Espadas",
    "Pitos", "Titanes", "Zorros", "Halcones", "Brujas",
    "Panetitas", "Vengadores", "Papayas", "Corsarios", "Valquirias",
    "Bestias", "Mamacitas", "Druidas", "Soberanos",
    "Quimeras", "Lobos", "Delfines", "Centinelas",
    "Sables", "Mangueras", "Fieras", "Gigantes",
    "Legionarios", "Cicatrices", "Tempestades",
    "Estrellas", "Meteoros", "Relámpagos", "Nebulosas",
    "Melones", "Pollas", "Órbitas", "Trabucos", "Pipís"
];

// Función para generar nombres de equipos automáticamente
function generarNombreEquipo() {
    const adj = adjetivos[Math.floor(Math.random() * adjetivos.length)];
    const sust = sustantivos[Math.floor(Math.random() * sustantivos.length)];
    return `${adj} ${sust}`;
}

// Función para generar colores únicos de forma aleatoria
function generarColorEquipo(existingColors = []) {
    let color;
    let attempts = 0;
    const maxAttempts = 1000; // Previene un bucle infinito en caso de muchas repeticiones

    do {
        color = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase();
        attempts++;
        if (attempts > maxAttempts) {
            throw new Error("No se pudieron generar más colores únicos.");
        }
    } while (existingColors.includes(color));

    return color;
}

// Función para mezclar un array (Fisher-Yates Shuffle)
function mezclarArray(array) {
    const copia = array.slice();
    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
}

// Variables globales
let equipos = [];
let currentTeamIndex = 0;
let players = [];

// Función para crear tarjetas de equipos en el DOM
function crearTarjetasEquipos() {
    const contenedorEquipos = document.getElementById('equipos');
    contenedorEquipos.innerHTML = '';
    equipos.forEach((equipo, index) => {
        const div = document.createElement('div');
        div.classList.add('equipo', 'col');
        
        const card = document.createElement('div');
        card.classList.add('card', 'bg-opacity-75', 'rounded', 'shadow-neon', 'h-100');
        card.style.backgroundColor = equipo.color;

        // Establecer el color del borde
        card.style.border = `2px solid ${equipo.color}`;
        
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body', 'd-flex', 'flex-column');
        
        const h5 = document.createElement('h5');
        h5.textContent = equipo.nombre;
        h5.classList.add('card-title', 'text-pink', 'text-center', 'mb-4');
        cardBody.appendChild(h5);
        
        const ul = document.createElement('ul');
        ul.classList.add('list-group', 'list-group', 'miembros', 'text-white');
        cardBody.appendChild(ul);
        
        card.appendChild(cardBody);
        div.appendChild(card);
        contenedorEquipos.appendChild(div);
    });
}

// Función para asignar un jugador a un equipo y actualizar el DOM
function asignarJugador(selectedPlayer, index) {
    if (!selectedPlayer) return;

    // Asignar al siguiente equipo
    const team = equipos[currentTeamIndex];
    team.miembros.push(selectedPlayer);

    // Mostrar la tarjeta asignada
    mostrarTarjetaAsignada(selectedPlayer);
    
    setTimeout(() => {
        // Actualizar la tarjeta del equipo en el DOM
        const equipoDiv = document.querySelector(`.equipo:nth-child(${currentTeamIndex + 1}) ul`);
        const li = document.createElement('li');
        li.classList.add('list-group-item', 'list-group-item-dark', 'text-center', 'text-wrap');
        li.textContent = selectedPlayer;
        equipoDiv.appendChild(li);
        
        // Eliminar al jugador de la lista de jugadores
        players.splice(index, 1);
        
        // Actualizar el índice del equipo actual
        currentTeamIndex = (currentTeamIndex + 1) % equipos.length;
    }, 1000); // Tiempo de visualización de la tarjeta (1 segundo)
}

// Función para mostrar la tarjeta asignada con animación
function mostrarTarjetaAsignada(jugador) {
    const jugadorAsignadoDiv = document.getElementById('jugadorAsignado');
    jugadorAsignadoDiv.innerHTML = ''; // Limpiar contenido previo

    const card = document.createElement('div');
    card.classList.add('card-asignado', 'animate__animated', 'animate__fadeIn');
    card.textContent = `${jugador}`;
    jugadorAsignadoDiv.appendChild(card);

    // Reproducir sonido de asignación (opcional)
    const assignSound = document.getElementById('assign-sound');
    if (assignSound) {
        assignSound.currentTime = 0;
        assignSound.src = `./sounds/assign${Math.floor(Math.random() * 7) + 1}.mp3`;
        assignSound.play();
    }

    // Animación de desaparición después de 1 segundo de visualización
    setTimeout(() => {
        // Añadir clase para animación de desaparición
        card.classList.add('fade-out');
    }, 1000); // Tiempo que la tarjeta permanece visible (1 segundo)

    // Eliminar la tarjeta del DOM después de la animación de desaparición (2 segundos)
    setTimeout(() => {
        jugadorAsignadoDiv.innerHTML = '';
    }, 3000); // Total de 1 segundo de visualización + 2 segundos de espera
}

// Función para iniciar la asignación de jugadores
async function iniciarAsignacion() {
    while (players.length > 0) {
        // Seleccionar un jugador al azar
        const randomIndex = Math.floor(Math.random() * players.length);
        const selectedPlayer = players[randomIndex];
        
        // Asignar el jugador al equipo correspondiente
        asignarJugador(selectedPlayer, randomIndex);
        
        // Esperar 3 segundos (1 segundo de visualización + 2 segundos de espera) antes de asignar el siguiente jugador
        await esperar(3000);
    }

    // Borrar el div con id jugadorAsignado del dom
    document.getElementById('jugadorAsignado').classList.add('d-none');

    // El h2 que hay dentro del div #asignacion cambiar el texto por "Equipos Listos"
    document.getElementById('asignacion').querySelector('h2').textContent = 'Equipos Listos';

    // Notificar al usuario que todas las asignaciones están completas
    Swal.fire({
        title: '¡Equipos Listos!',
        text: 'Todos los jugadores han sido asignados.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });

    // Guardar los equipos en el local storage
    localStorage.setItem('equipos', JSON.stringify(equipos));
}

// Función para esperar un tiempo determinado (en milisegundos)
function esperar(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Función para reiniciar la asignación
function reiniciarAsignacion() {
    // Limpiar la lista de jugadores y equipos
    document.getElementById('equipos').innerHTML = '';
    document.getElementById('jugadorAsignado').innerHTML = '';
    document.getElementById('jugadorAsignado').classList.remove('d-none');
    
    // Mostrar la pantalla de configuración y ocultar la de asignación
    document.getElementById('asignacion').classList.add('d-none');
    document.getElementById('configuracion').classList.remove('d-none');
    
    // Reiniciar variables
    equipos = [];
    currentTeamIndex = 0;
    players = [];
}

// Evento para generar equipos
document.getElementById('generarEquipos').addEventListener('click', () => {
    const numeroEquipos = parseInt(document.getElementById('numeroEquipos').value);
    const nombresInput = document.getElementById('nombresJugadores').value;
    
    // Validaciones básicas
    if (isNaN(numeroEquipos) || numeroEquipos < 1) {
        Swal.fire({
            title: 'Error',
            text: 'Por favor, introduce un número válido de equipos.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
        return;
    }
    
    const nombresJugadores = nombresInput.split(/[\n,]+/).map(nombre => nombre.trim()).filter(nombre => nombre !== '');
    
    if (nombresJugadores.length < numeroEquipos) {
        Swal.fire({
            title: 'Error',
            text: 'El número de jugadores debe ser al menos igual al número de equipos.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
        return;
    }
    
    // Inicializar equipos
    equipos = [];
    currentTeamIndex = 0;
    const coloresUsados = [];
    for (let i = 0; i < numeroEquipos; i++) {
        const color = generarColorEquipo(coloresUsados);
        coloresUsados.push(color);
        equipos.push({
            nombre: generarNombreEquipo(),
            color: color,
            miembros: [],
            score: 0
        });
    }
    
    // Mezclar jugadores
    players = mezclarArray(nombresJugadores);
    
    // Ocultar configuración y mostrar asignación
    document.getElementById('configuracion').classList.add('d-none');
    document.getElementById('asignacion').classList.remove('d-none');
    
    // Crear tarjetas de equipos en el DOM
    crearTarjetasEquipos();
    
    // Iniciar asignación de jugadores
    iniciarAsignacion();
});

// Evento para reiniciar la asignación
document.getElementById('reiniciarAsignacion').addEventListener('click', () => {
    reiniciarAsignacion();
});
