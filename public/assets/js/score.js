// Función para crear tarjetas de equipos en el DOM
function crearTarjetasEquipos() {
    const equipos = JSON.parse(localStorage.getItem('equipos'));
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

        // Añadir los miembros del equipo
        equipo.miembros.forEach((miembro) => {
            const li = document.createElement('li');
            li.classList.add('list-group-item', 'list-group-item-dark', 'text-center', 'text-wrap');
            li.textContent = miembro;
            ul.appendChild(li);
        });

        cardBody.appendChild(ul);
        
        card.appendChild(cardBody);

        // Añadimos la puntuación del equipo y el botón para sumar puntos
        const cardFooter = document.createElement('div');
        cardFooter.classList.add('card-footer', 'text-center', 'bg-dark', 'text-white');

        // Botón para restar puntos
        const botonRestar = document.createElement('button');
        botonRestar.textContent = '-';
        botonRestar.classList.add('btn', 'btn-danger', 'me-2');
        botonRestar.onclick = () => {
            equipo.score--;
            if (equipo.score < 0) {
                equipo.score = 0;
            }
            span.textContent = equipo.score;
            localStorage.setItem('equipos', JSON.stringify(equipos));
        };
        cardFooter.appendChild(botonRestar);

        // Puntuación del equipo
        const span = document.createElement('span');
        span.textContent = equipo.score;
        span.classList.add('fw-bold');
        cardFooter.appendChild(span);

        // Botón para sumar puntos
        const boton = document.createElement('button');
        boton.textContent = '+';
        boton.classList.add('btn', 'btn-primary', 'ms-2');
        boton.onclick = () => {
            equipo.score++;
            span.textContent = equipo.score;
            localStorage.setItem('equipos', JSON.stringify(equipos));
        };
        cardFooter.appendChild(boton);

        card.appendChild(cardFooter);

        div.appendChild(card);
        contenedorEquipos.appendChild(div);
    });
}

// Función para elegir el número de puntos a sumar en el siguiente juego con pesos
function elegirPuntos() {
    const scoreGame = document.getElementById('scoreGame');
    
    // Definir los pesos para cada número
    const pesos = {
        '-2': 1,
        '-1': 2,
        '0': 2,
        '1': 5,
        '2': 5,
        '3': 2,
        '4': 1
    };
    
    // Crear un array con los números repetidos según sus pesos
    const numerosPonderados = [];
    for (const [numero, peso] of Object.entries(pesos)) {
        for (let i = 0; i < peso; i++) {
            numerosPonderados.push(parseInt(numero));
        }
    }
    
    // Función para seleccionar un número aleatorio ponderado
    function seleccionarAleatorio() {
        const indice = Math.floor(Math.random() * numerosPonderados.length);
        return numerosPonderados[indice];
    }
    
    // Seleccionar el número final aleatorio
    const random = seleccionarAleatorio();
    
    // Fluctuar el scoreGame durante 3 segundos y luego mostrar el valor seleccionado
    let i = 0;
    const interval = setInterval(() => {
        const tempRandom = seleccionarAleatorio();
        scoreGame.textContent = tempRandom;
        i++;
        if (i === 30) { // 30 * 100ms = 3000ms = 3 segundos
            clearInterval(interval);
            scoreGame.textContent = random;
        }
    }, 100);
}

crearTarjetasEquipos();