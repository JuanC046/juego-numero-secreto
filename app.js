
// Selección del H1 
// uso querySelector para seleccionar el primer h1
// querySelector selecciona el primer elemento que cumpla 
// con el criterio de selección
// let titulo = document.querySelector('h1');
// Agregar texto para el titulo
// innerHTML permite modificar el contenido de un elemento usando HTML
// titulo.innerHTML = "Juego del número secreto";

// seleccionar el parrafo "texto__parrafo"
// uso querySelector para seleccionar el primer elemento con la clase "texto__parrafo"
// let parrafo = document.querySelector('.texto__parrafo');
// parrafo.innerHTML = `Adivina el número secreto entre 1 y ${limiteSuperior}`;

// Definición de variables

// Límite superior para el número aleatorio
let limiteSuperior = 20;

// Máximo de juegos posibles
let maxJuegos = Math.floor(limiteSuperior / 2);
console.log("Máximo de juegos posibles", maxJuegos);
// Declaramos una variable para guardar el número secreto
let numeroSecreto= 0;

// Contador de los intentos del usuario
let contadorIntentos = 1;

// Lista de los números aleatorios generados
let numerosAleatorios = [];



// función para cambiar texto de los elementos
function cambiarTexto(selector, texto){
    let elemento = document.querySelector(selector);
    elemento.innerHTML = texto;
    return; // Usar return es una buena práctica
}

// función para generar un número aleatorio
function numeroAleatorio(limite){
    let numeroGenerado = Math.floor(Math.random() * limite) + 1;
    // Si se alcanzó el máximo de juegos posibles
    if (numerosAleatorios.length === maxJuegos){ // Condición de salida recursividad
        console.log("Máximo de juegos posibles alcanzado");
        // Mostrar un mensaje al usuario
        cambiarTexto('.texto__parrafo', `Ya has jugado el máximo de juegos posibles.`);
        return;
    }
    // Si el número generado ya está en la lista de números aleatorios
    // generar otro número
    else {
        if (numerosAleatorios.includes(numeroGenerado)){
            return numeroAleatorio(limite);
        }
        // Si no está en la lista, agregarlo y retornarlo
        numerosAleatorios.push(numeroGenerado);
        console.log("Número generado", numeroGenerado);
        console.log("Números aleatorios", numerosAleatorios);
        return numeroGenerado;
    }
    
}
function verificarIntentoUsuario(){
    let intento = parseInt(document.getElementById('intentoUsuario').value);
    console.log("Intento usuario", intento);
    if(intento === numeroSecreto){
        // El usuario adivinó el número secreto
        cambiarTexto('.texto__parrafo', `¡Felicidades! Has adivinado el número secreto en ${contadorIntentos} ${contadorIntentos == 1 ? "intento": "intentos"}`);
        // Habilitar el botón de reiniciar
        document.getElementById('reiniciar').removeAttribute("disabled");
    }
    else {
        // El usuario no adivinó el número secreto
        if(intento > numeroSecreto){
        cambiarTexto('.texto__parrafo', `Intenta con un número más bajo`);
        }
        else{
            cambiarTexto('.texto__parrafo', `Intenta con un número más alto`);
        }
        // Limpiar el input
        document.getElementById('intentoUsuario').value = '';
        contadorIntentos++;
    }
    return;
}
// Función para limpiar input
function limpiarInput(idInput){
    document.getElementById(idInput).value = '';
    return;
}

// Función para reiniciar el juego
function reiniciarJuego(){
    // Condiciones iniciales
    condicionesInciales();
    // Deshabilitar el botón de reiniciar
    document.getElementById('reiniciar').setAttribute("disabled", true);
    return;
}

function condicionesInciales(){
    // Cambiar texto del párrafo
    cambiarTexto('.texto__parrafo', `Adivina el número secreto entre 1 y ${limiteSuperior}`);
    // Limpiar el input
    limpiarInput('intentoUsuario');

    // Generar un número aleatorio entre 1 y limiteSuperior
    numeroSecreto = numeroAleatorio(limiteSuperior);
    // Contador de los intentos del usuario
    contadorIntentos = 1;
    return;
}

// Agregar titulo
cambiarTexto('h1', 'Juego del número secreto');
// Condiciones iniciales
condicionesInciales();
