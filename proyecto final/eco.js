const totalCards = 10;
let cards = [];
let selectionCards = [];
let valuesUsed = [];
let currentMove = 0;


// Rutas de imágenes para la parte frontal de las cartas (puedes agregar más imágenes)
const frontImages = [
    'pro.png', 'consprisi.png', 'conssec.png', 'conster.png', 'conscuater.png'
];
// Duplicamos las imágenes para tener pares+
const allImages = [...frontImages, ...frontImages]; // Ahora tenemos 12 imágenes (6 pares)


// Plantilla HTML de una carta
let cardTemplate = '<div class="card"><div class="back"></div><div class="face"></div></div>';


// Función para generar un valor aleatorio único entre 0 y totalCards/2 (sin repeticiones)
function randomValue() {
    let rnd;
    do {
        rnd = Math.floor(Math.random() * (totalCards / 2)); // Generamos valores entre 0 y totalCards/2
    } while (valuesUsed.filter(value => value === rnd).length >= 2); // Nos aseguramos de que no se repita más de dos veces
    valuesUsed.push(rnd); // Añadimos el valor a la lista de usados
    return rnd;
}


// Crear las cartas y asignarles valores aleatorios
for (let i = 0; i < totalCards; i++) {
    let div = document.createElement('div');
    div.innerHTML = cardTemplate;
    cards.push(div);
    document.querySelector('#game').append(cards[i]);


    // Asignar la imagen de la parte frontal de la carta
    let imgIndex = randomValue(); // Generamos un índice aleatorio
    cards[i].querySelector('.face').style.backgroundImage = `url('${allImages[imgIndex]}')`; // Asignamos la imagen correspondiente


    // Asignar el evento de clic a cada carta
    cards[i].addEventListener('click', activate);
}


// Función para manejar el clic en las cartas
function activate(e) {
    let card = e.target.closest('.card'); // Aseguramos que siempre trabajemos con el contenedor de la carta
    if (currentMove < 2 && !card.classList.contains('active') && !selectionCards.includes(card)) {
        card.classList.add('active'); // Mostrar la carta seleccionada
        selectionCards.push(card); // Guardar la carta seleccionada


        if (++currentMove === 2) {
            // Comparar las cartas seleccionadas
            setTimeout(() => {
                if (selectionCards[0].querySelector('.face').style.backgroundImage === selectionCards[1].querySelector('.face').style.backgroundImage) {
                    // Si las cartas coinciden
                    selectionCards = [];  // Reiniciamos la selección
                    currentMove = 0;
                } else {
                    // Si las cartas no coinciden, las volteamos nuevamente
                    selectionCards[0].classList.remove('active');
                    selectionCards[1].classList.remove('active');
                    selectionCards = [];
                    currentMove = 0;
                }
            }, 600); // Tiempo de espera antes de ocultar las cartas
        }
    }
}